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
  isAboutUsModalOpen = false;
  // @ViewChild(IonModal) help: IonModal;

  constructor(private storage: Storage, private router: Router) { }

  ngOnInit() {}


  setOpen(isOpen: boolean, variable: string) {
    if (variable == "settings") {
      this.isSettingsModalOpen = isOpen;
    }
    if (variable == "aboutUs" && isOpen) {
      this.isSettingsModalOpen = false;
      this.isAboutUsModalOpen = isOpen;
    }
    if (variable == "aboutUs" && !isOpen) {
      this.isSettingsModalOpen = true;
      this.isAboutUsModalOpen = isOpen;
    }
  }

  async logout() {
    this.setOpen(false, "settings");
    this.storage.get('flagged').then((flags) => {
      this.storage.get('server-url').then((url) => {
        console.log(flags, url);
        this.storage.clear().then((clear) => {
          // this.storage.forEach((val, key) => {
          //   console.log(val, key);
          // })
          this.storage.set('flagged', flags).then((result) => {
            this.storage.set('server-url', url).then((done) => {
              this.navigate('/');
            });
          })
        })
      });
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
