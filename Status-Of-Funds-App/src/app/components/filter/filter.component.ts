import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {

  @Input() title: string;
  @Input() goBack: boolean;

  isFilterModalOpen = false;
  isSortModalOpen = false;

  aors: any[];

  constructor(private dataService: DataService) {
    this.aors = new Array();
  }

  ngOnInit() {
    let query = this.dataService.populate(`SELECT DISTINCT AOR FROM dataTable`);
    query.then((result) => {
      if (Array.isArray(result)) {
        this.aors = result;
      }
    })
  }

  setOpen(isOpen: boolean, variable: string) {
    if (variable == 'filter') {
      this.isFilterModalOpen = isOpen;
    } else if (variable == 'sort') {
      this.isSortModalOpen = isOpen;
    }
  }

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
