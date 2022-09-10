import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {

  constructor(private router: Router, private auth: AuthService, private alertCtrl: AlertController) {}

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.user.pipe(
      take(1),
      map(user => {
        console.log("Log: ", user);
        let role = user.role;
        if (role == "ADMIN") {
          return true;
        } else {
          this.showAlert();
          return this.router.parseUrl("/loader");
        }
      })
    )
  }

  async showAlert() {
    console.log("Show Alert");
    alert("You are not authorized to visit that page. Returning to Home");
    
    // let alert = await this.alertCtrl.create({
    //   header: "Unauthorized",
    //   message: "You are not authorized to visit that page",
    //   buttons: ['OK'],
    // });
    // alert.present;
  }
  
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
