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

  constructor(private auth: AuthService, private router: Router, public http: HttpClient) { }

  ngOnInit() {
    // let data = this.getQuery("SELECT * FROM dataTable WHERE id BETWEEN 1 AND 5");
    // data.then((crud) => console.log(crud));

    // data = this.getQuery("SELECT * FROM dataTable WHERE id BETWEEN 20 AND 25");
    // data.then((crud) => console.log(crud));
    this.populate("SELECT * FROM dataTable WHERE id BETWEEN 1 AND 5");
  }

  populate(query) {
    let data = this.getQuery(query);
    data.then((results) => {
        if (Array.isArray(results)) {
          results.forEach((result) => {
            // console.log(result);
              let element = `<ion-item detail="true" role="article" (click)="navigate('../fund-details/')">
              <ion-label>
                <h2>${result['Commodity']}</h2>
                <p>${result['AOR']}</p>
              </ion-label>
              <p>${result['Obligations']}</p>
              <ion-button (click)="toggleFlag($event)" fill="clear" color="dark">
                <ion-icon style="height: 24px; width: 24px" name="flag-outline" slot="end"></ion-icon>
              </ion-button>
            </ion-item>`;
            // console.log(element);
            this.list['el'].innerHTML += element;
          });
          }
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
