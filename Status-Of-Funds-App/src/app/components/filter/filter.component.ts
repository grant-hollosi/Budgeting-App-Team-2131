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
    console.log('filter pressed');
  }

  search(){
    console.log('search pressed');
  }

  sort(){
    console.log('sort pressed');
  }

}
