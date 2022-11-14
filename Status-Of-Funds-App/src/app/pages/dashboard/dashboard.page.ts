import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonInput, IonItem, IonModal, ToastController } from '@ionic/angular';
import { stringify } from 'querystring';
import { DataService } from 'src/app/services/data.service';
const bcrypt = require('bcryptjs');

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild('password_modal') password_modal: IonModal;
  @ViewChild('admin_password') admin_pass: IonInput;
  @ViewChild('user_password') user_pass: IonInput;

  isValid = {
    user: true,
    admin: true
  }

  errorMessage = '';

  constructor(private alertCtrl: AlertController, private dataService: DataService, private toastCtrl: ToastController) { }

  ngOnInit() {}
 
  async authenticateAdmin() {
    const alert = await this.alertCtrl.create({
      header: "Please enter the admin password.",
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
      this.dataService.passwordExists('admin', result.data.values[0]).then(async (result) => {
        if (result) {
          this.setOpen(true, 'password_modal');
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

  validate(input: string, user: string) {
    let invalid_characters = [
      '(', ')', '{', '}', '[', ']', '<', '>', ':', ';', '#', '~', '_', '-', '+', '=', '@', ',', ' ', '\'', '\"', '\\', '/'
    ]
    if (input) {
      let valid_input = true;
      for (let c in invalid_characters) {
        if (input.includes(invalid_characters[c])) {
          valid_input = false;
          break;
        }
      }

      if (!valid_input) {
        this.isValid[user] = false;
        this.errorMessage = 'Passwords cannot include: ';
        this.errorMessage += invalid_characters.join('');
      } else {
        this.isValid[user] = true;
      }
    } else {
      this.isValid[user] = true;
    }
  }

  async showError(message: string) {
    return await this.alertCtrl.create({
      header: message,
      buttons: ['OK'],
    });
  }

  async submit_passwords(validation: object) {
    let error;
    if (validation[0] && validation[1]) {
      if (validation[0]['input'] == validation[1]['input']) {
        error = await this.showError("Passwords cannot match!");
        await error.present();
      } else {

        for (let v in validation) {
          if (validation[v]['user'] && validation[v]['input']) {
            let exists = await this.dataService.existingPassword(validation[v]['input']);
            if (exists) {
              error = await this.showError(`${validation[v]['user'].toUpperCase()} password already exists. Please try a different password.`);
              await error.present();
            }
          }
        }

        if (!error) {
          for (let v in validation) {
            if (validation[v]['user'] && validation[v]['input']) {
              if (this.isValid[validation[v]['user']]) {
                this.dataService.changePassword(validation[v]['input'], validation[v]['user']).then(async (result) => {
                  this.setOpen(false, 'password_modal');

                  const success = await this.toastCtrl.create({
                    message: 'Passwords updated',
                    duration: 3000,
                    position: 'bottom',
                    color: 'success',
                    buttons:
                    [
                      {
                        text: 'Dismiss',
                        role: 'cancel'
                      }
                    ]
                  });
            
                  await success.present();
                })
              }
            }
          }
        }
      }
    } else {
      error = await this.showError("Unknown error. Please try again.");
      await error.present();
    }
  }

  setOpen(open: boolean, modal: string) {
    if (modal == 'password_modal') {
      this.password_modal.isOpen = open;
    }
  }

  changePassword(user: string, password: string) {
    let crypt = bcrypt.hash('password')
    this.dataService.getQuery(`INSERT INTO passwords (user_type, password) VALUES ()`)
  }

}
