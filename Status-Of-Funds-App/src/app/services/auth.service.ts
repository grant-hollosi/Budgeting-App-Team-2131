import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { of } from 'rxjs';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { filter } from 'rxjs/operators';
import { ExceptionCode } from '@capacitor/core';
const TOKEN_KEY = 'user-access-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<any>;
  authState = new BehaviorSubject(null);

  // Storage to store web token or any other cookies you might want to save
  constructor(private storage: Storage, private alertCtrl: AlertController) {
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
  signIn(credentials): Observable<any> {
    let pw = credentials.pw;
    let user = null;
    
    // Send this info to backend and get appropriate web token
    // This is the hard coded version

    if (pw === "adminPassword123") {
      user = { pw, role: "ADMIN" };
    } else if (pw === "userPassword123") {
      user = { pw, role: "USER" };
    } else {
      throw new Error("Incorrect Login");
    }

    this.authState.next(user);
    
    // Stores Token Locally
    this.storage.set(TOKEN_KEY, user);

    // Video guide said to use return of(user), but of is not recognized
    return of(user); 
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
}
