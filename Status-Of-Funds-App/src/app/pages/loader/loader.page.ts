import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss'],
})
export class LoaderPage implements OnInit {

  public data: any;
  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit() {
    this.data = this.dataService.populate(`SELECT * FROM dataTable WHERE id > 1`);
    this.data.then((result) => {
      this.router.navigate(['home']);
    });
  }

}
