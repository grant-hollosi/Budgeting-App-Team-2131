import { AuthService } from '../../services/auth.service';
import {take, map} from 'rxjs/operators';

import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { IonButton, IonIcon, IonInfiniteScroll } from '@ionic/angular';

import { ApiService } from './../../api.service'

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
