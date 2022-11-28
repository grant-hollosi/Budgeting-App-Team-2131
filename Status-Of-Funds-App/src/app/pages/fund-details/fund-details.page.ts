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
  flagged = false;
  flags: number[]
  static item_id: number;

  constructor(private dataService: DataService, private storage: Storage) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.storage.get('id').then((val) => {
      let fetch = this.dataService.getItem(val);
      fetch.then((result) => {
        this.data = result[0];

        this.storage.get('user-access-token').then((user) => {
          this.storage.get('flagged').then((results) => {
            this.flags = results[user['role']]
          })
        })
      });
    });
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
          result[user['role']] = result[user['role']].slice(0, result[user['role']].indexOf(recID)).concat(result[user['role']].slice(result[user['role']].indexOf(recID) + 1, result[user['role']].length));
          this.storage.set('flagged', result);
        }
      });
    });
  }
  
}
