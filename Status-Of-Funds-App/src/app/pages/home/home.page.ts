import { AuthService } from "../../services/auth.service";
import {take, map} from 'rxjs/operators';

import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { IonButton, IonIcon, IonInfiniteScroll, IonList } from '@ionic/angular';

import { ApiService } from './../../api.service';
// import { HttpClient } from '@angular/common/http';
import { DataService } from "src/app/services/data.service";

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

  constructor(private auth: AuthService, private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.chunk = 100;
    this.start_id = 2;
    this.end_id = this.start_id + this.chunk;
    this.results = new Array();
    this.dataService.wipe();
    let query = this.dataService.populate(`SELECT * FROM dataTable WHERE id BETWEEN ${this.start_id} AND ${this.end_id}`);
    query.then((result) => {
      if (Array.isArray(result)) {
        this.results = result;
      }
    });
  }

  loadData(event) {
    event.target.complete();
      this.start_id += this.chunk;
      this.end_id = this.start_id + this.chunk;
      let query = this.dataService.populate(`SELECT * FROM dataTable WHERE id BETWEEN ${this.start_id} AND ${this.end_id}`);
      query.then((result) => {
        if (Array.isArray(result)) {
          this.results = this.results.concat(result);
        }
      });
      // Determines if all data has been loaded
      // and disables infinite scroll if so.
      if (DataTransfer.length === 1000) {
        event.target.disabled = true;
      }
  }

  toggleFlag(event) {
    event.stopPropagation();
    event.target.children[0].name = event.target.children[0].name === 'flag' ? 'flag-outline' : 'flag';
  }
  
  navigate(page: string, extras: any) {
    this.router.navigate([page], {state: {data: extras}});
  }

  filter() {
    console.log('filter clicked');
  }

  sort() {
    console.log('sort clicked');
  }

}
