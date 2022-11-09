import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { HomePage } from '../home/home.page';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-fund-details',
  templateUrl: './fund-details.page.html',
  styleUrls: ['./fund-details.page.scss'],
})
export class FundDetailsPage implements OnInit {
  data: any;
  static item_id: number;

  constructor(private dataService: DataService, private storage: Storage) {}

  ngOnInit() {
    this.storage.get('id').then((val) => {
      console.log(val);
      let fetch = this.dataService.getItem(val);
      fetch.then((result) => {
        this.data = result[0];
      });
    });
  }
  
}
