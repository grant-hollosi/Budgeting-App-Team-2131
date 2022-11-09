import { Component, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { IonModal, IonRange, IonDatetime, IonCheckbox, IonInput } from '@ionic/angular';
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
  @ViewChild("lower") lower: IonInput;
  @ViewChild("upper") upper: IonInput;
  @ViewChild(IonDatetime) date_picker: IonDatetime;
  @ViewChildren(IonCheckbox) checkboxes: IonCheckbox;

  isFilterModalOpen = false;
  isSortModalOpen = false;

  aors: any[];
  private min: any;
  private max: any;
  public maxDate: any;
  public minDate: any;
  private sort_by: any;
  private directions = {
    'alphabet': 'forward',
    'date': 'forward',
    'amount': 'forward',
    'aor': 'forward'
  }

  constructor(private dataService: DataService, private home: HomePage) {
    this.aors = new Array();
    this.min = 0;
    this.max = 0;
  }

  ngOnInit() {
    let fetch = this.dataService.populate(`SELECT DISTINCT AOR FROM dataTable WHERE id > 1`);
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

    fetch = this.dataService.populate("SELECT MAX(TransDate) FROM dataTable WHERE id > 1");
    fetch.then((result) => {
      this.maxDate = result[0]['MAX(TransDate)'].slice(0, -1);
    });

    fetch = this.dataService.populate("SELECT MIN(TransDate) FROM dataTable WHERE id > 1 AND NOT TransDate = '0000-00-00 00:00:00'");
    fetch.then((result) => {
      this.minDate = result[0]['MIN(TransDate)'].slice(0, -1);
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
    // AMOUNT FILTER
    if (this.lower.value && this.upper.value) {
      this.home.filters['amount'] = `AND Obligations BETWEEN ${this.lower.value} AND ${this.upper.value}`; 
    } else if (this.lower.value) {
      this.home.filters['amount'] = `AND Obligations >= ${this.lower.value}`;
    } else if (this.upper.value) {
      this.home.filters['amount'] = `AND Obligations <= ${this.upper.value}`;
    }

    // AOR FILTER
    let aor_selected = false;
    let selected_aors = '';
    for (let cb in this.checkboxes['_results']) {
      if (this.checkboxes['_results'][cb].checked && this.checkboxes['_results'][cb]['el']['id'] == 'aor') {
        aor_selected = true;
        selected_aors = selected_aors.concat(`\'${this.checkboxes['_results'][cb].value}\'`, ',');
      }
    }
    selected_aors = selected_aors.slice(0, -1);
    if (aor_selected) {
      this.home.filters['aor'] = `AND AOR IN (${selected_aors})`
    }
    
    // DATE FILTER
    if (this.date_picker.value) {
      let date = moment(this.date_picker.value).format('YYYY-MM-DD');
      this.home.filters['date'] = `AND TransDate > '${date} 00:00:00'`;
    }

    // FLAG FILTER
    let selected_statuses = '';
    for (let cb in this.checkboxes['_results']) {
      if (this.checkboxes['_results'][cb].checked && this.checkboxes['_results'][cb]['el']['id'] == 'flag') {
        selected_statuses = selected_statuses.concat(this.checkboxes['_results'][cb].value, ',');
      }
    }
    selected_statuses = selected_statuses.slice(0, -1);

    this.home.ngOnInit();
    this.setOpen(false, 'filter');
  }

  clearFilters() {
    for (let key in this.home.filters) {
      this.home.filters[key] = '';
    }
    this.date_picker.value = this.minDate;
    this.home.ngOnInit();
    this.setOpen(false, 'filter');
  }

  search(){
    console.log("Beginning search");
  }

  async sort(sort_by: string){
    switch(sort_by) {
      case 'alphabet':
        if (this.directions['alphabet'] == 'forward') {
          this.home.sort_by = 'ORDER BY Commodity ASC';
          this.directions['alphabet'] = 'backward';
        } else {
          this.home.sort_by = 'ORDER BY Commodity DESC';
          this.directions['alphabet'] = 'forward';
        }
        break;
      case 'date':
        if (this.directions['date'] == 'forward') {
          this.home.sort_by = 'ORDER BY TransDate ASC';
          this.directions['date'] = 'backward';
        } else {
          this.home.sort_by = 'ORDER BY TransDate DESC';
          this.directions['date'] = 'forward';
        }
        break;
      case 'amount':
        if (this.directions['amount'] == 'forward') {
          this.home.sort_by = 'ORDER BY Obligations ASC';
          this.directions['amount'] = 'backward';
        } else {
          this.home.sort_by = 'ORDER BY Obligations DESC';
          this.directions['amount'] = 'forward';
        }
        break;
      case 'aor':
        if (this.directions['aor'] == 'forward') {
          this.home.sort_by = 'ORDER BY AOR ASC';
          this.directions['aor'] = 'backward';
        } else {
          this.home.sort_by = 'ORDER BY AOR DESC';
          this.directions['aor'] = 'forward';
        }
        break;
    }
    // this.setOpen(false, 'sort');
    this.home.ngOnInit();
  }

  clearSort() {
    this.home.sort_by = '';
    for (let key in this.directions) {
      this.directions[key] = 'forward';
    }
    this.setOpen(false, 'sort');
    this.home.ngOnInit();
  }

  dateChanged(event) {
    if (event.detail.value > this.date_picker.max) {
      this.date_picker.value = this.date_picker.max;
    }
  }

}
