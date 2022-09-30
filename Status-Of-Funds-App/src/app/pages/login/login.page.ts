import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user = {
    pw: '', 
    // role: '';
  };
  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
  }

  // New login() with authentication services
  // subscribe() is basically a method to display an Observable. Here is a quick read to describe what it is, I'm not entirely sure yet 
  // https://blog.logrocket.com/understanding-rxjs-observables/#:~:text=An%20Observable%20is%20basically%20a,an%20infinite%20range%20of%20values
  login() {
    console.log("Button Pressed");
    this.auth.signIn(this.user).subscribe(user => {
      console.log("Login: ", user);
      let role = user['role'];
      if (role == "ADMIN") {
        this.router.navigateByUrl("/upload");
      } else if (role == "USER") {
        this.router.navigateByUrl("/loader");
      }
    })
  }
}
