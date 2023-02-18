import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild("sidenav") private sidenav;
  constructor(){}

  ngOnInit(): void {
  }

  readLocalStorageValue(key:string) {
    return localStorage.getItem(key);
  }

  removekey(){
    localStorage.clear();
    if(this.readLocalStorageValue("userId") == null){
      this.sidenav.opened = "false";
    }
  }
}
