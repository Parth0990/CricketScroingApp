import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AutoCompleteProp, CommonVariable } from '../Environment/CommonVariables';
//import * as bcrypt from 'bcryptjs';
import Swal from 'sweetalert2';
import { LoaderService } from '../Service/loader.service';

export class EditMyProfileModel {
  uid: number;
  username: string;
  password: string;
  fname: string;
  lname: string;
  email: string;
  phonenumber: string;
  UserId: string;
  Age: string;
  DOB: Date;
  Gender: number;
  CreatedDate: Date;
  ModifiedDate: Date;
  cnfPassword: string;
}

@Injectable()
export class EditMyProfileService {
  CM: CommonVariable = new CommonVariable();
  constructor(private HttpCall: HttpClient) {}

  GetUserInfo(UserId): Observable<string> {
    return this.HttpCall.post<string>(this.CM.Web_Url + 'Login/GetEditData', {
      UserId: UserId,
    });
  }

  EditMyData(UserData,Uid): Observable<string> {
    return this.HttpCall.post<string>(this.CM.Web_Url + 'Login/SaveUserData',{UserData :JSON.stringify(UserData), Uid : Uid});
  }
}

@Component({
  selector: 'app-edit-my-profile',
  templateUrl: './edit-my-profile.component.html',
  styleUrls: ['./edit-my-profile.component.css'],
  providers: [EditMyProfileService]
})
export class EditMyProfileComponent implements OnInit {
  CM: CommonVariable = new CommonVariable();
  EditMyData: EditMyProfileModel = new EditMyProfileModel();
  Gender: AutoCompleteProp[] = [];
  SelectedGender: AutoCompleteProp[] = [];
  Year: number;
  CurrentYear: number;
  Age: number;
  IsChangePassword: boolean = false;
  ValidMessage: string;

  constructor(private Service: EditMyProfileService, private OverLay: LoaderService) {}
  ngOnInit() {
    this.GetUserInfo();
  }

  EditMyPersonalData(){
    try{
      this.OverLay.setLoading(true);
      if(this.EditMyData.uid > 0){
        this.EditMyData.ModifiedDate = new Date();
      }
      this.Service.EditMyData(this.EditMyData, this.EditMyData.uid).subscribe((res) => {
        if(res.includes("1:")){
          Swal.fire(res.replace("1:", ""), 'Data Saved','success');
          this.GetUserInfo();
          this.OverLay.setLoading(false);
        }
        else{
          Swal.fire(res.replace("0:",""), "Enter Valid Data","warning");
        }
      });
    }
    catch(ex){
      Swal.fire(ex,'','error');
    }
  }

  GetUserInfo() {
    try {
      this.EditMyData.UserId = localStorage.getItem('userId');
      this.OverLay.setLoading(true);
      this.Service.GetUserInfo(this.EditMyData.UserId).subscribe((res) => {
        let tempResult = JSON.parse(res);
        if(tempResult.Table1.length > 0 && tempResult.Table1 != undefined){
          this.Gender = <AutoCompleteProp[]>tempResult.Table1;
        }
        if(tempResult.Table2.length > 0 && tempResult.Table2 != undefined){
          this.SelectedGender = <AutoCompleteProp[]>tempResult.Table2;
        }
        if(tempResult.Table.length > 0 && tempResult.Table != undefined){
          this.EditMyData = <EditMyProfileModel> Object.assign({},tempResult.Table[0]);
          // this.Year = new Date(this.EditMyData.DOB).getFullYear();
          // this.CurrentYear = new Date().getFullYear();
          // this.Age = this.CurrentYear - this.Year;
          // this.EditMyData.Age = this.Age.toString();
        }
        
      });
      this.OverLay.setLoading(false);
    } catch (ex) {
      Swal.fire(ex, '', 'error');
    }
  }

  onDateChange(value){
    if(value != null && value != undefined){
      this.Year = new Date(value).getFullYear();
      this.CurrentYear = new Date().getFullYear();
      this.Age = this.CurrentYear - this.Year;
      this.EditMyData.Age = this.Age.toString();
    }
  }

  ChangePassword(){
    if(this.EditMyData.password != this.EditMyData.cnfPassword){
      Swal.fire("Password Doesn't Match",'','warning');
      this.ValidMessage = "Not Match";
    }
    else{
      Swal.fire("Congratulation your Password Saved Successfully!!",'','success');
    }
  }

  ChangeTab(action_name){
    if(action_name == 'IsPasswordTab'){
      this.IsChangePassword = true;
      this.EditMyData.password = "";
    }
    else{
      this.IsChangePassword = false;
    }
  }
}
