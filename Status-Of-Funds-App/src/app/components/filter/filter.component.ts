import { Component, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { IonModal, IonRange, IonDatetime, IonCheckbox } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import * as moment from 'moment';
import { HomePage } from 'src/app/pages/home/home.page';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {

  @Input() title: string;
  @Input() goBack: boolean;
  @ViewChild(IonRange) range: IonRange;
  @ViewChild(IonDatetime) date_picker: IonDatetime;
  @ViewChildren(IonCheckbox) checkboxes: IonCheckbox;

  isFilterModalOpen = false;
  isSortModalOpen = false;

  aors: any[];
  private min: any;
  private max: any;
  public maxDate: any;

  constructor(private dataService: DataService, private home: HomePage) {
    this.aors = new Array();
    this.min = 0;
    this.max = 0;
  }

  ngOnInit() {
    let fetch = this.dataService.populate(`SELECT DISTINCT AOR FROM dataTable`);
    fetch.then((result) => {
      if (Array.isArray(result)) {
        for (let r in result) {
          this.aors.push(result[r]['AOR']);
        }
        this.aors.sort();
      }
    });

    fetch = this.dataService.populate("SELECT MIN(Obligations) FROM dataTable WHERE id > 1");
    fetch.then((result) => {
      this.min = result[0]['MIN(Obligations)'];
    });

    fetch = this.dataService.populate("SELECT MAX(Obligations) FROM dataTable WHERE id > 1");
    fetch.then((result) => {
      this.max = result[0]['MAX(Obligations)'];
    });

    fetch = this.dataService.populate("SELECT MAX(TransDate) FROM dataTable");
    fetch.then((result) => {
      this.maxDate = result[0]['MAX(TransDate)'].slice(0, -1);
    });
  }

  setOpen(isOpen: boolean, variable: string) {
    if (variable == 'filter') {
      this.isFilterModalOpen = isOpen;
    } else if (variable == 'sort') {
      this.isSortModalOpen = isOpen;
    }
  }

  filter(filter_by: string){
    if (filter_by == 'amount') {
      this.home.query = `SELECT * FROM dataTable WHERE Obligations BETWEEN ${this.range.value['lower']} AND ${this.range.value['upper']}`;
    } else if (filter_by == 'aor') {
      let selected_aors = '';
      for (let cb in this.checkboxes['_results']) {
        if (this.checkboxes['_results'][cb].checked && this.checkboxes['_results'][cb]['el']['id'] == 'aor') {
          selected_aors = selected_aors.concat(`\'${this.checkboxes['_results'][cb].value}\'`, ',');
        }
      }
      selected_aors = selected_aors.slice(0, -1);
      this.home.query = `SELECT * FROM dataTable WHERE AOR IN (${selected_aors})`;
    } else if (filter_by == 'date') {
      let date = moment(this.date_picker.value).format('YYYY-MM-DD');
      this.home.query = `SELECT * FROM dataTable WHERE TransDate >= '${date} 00:00:00'`
    } else if (filter_by == 'flag') {
      let selected_statuses = '';
      for (let cb in this.checkboxes['_results']) {
        if (this.checkboxes['_results'][cb].checked && this.checkboxes['_results'][cb]['el']['id'] == 'flag') {
          selected_statuses = selected_statuses.concat(this.checkboxes['_results'][cb].value, ',');
        }
      }
      selected_statuses = selected_statuses.slice(0, -1);
    }
    this.home.showLoading(true);
    this.home.ngOnInit();
    this.setOpen(false, 'filter');
  }

  clearFilters() {
    this.home.showLoading(true);
    this.home.query = `SELECT * FROM dataTable WHERE id > 1`;
    this.home.ngOnInit();
    this.setOpen(false, 'filter');
  }

  search(){
    console.log("Beginning search");
  }

  sort(){
    console.log("Opening sorting options");

    console.log('filter pressed');
  }

}
