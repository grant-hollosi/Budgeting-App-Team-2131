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
<<<<<<< HEAD
    console.log("Opening filter options");
  }

  search(){
    console.log("Beginning search");
  }

  sort(){
    console.log("Opening sorting options");
=======
    console.log('filter pressed');
  }

  search(){
    console.log('search pressed');
  }

  sort(){
    console.log('sort pressed');
>>>>>>> 4afa54cb43f156d0c07ec888188b8303559331f7
  }

}
