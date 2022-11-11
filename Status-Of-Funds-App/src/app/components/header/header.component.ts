import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() goBack: boolean;

  isSettingsModalOpen = false;
  // @ViewChild(IonModal) help: IonModal;

  constructor(private storage: Storage, private router: Router) { }

  ngOnInit() {}


  setOpen(isOpen: boolean, variable: string) {
    if (variable == "settings") {
      this.isSettingsModalOpen = isOpen;
    }
  }

  async logout() {
    this.setOpen(false, "settings");
    this.storage.get('flagged').then((result) => {
      console.log(result);
      this.storage.clear().then((clear) => {
        this.storage.forEach((val, key) => {
          console.log(val, key);
        })
        this.storage.set('flagged', result).then((result) => {
          this.navigate('/');
        })
      })
    });
  }


  settings() {
    console.log("Opening settings");
  }

  back() {
    this.router.navigate(['home']);
  }

  navigate(page: string) {
    this.router.navigate([page]);
  }
}
