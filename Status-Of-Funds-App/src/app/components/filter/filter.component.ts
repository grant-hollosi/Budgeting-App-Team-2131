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

  close() {
    console.log("closing");
    console.log(this.filterModal.didPresent, this.sortModal.didPresent);
    if (this.filterModal.didPresent) {
      this.filterModal.dismiss(null, 'close');
      this.filterModal.isOpen = false;
    } 
    
    if (this.sortModal.didPresent) {
      this.sortModal.dismiss(null, 'close');
      this.sortModal.isOpen = false;
    }
  }

}
