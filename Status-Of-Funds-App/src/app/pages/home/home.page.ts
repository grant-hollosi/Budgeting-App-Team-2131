import { AuthService } from "../../services/auth.service";
import {take, map, filter} from 'rxjs/operators';

import { Component, Injectable, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { IonButton, IonIcon, IonInfiniteScroll, IonList, LoadingController } from '@ionic/angular';
import { DataService } from "src/app/services/data.service";
import { HttpClient } from '@angular/common/http';
import { FundDetailsPage } from "../fund-details/fund-details.page";
import { Storage } from "@ionic/storage";
import { userInfo } from "os";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})


@Injectable({
  providedIn: 'root'
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonList) list: IonList;

  datauser: any;
  public all_results: any[];
  public results: any[];
  chunk: any;
  start_id: any;
  public list_item: any;
  public query = `SELECT * FROM dataTable`;
  private loading: any;
  public sort_by = '';
  public filters = {
    'aor': '',
    'date': '',
    'amount': '',
    'flag': ''
  }
  private flags: number[];

  constructor(private auth: AuthService, private router: Router, public dataService: DataService, private loadingCtrl: LoadingController, private storage: Storage) { }

  ngOnInit() {
    this.initData();
    this.storage.forEach((value, key) => {
      console.log(key, value);
    })
  }

  ionViewWillEnter() {
    this.showLoading(true);
    this.initData();

    this.storage.get('user-access-token').then((user) => {
      this.storage.get('flagged').then((result: object) => {
        this.flags = result[user['role']];
        console.log(this.flags);
      });
    });
  }

  initData() {
    this.results = new Array();
    this.chunk = 100;
    this.start_id = 0;
    let query = this.query;
    let applied_filter = false;
    for (let key in this.filters) {
      console.log(this.filters[key] && !applied_filter);
      if (!applied_filter && this.filters[key]) {
        applied_filter = true;
        console.log("APPLYING FIRST FILTER", this.filters[key]);
        query = query.concat(' WHERE ', this.filters[key]);
        console.log(query);
      } else if (this.filters[key]) {
        query = query.concat(' AND ', this.filters[key])
      }
    }
    query = query.concat(' ', this.sort_by).trim();
    console.log(query);
    let fetch = this.dataService.populate(query);
    fetch.then((result) => {
      if (Array.isArray(result)) {
        this.all_results = result;
        this.results = this.results.concat(this.all_results.slice(this.start_id, this.start_id + this.chunk));
        this.showLoading(false);
      }
    });
  }

  loadData(event) {
    event.target.complete();
      this.start_id += this.chunk;
      this.results = this.results.concat(this.all_results.slice(this.start_id, this.start_id + this.chunk));

      // Determines if all data has been loaded
      // and disables infinite scroll if so.
      if (DataTransfer.length === 1000) {
        event.target.disabled = true;
      }
  }

  isFlagged(id: number) {
    if (this.flags) {
      return this.flags.includes(id);
    }
    return false;
  }

  toggleFlag(event, recID: number) {
    event.stopPropagation();
    event.target.children[0].name = event.target.children[0].name === 'flag' ? 'flag-outline' : 'flag';
    this.storage.get('user-access-token').then((user) => {
      this.storage.get('flagged').then((result: object) => {
        if (event.target.children[0].name === 'flag') {
          result[user['role']].push(recID);
          this.storage.set('flagged', result);
        } else {
          let new_result = result[user.role].slice(0, result[user.role].indexOf(recID)).concat(result[user.role].slice(result[user.role].indexOf(recID) + 1, result[user.role].length));
          this.storage.set('flagged', new_result);
        }
      });
    });
  }
  
  navigate(page: any, item: any) {
    this.storage.set('id', item.id).then(() => {
      this.router.navigate([page]);
    });
  }

  async showLoading(show: boolean) {
    if (show) {
      this.loading = await this.loadingCtrl.create({
        message: 'Retrieving filtered data...',
        spinner: 'bubbles',
        duration: 1000
      });
      this.loading.present();
    } else if (this.loading) {
      this.loading.dismiss();
    }
  }

}