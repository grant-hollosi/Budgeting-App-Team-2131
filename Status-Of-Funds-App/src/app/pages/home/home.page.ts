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
    this.getDataUser();
  }

  // async getDataBase() {
  //   let connection = mysql.createConnection({     
  //     host: 'current-funds.ceg6zn3wrywt.us-east-2.rds.amazonaws.com',
  //     database: 'currentFunds',
  //     user: 'admin',
  //     password: 'yellowjackets',
  //   })
  //   let sql = `SELECT * FROM dataTable WHERE id = 2`;
  //   connection.query(sql, (error, results, fields) => {
  //     if (error) {
  //       return console.error(error.message);
  //     }
  //     console.log(results);
  //   });
  //   connection.end();
  // }

  async getDataUser() {
    await this.api.getDataUser().subscribe(res => {
      console.log(res);
      this.datauser = res.results;
      console.log(this.datauser);
    }, err => {
      console.log(err);
    });
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
