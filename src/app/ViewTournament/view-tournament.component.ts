import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';

export class ViewTournamentModel {
  uid: string;
  tid: string;
  tName: string;
  OrganiserName: string;
  city: string;
  phoneNumber: string;
  startDate: Date;
  endDate: Date;
  ballType: string;
  matchType: string;
  description: string;
  createedDate: string;
  modifiedDate: string;
}

@Injectable()
export class ViewTournamentService{
  constructor(private HttpCall: HttpClient){}

  GetTournamentData(Uid): Observable<string>{
    return this.HttpCall.post<string>("http://localhost:8080/CricketScoringApp/Tournament/GetTournamentData",{ UserId: Uid });
  }
}

@Component({
  selector: 'app-view-tournament',
  templateUrl: './view-tournament.component.html',
  styleUrls: ['./view-tournament.component.css'],
  providers: [ViewTournamentService]
})
export class ViewTournamentComponent implements OnInit{

  ViewTournamentData: ViewTournamentModel = new ViewTournamentModel();
  ViewTournamentDataSource: ViewTournamentModel[] = []; 

  constructor(private Service: ViewTournamentService){}

  ngOnInit() {
    this.ViewTournamentData.uid = localStorage.getItem("userId");
    this.GetTournamentData();
  }

  GetTournamentData(){
    try{
      this.Service.GetTournamentData(this.ViewTournamentData.uid).subscribe((res) => {
        let tempResult = JSON.parse(res);
        if(tempResult.Table.length > 0 && tempResult.Table != undefined){
          this.ViewTournamentDataSource = tempResult.Table;
        }
        console.log(tempResult);
      });
    }
   catch(ex){
    Swal.fire(ex,'','error');
   }
  }
}