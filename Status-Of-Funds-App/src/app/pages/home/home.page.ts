import { AuthService } from '../../services/auth.service';
import {take, map} from 'rxjs/operators';

import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { IonButton, IonIcon, IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  
  output: JSON = <JSON><unknown>{
    "row0":{"Funded Program: ": "S.0084619.1", "DPI: ": "GFEBS", "SAG: ": "1PLR", "Commitments: ": "1464.3", "Obligation: ": "1464.3", "Disbursements: ": "0", "AOR: ": "FU", "CostCenter: ": "40385520", "Commodity: ": "TRANSPORT_PAX", "TransDate: ": "2021/10/12 00:00:00"},
    "row1":{"Funded Program: ": "S.0084605.2.9", "DPI: ": "GFEBS", "SAG: ": "1PLR", "Commitments: ": "0", "Obligation: ": "0", "Disbursements: ": "0", "AOR: ": "R8", "CostCenter: ": "40385654", "Commodity: ": "TRANSPORT_EQUIP", "TransDate: ": "2021/10/18 00:00:00"},
    "row2":{"Funded Program: ": "ARMY", "DPI: ": "GFEBS", "SAG: ": "1PLR", "Commitments: ": "0", "Obligation: ": "0", "Disbursements: ": "0", "AOR: ": "R8", "CostCenter: ": "40385652", "Commodity: ": "TRANSPORT_EQUIP", "TransDate: ": "2021/10/01 00:00:00"},
    "row3":{"Funded Program: ": "S.0084605.1", "DPI: ": "GFEBS", "SAG: ": "1PLR", "Commitments: ": "14089.67", "Obligation: ": "14089.67", "Disbursements: ": "0", "AOR: ": "R8", "CostCenter: ": "40234828", "Commodity: ": "RENTS, COMMS & UTILITIES", "TransDate: ": "S.0084619.1"},
    "row4":{"Funded Program: ": "S.0084605.2.9", "DPI: ": "GFEBS", "SAG: ": "1PLR", "Commitments: ": "-300.7", "Obligation: ": "-300.7", "Disbursements: ": "0", "AOR: ": "R8", "CostCenter: ": "40385654", "Commodity: ": "TRANSPORT_EQUIP", "TransDate: ": "2021/10/26 00:00:00"},
    "row5":{"Funded Program: ": "S.0084605.1", "DPI: ": "GFEBS", "SAG: ": "1PLR", "Commitments: ": "14089.67", "Obligation: ": "14089.67", "Disbursements: ": "0", "AOR: ": "R8", "CostCenter: ": "40234828", "Commodity: ": "RENTS, COMMS, & UTILITIES", "TransDate: ": "2021/10/27 00:00:00"},
    "row6":{"Funded Program: ": "ARMY", "DPI: ": "GFEBS", "SAG: ": "121", "Commitments: ": "3.36", "Obligation: ": "3.36", "Disbursements: ": "0", "AOR: ": "FU", "CostCenter: ": "40385512", "Commodity: ": "PAYROLL", "TransDate: ": "2021/12/30 00:00:00"},
    "row7":{"Funded Program: ": "ARMY", "DPI: ": "GCSS-A", "SAG: ": "111", "Commitments: ": "-24.57", "Obligation: ": "-24.57", "Disbursements: ": "0", "AOR: ": "RT", "CostCenter: ": "40385719", "Commodity: ": "PAYROLL", "TransDate: ": "2021/11/23 00:00:00"},
    "row8":{"Funded Program: ": "S.0087275.1.6", "DPI: ": "", "SAG: ": "1PLV", "Commitments: ": "0", "Obligation: ": "0", "Disbursements: ": "0", "AOR: ": "", "CostCenter: ": "", "Commodity: ": "SVS CONTRACTS", "TransDate: ": ""},
    "row9":{"Funded Program: ": "", "DPI: ": "58", "SAG: ": "321", "Commitments: ": "0", "Obligation: ": "13902", "Disbursements: ": "0", "AOR: ": "", "CostCenter: ": "", "Commodity: ": "GPC", "TransDate: ": "2022/02/11 00:00:00"}
  };

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    console.log(this.output);
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Loaded More Data');
      event.target.complete();

      // Determines if all data has been loaded
      // and disables infinite scroll if so.
      if (DataTransfer.length === 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleFlag(event) {
    event.stopPropagation();
    event.target.children[0].name = event.target.children[0].name === 'flag' ? 'flag-outline' : 'flag';
  }
  
  navigate(page: string) {
    this.router.navigate([page]);
  }

  filter() {
    console.log('filter clicked');
  }

  sort() {
    console.log('sort clicked');
  }

}
