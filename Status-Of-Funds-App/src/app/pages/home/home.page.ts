import { AuthService } from "../../services/auth.service";
import {take, map} from 'rxjs/operators';

import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { IonButton, IonIcon, IonInfiniteScroll, IonList, LoadingController } from '@ionic/angular';


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
  public all_results: any[];
  public results: any[];
  chunk: any;
  start_id: any;
  end_id: any;
  public list_item: any;
  public query = `SELECT * FROM dataTable WHERE id > 1`;
  private loading: any;

  constructor(private auth: AuthService, private router: Router, private dataService: DataService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.chunk = 100;
    this.start_id = 0;
    this.end_id = this.start_id + this.chunk;
    this.dataService.wipe();
    this.results = new Array();
    let fetch = this.dataService.populate(this.query);
    fetch.then((result) => {
      if (Array.isArray(result)) {
        this.all_results = result;
        this.results = this.results.concat(this.all_results.slice(this.start_id, this.end_id));
        this.showLoading(false);
      }
    });
  }

  loadData(event) {
    setTimeout(() => {
      event.target.complete();
      this.start_id += this.chunk;
      this.end_id = this.start_id + this.chunk;
      this.results = this.results.concat(this.all_results.slice(this.start_id, this.end_id));

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
  
  navigate(page: string, item: any) {
    // this.router.navigate([page]);
    this.router.navigate([page], {state: {data: {'result': item}}});
  }

  async showLoading(show: boolean) {
    if (show) {
      this.loading = await this.loadingCtrl.create({
        message: 'Retrieving filtered data...',
        spinner: 'bubbles'
      });
      this.loading.present();
    } else if (this.loading) {
      this.loading.dismiss();
    }
  }

}