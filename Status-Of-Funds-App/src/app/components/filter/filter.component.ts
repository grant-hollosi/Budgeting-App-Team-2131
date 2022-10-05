import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {

  @Input() title: string;
  @Input() goBack: boolean;

  constructor() { }

  ngOnInit() {}

  filter(){
    console.log("Opening filter options");
  }

  search(){
    console.log("Beginning search");
  }

  sort(){
    console.log("Opening sorting options");

    console.log('filter pressed');
  }

}
