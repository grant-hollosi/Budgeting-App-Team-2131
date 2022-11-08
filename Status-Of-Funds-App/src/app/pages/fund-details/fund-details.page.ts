import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fund-details',
  templateUrl: './fund-details.page.html',
  styleUrls: ['./fund-details.page.scss'],
})
export class FundDetailsPage implements OnInit {
  data = history.state.data['result'];

  constructor() {}

  ngOnInit() {
    console.log(this.data);
  }

  
}
