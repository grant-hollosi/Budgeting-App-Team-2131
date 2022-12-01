import { Component, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { IonModal, IonRange, IonDatetime, IonCheckbox, IonInput } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import * as moment from '../../../../node_modules/moment';
import { HomePage } from 'src/app/pages/home/home.page';
import { Storage } from '@ionic/storage';

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
  commodities: any[];
  private min: any;
  private max: any;
  public maxDate: any;
  public minDate: any;
  private sort_by = '';
  private directions = {
    'alphabet': '',
    'date': '',
    'amount': '',
    'aor': ''
  }
  private filters = {
    'aor': '',
    'date': '',
    'amount': '',
    'flag': '',
    'commodity':''
  }

  constructor(private dataService: DataService, private home: HomePage, private storage: Storage) {
    this.aors = new Array();
    this.commodities = new Array();
    this.min = 0;
    this.max = 0;
  }

  ngOnInit() {
    let fetch = this.dataService.getQuery(`SELECT DISTINCT AOR FROM dataTable`);
    fetch.then((result) => {
      if (Array.isArray(result)) {
        for (let r in result) {
          this.aors.push(result[r]['AOR']);
        }
        this.aors.sort();
      }
    });

    fetch = this.dataService.getQuery("SELECT MIN(Obligations) FROM dataTable");
    fetch.then((result) => {
      this.min = result[0]['MIN(Obligations)'];
    });

    fetch = this.dataService.getQuery("SELECT MAX(Obligations) FROM dataTable");
    fetch.then((result) => {
      this.max = result[0]['MAX(Obligations)'];
    });

    fetch = this.dataService.getQuery("SELECT MAX(TransDate) FROM dataTable");
    fetch.then((result) => {
      this.maxDate = result[0]['MAX(TransDate)'].slice(0, -1);
    });

    fetch = this.dataService.getQuery("SELECT MIN(TransDate) FROM dataTable WHERE NOT TransDate = '0000-00-00 00:00:00'");
    fetch.then((result) => {
      this.minDate = result[0]['MIN(TransDate)'].slice(0, -1);
    })

    fetch = this.dataService.getQuery("SELECT DISTINCT Commodity FROM dataTable");
    fetch.then((result) => {
      if (Array.isArray(result)) {
        for (let r in result) {
          this.commodities.push(result[r]['Commodity']);
        }
        this.commodities.sort();
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

  async filter(){
    // AMOUNT FILTER
    if (this.lower.value && this.upper.value) {
      this.filters['amount'] = `Obligations BETWEEN ${this.lower.value} AND ${this.upper.value}`; 
    } else if (this.lower.value) {
      this.filters['amount'] = `Obligations >= ${this.lower.value}`;
    } else if (this.upper.value) {
      this.filters['amount'] = `Obligations <= ${this.upper.value}`;
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
      this.filters['aor'] = `AOR IN (${selected_aors})`;
    }

    // FLAG FILTER
    let selected_statuses = {};
    this.filters['flag'] = '';
    await this.storage.get('user-access-token').then(async (user) => {
      for (let cb in this.checkboxes['_results']) {
        if (this.checkboxes['_results'][cb]['el']['id'] == 'flag') {
          selected_statuses[this.checkboxes['_results'][cb].value] = this.checkboxes['_results'][cb].checked;
        }
      }

      if (selected_statuses['flagged'] && !selected_statuses['unflagged']) {
        await this.storage.get('flagged').then((result: object) => {
          if (result[user['role']].length) {
            this.filters['flag'] = `RecID IN (${result[user['role']].toString()})`;
          }
        })
      } else if (!selected_statuses['flagged'] && selected_statuses['unflagged']) {
        await this.storage.get('flagged').then((result: object) => {
          if (result[user['role']].length) {
            this.filters['flag'] = `NOT RecID IN (${result[user['role']].toString()})`;
          }
        });
      }
    });

    let commodites_selected = false;
    let selected_commodities = '';
    for (let cb in this.checkboxes['_results']) {
      if (this.checkboxes['_results'][cb].checked && this.checkboxes['_results'][cb]['el']['id'] == 'commodity') {
        commodites_selected = true;
        let value = this.checkboxes['_results'][cb].value.replace('&', '%26');
        selected_commodities = selected_commodities.concat(`\'${value}\'`, ',');
      }
    }
    selected_commodities = selected_commodities.slice(0, -1);
    if (commodites_selected) {
      this.filters['commodity'] = `Commodity IN (${selected_commodities})`;
    }


    this.updateResults();
    this.setOpen(false, 'filter');
  }

  clearFilters() {
    for (let key in this.filters) {
      this.filters[key] = '';
    }
    this.date_picker.value = this.minDate;
    this.updateResults();
  }

  async sort(sort_by: string){
    switch(sort_by) {
      case 'alphabet':
        if (this.directions['alphabet'] == 'forward') {
          this.sort_by = 'ORDER BY Commodity ASC';
          this.directions['alphabet'] = 'backward';
        } else {
          this.sort_by = 'ORDER BY Commodity DESC';
          this.directions['alphabet'] = 'forward';
        }
        break;
      case 'date':
        if (this.directions['date'] == 'forward') {
          this.sort_by = 'ORDER BY TransDate ASC';
          this.directions['date'] = 'backward';
        } else {
          this.sort_by = 'ORDER BY TransDate DESC';
          this.directions['date'] = 'forward';
        }
        break;
      case 'amount':
        if (this.directions['amount'] == 'forward') {
          this.sort_by = 'ORDER BY Obligations ASC';
          this.directions['amount'] = 'backward';
        } else {
          this.sort_by = 'ORDER BY Obligations DESC';
          this.directions['amount'] = 'forward';
        }
        break;
      case 'aor':
        if (this.directions['aor'] == 'forward') {
          this.sort_by = 'ORDER BY AOR ASC';
          this.directions['aor'] = 'backward';
        } else {
          this.sort_by = 'ORDER BY AOR DESC';
          this.directions['aor'] = 'forward';
        }
        break;
    }
    // this.setOpen(false, 'sort');
    this.updateResults();
  }

  clearSort() {
    this.sort_by = '';
    for (let key in this.directions) {
      this.directions[key] = '';
    }
    this.updateResults();
  }

  dateChanged() {
    if (this.date_picker.value) {
      let date = moment(this.date_picker.value).format('YYYY-MM-DD');
      this.filters['date'] = `(TransDate > '${date} 00:00:00' OR TransDate = '0000-00-00 00:00:00')`;
    }
  }

  updateResults() {
    let query = "SELECT * FROM dataTable";
    let applied_filter = false;
    for (let key in this.filters) {
      // console.log(this.filters[key] && !applied_filter);
      if (!applied_filter && this.filters[key]) {
        applied_filter = true;
        // console.log("APPLYING FIRST FILTER", this.filters[key]);
        query = query.concat(' WHERE ', this.filters[key]);
        // console.log(query);
      } else if (this.filters[key]) {
        query = query.concat(' AND ', this.filters[key])
      }
    }
    query = query.concat(' ', this.sort_by).trim();
    // console.log(query);
    this.dataService.populate(query).then((result) => {
      this.home.ionViewWillEnter();
    })
  }

}
