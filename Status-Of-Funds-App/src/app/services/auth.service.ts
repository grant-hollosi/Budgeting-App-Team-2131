import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { of } from 'rxjs';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { filter } from 'rxjs/operators';
import { ExceptionCode } from '@capacitor/core';
import { DataService } from './data.service';
const TOKEN_KEY = 'user-access-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<any>;
  authState = new BehaviorSubject(null);

  // Storage to store web token or any other cookies you might want to save
  constructor(public storage: Storage, private alertCtrl: AlertController, private dataService: DataService) {
    this.loadUser();
    this.user = this.authState.asObservable().pipe(
      filter(response => response)
    )
  }

  // Keep user logged in after refresh
  loadUser() {
    this.storage.get(TOKEN_KEY).then(data => {
      if (data) {
        this.authState.next(data);
      } else {
        this.authState.next({role: null});
      }
    });
  }

  // Return Observable<any>
  signIn(credentials) {
    let pw = credentials.pw;
    let user = null;
    
    // Send this info to backend and get appropriate web token
    // This is the hard coded version

    let fetch = new Promise((resolve) => {
      this.dataService.signIn(pw).then((result: string) => {
        if (result)  {
          user = {
            pw, role: result.toUpperCase()
          }
          this.authState.next(user);
          this.storage.set(TOKEN_KEY, user);
          resolve(user);
        } else {
          throw new Error("Incorrect Login");
        }
      })
    });

    
    // Stores Token Locally

    // Video guide said to use return of(user), but of is not recognized
    return fetch; 
  }

  async showAlert() {
    console.log("Show Alert");
    let alert = await this.alertCtrl.create({
      header: "Incorrect Password",
      message: "Please Re-enter the correct password",
      buttons: ['OK'],
    }); // .then(res => res.present());
    alert.present();
  }

  protected static apiUrl = "https://localhostrxlhaqtsbl.execute-api.us-east-2.amazonaws.com/test/test"
}
