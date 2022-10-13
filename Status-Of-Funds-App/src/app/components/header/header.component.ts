import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() title: string;
  @Input() goBack: boolean;

  @ViewChild(IonModal) modal: IonModal;

  constructor() { }

  ngOnInit() {}

  close() {
    this.modal.dismiss(null, 'close');
  }

}
