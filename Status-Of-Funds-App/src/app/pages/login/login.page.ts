import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';
import { reduce } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user = {
    pw: '',
    role: ''
  };
  constructor(private router: Router, private auth: AuthService, private toastController: ToastController) { }

  ngOnInit() {
  }

  // New login() with authentication services
  // subscribe() is basically a method to display an Observable. Here is a quick read to describe what it is, I'm not entirely sure yet 
  // https://blog.logrocket.com/understanding-rxjs-observables/#:~:text=An%20Observable%20is%20basically%20a,an%20infinite%20range%20of%20values
  async login() {
    console.log('Button Pressed');

    try {
      this.auth.signIn(this.user).subscribe(async user => {
        console.log('Login: ', user);
        const role = user.role;
        if (role === 'ADMIN') {
          this.router.navigateByUrl('/loader');
        } else if (role === 'USER') {
          this.router.navigateByUrl('/loader');
        }
      });
    } catch (e) {
      console.log(e);
      const loginError = await this.toastController.create({
        message: 'Login Failed',
        duration: 3000,
        position: 'top',
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

  // login(){
  //   console.log("Button pressed");
  //   if (this.user.pw == "adminPassword123") {
  //     console.log("Admin Login");
  //     this.router.navigate(['loader']);
  //   } else if (this.user.pw == "userPassword123") {
  //     console.log("User password");
  //     this.router.navigate(['loader']);
  //   }
  //   else {
  //     //Consider writing our own custom error
  //     //Need functionality to add red text underneath 
  //     //password text field saying "Wrong Password"
  //     throw new Error("Wrong Password");
  //   }
  // }

}
