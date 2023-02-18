import { Component } from '@angular/core';
import { DateAdapter } from '@angular/material/core';

export class AddtournamentModel {
  startdate: Date;
  enddate!: Date;
  Oname!: string;
  Onumber!: string;
  City!: string;
  TournamentName!: number;
  MatchType!: string;
  BallType!: string;
  Description!: string;
}

@Component({
  selector: 'Addtournament',
  templateUrl: './add-tournament.component.html',
  styleUrls: ['./add-tournament.component.css'],
})
export class AddTournamentComponent {
  AddTournamentData: AddtournamentModel = new AddtournamentModel();

  constructor(private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en-GB');
  }

  MatchType = [
    {
      ObjId: 1,
      ObjName: 'Limited Over',
    },
    {
      ObjId: 2,
      ObjName: 'Box Cricket',
    },
    {
      ObjId: 3,
      ObjName: 'The Hundred',
    },
  ];

  BallType = [
    {
      ObjId: 1,
      ObjName: 'Tennis',
    },
    {
      ObjId: 2,
      ObjName: 'Leather',
    },
    {
      ObjId: 3,
      ObjName: 'Other',
    },
  ];

  Addtournament() {
    this.AddTournamentData.MatchType = this.MatchType.find(
      (x) => x.ObjId
    ).ObjName;
    this.AddTournamentData.BallType = this.BallType.find(
      (x) => x.ObjId
    ).ObjName;
    console.log(this.AddTournamentData);
  }
}
