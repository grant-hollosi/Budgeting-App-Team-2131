import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fund-details',
  templateUrl: './fund-details.page.html',
  styleUrls: ['./fund-details.page.scss'],
})
export class FundDetailsPage implements OnInit {
  data = history.state.data;

  constructor() { }

  ngOnInit() {
    console.log(this.data);
  }

  toggleFlag(event) {
    event.stopPropagation();
    event.target.children[0].name = event.target.children[0].name === 'flag' ? 'flag-outline' : 'flag';
  }

  
}
