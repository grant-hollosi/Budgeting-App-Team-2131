import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController, AlertController, IonModal, IonInput } from '@ionic/angular';
import { reduce } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { DataService } from 'src/app/services/data.service';

// import { promises as fsPromises } from 'fs';
// import { join } from 'path';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('server_modal') server_modal: IonModal
  @ViewChild('server_endpoint') server: IonInput;

  user = {
    pw: ''
  };
  constructor(private dataService: DataService, private alertCtrl: AlertController, private router: Router, private auth: AuthService, private toastCtrl: ToastController, private storage: Storage) { }

  ngOnInit() {
    this.storage.forEach((val, key) => {
      console.log(val, key);
    })
  }

  // New login() with authentication services
  // subscribe() is basically a method to display an Observable. Here is a quick read to describe what it is, I'm not entirely sure yet 
  // https://blog.logrocket.com/understanding-rxjs-observables/#:~:text=An%20Observable%20is%20basically%20a,an%20infinite%20range%20of%20values


  async login() {
    try {
      this.auth.signIn(this.user).then(async (user) => {
        console.log(user);
        const role = user['role'];
        if (role) {
          this.router.navigateByUrl('/loader');
        }
      });
    } catch (e) {
      console.log(e);
      const loginError = await this.toastCtrl.create({
        message: 'Login Failed',
        duration: 3000,
        position: 'bottom',
        color: 'danger',
        buttons:
        [
          {
            text: 'Dismiss',
            role: 'cancel'
          }
        ]
      });

      await loginError.present();
    }
  }

  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Please input admin password.',
      buttons: ['Cancel', 'OK'],
      inputs: [
        {
          type: 'password',
          placeholder: 'Password',
          attributes: {
            maxlength: 20,
          },
        },
      ]
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    // this.changePassword(result.data.values[0])
    if (result.data) {
      this.dataService.existingPassword('admin', result.data.values[0]).then(async (result) => {
        if (result) {
          this.setOpen(true, 'server_modal');
        } else {
          const loginError = await this.toastCtrl.create({
            message: 'Authentication Failed',
            duration: 3000,
            position: 'bottom',
            color: 'danger',
            buttons:
            [
              {
                text: 'Dismiss',
                role: 'cancel'
              }
            ]
          });
    
          await loginError.present();
        }
      });
    }
  }

  setOpen(open: boolean, modal: string) {
    if (modal == 'server_modal') {
      this.server_modal.isOpen = open;
    }
  }

  async changeServer(endpoint: string) {
    console.log("Server: ", endpoint);
    let jsonServer = JSON.stringify(endpoint, null, 2);
    console.log("JSON: ", jsonServer);
    //this.asyncWriteFile('./server-info.json', jsonServer);
  }

  // async asyncWriteFile(filename: string, data: any) {
  //   try {
  //     await fsPromises.writeFile(join(__dirname, filename), data, {
  //       flag: 'w',
  //     });

  //     const contents = await fsPromises.readFile(
  //       join(__dirname, filename),
  //       'utf-8',
  //     );
  //     console.log("Contents: ", contents);
  //   } catch (err) {
  //     console.log(err);
  //     return 'Something went wrong';
  //   }
  // }
  
}
