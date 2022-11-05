import { AuthService } from '../../services/auth.service';
import {take, map} from 'rxjs/operators';

import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { IonButton, IonIcon, IonInfiniteScroll } from '@ionic/angular';

import { ApiService } from './../../api.service';
import { HttpClient } from '@angular/common/http';
// import { HTTP } from 'http';
// import { askAndReceive }  from './../../../../../Server/server';

// var mysql = require('serverless-mysql')();

// mysql.config({
//     host: 'current-funds.ceg6zn3wrywt.us-east-2.rds.amazonaws.com',
//     database: 'currentFunds',
//     user: 'admin',
//     password: 'yellowjackets',
//     port: '3306'
// });


// function askAndReceive(q) {
//     let results = mysql.query(q);
//     return results;
// }

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  datauser: any;

  constructor(private auth: AuthService, private router: Router, public http: HttpClient) { }

  ngOnInit() {
    let data = this.getQuery("SELECT * FROM dataTable WHERE id BETWEEN 1 AND 5");
    data.then((crud) => console.log(crud));
  }

  async getQuery(query) {
    let url = "https://rxlhaqtsbl.execute-api.us-east-2.amazonaws.com/v1/populate/?query=" + query;
    let req = this.http.get(url);
    let results = new Promise((resolve) => {
      req.subscribe((data) => resolve(data));
    });
    return results;
  }

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
