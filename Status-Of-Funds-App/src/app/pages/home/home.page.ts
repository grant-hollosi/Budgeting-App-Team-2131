import { AuthService } from '../../services/auth.service';
import {take, map} from 'rxjs/operators';

import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { IonButton, IonIcon, IonInfiniteScroll, IonList } from '@ionic/angular';

import { ApiService } from './../../api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonList) list: IonList;
  datauser: any;
  results: any[];
  chunk: any;
  start_id: any;
  end_id: any;

  constructor(private auth: AuthService, private router: Router, public http: HttpClient) { }

  ngOnInit() {
    this.chunk = 50;
    this.start_id = 2;
    this.end_id = this.start_id + this.chunk;
    this.results = new Array();
    // let data = this.getQuery("SELECT * FROM dataTable WHERE id BETWEEN 1 AND 5");
    // data.then((crud) => console.log(crud));

    // data = this.getQuery("SELECT * FROM dataTable WHERE id BETWEEN 20 AND 25");
    // data.then((crud) => console.log(crud));
    this.populate(`SELECT * FROM dataTable WHERE id BETWEEN ${this.start_id} AND ${this.end_id}`);
  }

  populate(query) {
    let data = this.getQuery(query);
    data.then((result) => {
      if (Array.isArray(result)) { this.results = this.results.concat(result); }
    });
  }

  async getQuery(query) {
    let url = "https://rxlhaqtsbl.execute-api.us-east-2.amazonaws.com/v1/populate/?query=" + query;
    let req = this.http.get(url);
    let results = new Promise((resolve) => {
      req.subscribe((data) => {
        resolve(JSON.parse(data.toString()));
      })
    });
    return results;
  }

  loadData(event) {
    setTimeout(() => {
      event.target.complete();
      this.start_id += this.chunk;
      this.end_id = this.start_id + this.chunk;
      this.populate(`SELECT * FROM dataTable WHERE id BETWEEN ${this.start_id} AND ${this.end_id}`);

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
