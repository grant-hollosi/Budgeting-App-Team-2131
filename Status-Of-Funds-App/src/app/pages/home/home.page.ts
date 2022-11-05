import { AuthService } from '../../services/auth.service';
import {take, map} from 'rxjs/operators';

import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { IonButton, IonIcon, IonInfiniteScroll } from '@ionic/angular';

import { ApiService } from './../../api.service'

// let mysql = require('mysql');
// let config = require('./config.js');

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  datauser: any;

  constructor(private auth: AuthService, private router: Router, public api: ApiService) { }

  ngOnInit() { 
    this.getAOR();
    // this.getDataUser();
  }

  async getTest() {
    const result = fetch("http://localhost:3233/").then((res) => res.json()).then((data) => console.log(data.Result));
  }

  async getAOR() {
    var html = "<table border='1|1'>"
    const result = fetch("http://localhost:3233/").then((res) => res.json()).then((data) => setTimeout(() => {
      html+='<thead>';
      html+='<tr>';
      html+='<td>' + 'AOR' + '</td>';
      html+='<td>' + 'COMMITMENT' + '</td>';
      html+='<td>' + 'Commodity' + '</td>';
      html+='<td>' + 'Cost_Ctr' + '</td>';
      html+='<td>' + 'DPI' + '</td>';
      html+='<td>' + 'Disbursements' + '</td>';
      html+='<td>' + 'FundedProgram' + '</td>';
      html+='<td>' + 'Obligations' + '</td>';
      html+='<td>' + 'SAG' + '</td>';
      html+='<td>' + 'Trans_Date' + '</td>';
      html+='<td>' + 'id' + '</td>';
      html+='</tr>';
      html+='</thead>';

      for (var i = 1; i < data.Result.length; i++) {
        html+='<tr>';
        html+='<td>' + data.Result[i].AOR + '</td>';
        html+='<td>' + data.Result[i].Commitments + '</td>';
        html+='<td>' + data.Result[i].Commodity + '</td>';
        html+='<td>' + data.Result[i].CostCenter + '</td>';
        html+='<td>' + data.Result[i].DPI + '</td>';
        html+='<td>' + data.Result[i].Disbursements + '</td>';
        html+='<td>' + data.Result[i].FundedProgram + '</td>';
        html+='<td>' + data.Result[i].Obligations + '</td>';
        html+='<td>' + data.Result[i].SAG + '</td>';
        html+='<td>' + data.Result[i].TransDate + '</td>';
        html+='<td>' + data.Result[i].id + '</td>';
        html+='</tr>';
      }

      document.getElementById("populate").innerHTML = html;
    }, 500)); 
  }



  // async getDataUser() {
  //   await this.api.getDataUser().subscribe(res => {
  //     console.log(res);
  //     this.datauser = res.results;
  //     console.log(this.datauser);
  //   }, err => {
  //     console.log(err);
  //   });
  // }

  loadData(event) {
    setTimeout(() => {
      console.log('Loaded More Data');
      event.target.complete();

      // Determines if all data has been loaded
      // and disables infinite scroll if so.
      if (DataTransfer.length === 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleFlag(event) {
    event.stopPropagation();
    event.target.children[0].name = event.target.children[0].name === 'flag' ? 'flag-outline' : 'flag';
  }
  
  navigate(page: string) {
    this.router.navigate([page]);
  }

  filter() {
    console.log('filter clicked');
  }

  sort() {
    console.log('sort clicked');
  }

}
