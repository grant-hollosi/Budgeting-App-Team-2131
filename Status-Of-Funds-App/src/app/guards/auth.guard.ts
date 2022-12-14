import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, map } from 'rxjs/operators'
import { FundDetailsPage } from '../pages/fund-details/fund-details.page';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {

  constructor(private router: Router, private auth: AuthService, private alertCtrl: AlertController) {}

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const expectedRole = route.data.role;
      // SHOWS EXPECTED ROLE, JUST FOR TESTING
      // console.log('expected: ', expectedRole);

      return this.auth.user.pipe(
      take(1),
      map(user => {
        // SHOWS USER OBSERVABLE, JUST FOR TESTING
        // console.log("Log: ", user);

        let role = user['role'];
        // If they are a user with a non-null role,
        // then if the expected role for the page is the same, they are able to access the page,
        // if they are an admin, they have access to everything
        // the last else if checks if they have the USER role to return them home
        // else return them to login screen
        if (role == "ADMIN" || role == "USER") {
          if (expectedRole == role) {
            return true;
          } else if (role == "ADMIN") {
            return true;
          } else if (role == "USER") {
            this.showAlert();
            return this.router.parseUrl('/home');
          }
        } else {
          this.showAlert();
          return this.router.parseUrl('');
        }
      })
    )
  }

  async showAlert() {
    console.log("Show Alert");
    let alert = await this.alertCtrl.create({
      header: "Unauthorized",
      message: "You are not authorized to visit that page. Rerouting...",
      buttons: ['OK'],
    });
    alert.present();
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
