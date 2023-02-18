import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2'
import { CommonVariable } from '../Environment/CommonVariables';
import * as bcrypt from 'bcryptjs';
import { LoaderService } from '../Service/loader.service';

export class LoginModel{
  uid: number;
  username: string;
  password: string;
  userId: string;
  Age: string;
  DOB: Date;
  Gender: string;
}

@Injectable()
export class LoginService{
  CM: CommonVariable = new CommonVariable();
  constructor(private HttpCall: HttpClient){}

  GetLoginInfo(LoginData): Observable<string> {
    return this.HttpCall.post<string>(this.CM.Web_Url + "Login/GetUserData", { LoginData : JSON.stringify(LoginData) });
  }

  SaveUserData(UserData,Uid):Observable<string> {
    return this.HttpCall.post<string>(this.CM.Web_Url + "Login/SaveUserData",{ UserData: UserData, Uid: Uid});
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit{

  LoginData: LoginModel = new LoginModel();

  constructor(private Service: LoginService, private router: Router,private OverLay: LoaderService){}

  ngOnInit(): void {
  }

  SaveUserData(){
    try{
      this.OverLay.setLoading(true);
      this.Service.GetLoginInfo(this.LoginData).subscribe((res)=> {
        let tempResult = JSON.parse(res);
        
        if(tempResult.Table.length > 0 && tempResult.Table != undefined){
          const checkPass = bcrypt.compareSync(this.LoginData.password, tempResult.Table.find((x) => x).password)
          if(checkPass){
              this.success(tempResult);
              this.OverLay.setLoading(false);
          }
          else{
            Swal.fire('Incorrect Password !!!','Enter Valid Password','error');
            this.OverLay.setLoading(false);
          }
        }
        else{
          Swal.fire('User Does not Exits !!!','Invalid User!!','error');
          this.OverLay.setLoading(false);
        }
      });
    }
    catch(ex){
      Swal.fire(ex,'','error');
      this.OverLay.setLoading(false);
    }
  }

  success(Data: any){
    localStorage.setItem("userId", Data.Table.find((x) => x).UserId);
    this.router.navigate(['/']);
    Swal.fire('Login Successfull','','success');
  }
}
