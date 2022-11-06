import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {

  @Input() title: string;
  @Input() goBack: boolean;

  @ViewChild(IonModal) filterModal: IonModal;
  @ViewChild(IonModal) sortModal: IonModal;

  constructor() { }

  ngOnInit() {}

  close() {
    if (this.filterModal.didPresent) {this.filterModal.dismiss(null, 'close')}
    if (this.sortModal.didPresent) {this.sortModal.dismiss(null, 'close')}
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
