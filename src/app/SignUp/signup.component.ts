import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import * as bcrypt from 'bcryptjs';
import { AutoCompleteProp, CommonVariable } from '../Environment/CommonVariables';
import { LoaderService } from '../Service/loader.service';

export class SignUpModel{
  UserId: string;
  UserType: string;
  uid: number = 0;
  fname: string;
  lname: string;
  username: string;
  Password: string;
  email: string;
  phonenumber: string;
  Age: string;
  DOB: Date;
  Gender: number;
  CreatedDate: Date;
  ModifiedDate: Date;
}

@Injectable()
export class SignUpService {
  CM: CommonVariable = new CommonVariable();
  constructor(private HttpCall: HttpClient){}

  SaveUserData(UserData,Uid): Observable<string>{
    return this.HttpCall.post<string>(this.CM.Web_Url + "Login/SaveUserData",{UserData : JSON.stringify(UserData), Uid: Uid});
  }

  GetLastUserId(): Observable<string>{
    return this.HttpCall.post<string>(this.CM.Web_Url + "Login/GetLastUserId",'');
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [SignUpService]
})
export class SignupComponent implements OnInit{

  SignUpData: SignUpModel = new SignUpModel();
  Year: number;
  CurrentYear: number;
  Age: number;
  Gender: AutoCompleteProp[] = [];

  constructor(private Service: SignUpService,private route: Router, private OverLay: LoaderService){}

  ngOnInit() {
    this.GetLastUserId();
  }

  SaveUserData(){
    try{
      this.OverLay.setLoading(true);
      this.SignUpData.username = this.SignUpData.fname + '_' + Math.round(Math.random() * 900 + 100);
    this.SignUpData.UserType = 'USER';
    const salt = bcrypt.genSaltSync(10);
    const pass = bcrypt.hashSync(this.SignUpData.Password, salt);
    this.SignUpData.Password = pass;
    this.Service.SaveUserData(this.SignUpData,this.SignUpData.uid).subscribe((res)=> {
      console.log(res);
      if(res.includes("1:")){
        this.success();
        Swal.fire(res.replace("1:",""),'','success');
        this.OverLay.setLoading(false);
        //this.route.navigate(['/login']);
      }
      else{
        Swal.fire(res.replace("0:",""),'','warning');
        this.SignUpData.Password = "";
        this.OverLay.setLoading(false);
      }
    });
    }
    catch(ex){
      Swal.fire(ex,'','error');
      this.OverLay.setLoading(false);
    }
  }

  success(){
    localStorage.setItem("userId", this.SignUpData.UserId);
    this.route.navigate(['/']);
    //Swal.fire('Login Successfull','','success');
  }

  GetLastUserId(){
    this.Service.GetLastUserId().subscribe((res) => {
      let tempResult = JSON.parse(res);
      if(tempResult.Table.length > 0 && tempResult.Table != undefined){
        let UserId = +tempResult.Table.find(x => x["UserId"]).UserId.substr(1);
        this.SignUpData.UserId = 'N00' + (UserId + 1).toString();
      }
      if(tempResult.Table1.length > 0 && tempResult.Table1 != undefined){
        this.Gender = <AutoCompleteProp[]>tempResult.Table1;
      }
    })
  }

  onDateChange(value){
    if(value != null && value != undefined){
      this.Year = new Date(value).getFullYear();
      this.CurrentYear = new Date().getFullYear();
      this.Age = this.CurrentYear - this.Year;
      this.SignUpData.Age = this.Age.toString();
    }
  }
}
