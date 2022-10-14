import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() title: string;
  @Input() goBack: boolean;

  @ViewChild(IonModal) modal: IonModal;
  @ViewChild(IonModal) help: IonModal;

  constructor(private storage: Storage) { }

  ngOnInit() {}


  close() {
    this.modal.dismiss(null, 'close');
  }

  async logout() {
    console.log("logging out");
    this.close();
    localStorage.removeItem('user-access-token');
  }


  settings() {
    console.log("Opening settings");
  }

  back() {
    console.log("Going back");
  }

}
