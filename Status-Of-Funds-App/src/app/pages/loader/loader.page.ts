import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss'],
})
export class LoaderPage implements OnInit {

  public data: any;
  constructor(private router: Router, private dataService: DataService, private storage: Storage) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.data = this.dataService.populate(`SELECT * FROM dataTable`);
    this.data.then((result) => {
      this.storage.get('filtered_results').then((results) => {
        this.router.navigate(['home']);
      })
    });
  }

}
