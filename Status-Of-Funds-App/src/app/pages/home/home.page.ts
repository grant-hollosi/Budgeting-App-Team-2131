import { AuthService } from "../../services/auth.service";
import {take, map, filter} from 'rxjs/operators';

import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { IonButton, IonIcon, IonInfiniteScroll, IonList, LoadingController } from '@ionic/angular';
import { DataService } from "src/app/services/data.service";
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
  public all_results: any[];
  public results: any[];
  chunk: any;
  start_id: any;
  public list_item: any;
  public query = `SELECT * FROM dataTable WHERE id > 1`;
  private loading: any;
  public sort_by = '';
  public filters = {
    'aor': '',
    'date': '',
    'amount': ''
  }

  constructor(private auth: AuthService, private router: Router, private dataService: DataService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.showLoading(true);
    this.chunk = 100;
    this.start_id = 0;
    this.results = new Array();
    let query = this.query;
    for (let key in this.filters) {
      query = query.concat(' ', this.filters[key]).trim();
    }
    query = query.concat(' ', this.sort_by).trim();

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
    setTimeout(() => {
      event.target.complete();
      this.start_id += this.chunk;
      this.results = this.results.concat(this.all_results.slice(this.start_id, this.start_id + this.chunk));

      // Determines if all data has been loaded
      // and disables infinite scroll if so.
      if (DataTransfer.length === 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleFlag(event) {
    event.stopPropagation();
    console.log(event.target.children);
    event.target.children[0].name = event.target.children[0].name === 'flag' ? 'flag-outline' : 'flag';
  }
  
  navigate(page: string, item: any) {
    // this.router.navigate([page]);
    this.router.navigate([page], {state: {data: {'result': item}}});
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