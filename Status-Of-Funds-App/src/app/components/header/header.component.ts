import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() goBack: boolean;

  @ViewChild(IonModal) modal: IonModal;
  // @ViewChild(IonModal) help: IonModal;

  constructor(private storage: Storage) { }

  ngOnInit() {}


  close() {
    if (this.modal.didPresent) {this.modal.dismiss(null, 'close');}
    // if (this.help.didPresent) {this.help.dismiss(null, 'close')}
  }

  async logout() {
    console.log("logging out");
    this.close();
    this.storage.clear();
  }


  settings() {
    console.log("Opening settings");
  }

  back() {
    console.log("Going back");
  }

}
