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

  output: JSON;
  obj: any = {
    "row1":{"Funded Program: ": "S.0084619.1", "DPI: ": "GFEBS", "SAG: ": "1PLR", "Commitments: ": "1464.3", "Obligation: ": "1464.3", "Disbursements: ": "0", "AOR: ": "FU", "CostCenter: ": "40385520", "Commodity: ": "TRANSPORT_PAX", "TransDate: ": "2021/10/12 00:00:00"},
    "row2":{"Funded Program: ": "S.0084605.2.9", "DPI: ": "GFEBS", "SAG: ": "1PLR", "Commitments: ": "0", "Obligation: ": "0", "Disbursements: ": "0", "AOR: ": "R8", "CostCenter: ": "40385654", "Commodity: ": "TRANSPORT_EQUIP", "TransDate: ": "2021/10/18 00:00:00"},
    "row3":{"Funded Program: ": "ARMY", "DPI: ": "GFEBS", "SAG: ": "1PLR", "Commitments: ": "0", "Obligation: ": "0", "Disbursements: ": "0", "AOR: ": "R8", "CostCenter: ": "40385652", "Commodity: ": "TRANSPORT_EQUIP", "TransDate: ": "2021/10/01 00:00:00"},
    "row4":{"Funded Program: ": "S.0084605.1", "DPI: ": "GFEBS", "SAG: ": "1PLR", "Commitments: ": "14089.67", "Obligation: ": "14089.67", "Disbursements: ": "0", "AOR: ": "R8", "CostCenter: ": "40234828", "Commodity: ": "RENTS, COMMS & UTILITIES", "TransDate: ": "S.0084619.1"},
    "row5":{"Funded Program: ": "S.0084619.1", "DPI: ": "GFEBS", "SAG: ": "S.0084619.1", "Commitments: ": "S.0084619.1", "Obligation: ": "S.0084619.1", "Disbursements: ": "S.0084619.1", "AOR: ": "R8", "CostCenter: ": "S.0084619.1", "Commodity: ": "S.0084619.1", "TransDate: ": "S.0084619.1"},
    "row6":{"Funded Program: ": "S.0084619.1", "DPI: ": "GFEBS", "SAG: ": "S.0084619.1", "Commitments: ": "S.0084619.1", "Obligation: ": "S.0084619.1", "Disbursements: ": "S.0084619.1", "AOR: ": "R8", "CostCenter: ": "S.0084619.1", "Commodity: ": "S.0084619.1", "TransDate: ": "S.0084619.1"},
  };
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {}
   
   loadDataBase() {

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
