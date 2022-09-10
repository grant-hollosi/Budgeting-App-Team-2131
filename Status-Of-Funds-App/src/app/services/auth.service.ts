import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { of } from 'rxjs';
import { Storage } from '@ionic/storage';

const TOKEN_KEY = 'user-access-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<any>;
  authState = new BehaviorSubject(null);

  // Storage to store web token or any other cookies you might want to save
  constructor(private storage: Storage) {
    this.user = this.authState.asObservable();
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
      throw new Error("Wrong Password");
    }

    this.authState.next(user);
    
    // Stores Token Locally
    this.storage.set(TOKEN_KEY, user);

    // Video guide said to use return of(user), but of is not recognized
    return of(user); 
  }
}
