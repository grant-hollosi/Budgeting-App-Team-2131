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
    this.data = this.dataService.populate(`SELECT * FROM dataTable WHERE id BETWEEN 2 AND 102`);
    setTimeout(() => {
      this.router.navigate(['home']);
    }, 1000);
  }

}
