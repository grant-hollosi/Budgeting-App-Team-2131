import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  inputValue: string = "";
  constructor(private router: Router) { }

  ngOnInit() {
  }

  login(){
    console.log("Button pressed");
    if (this.inputValue == "adminPassword123") {
      console.log("Admin Login");
      this.router.navigate(['loader']);
    } else if (this.inputValue== "userPassword123") {
      console.log("User password");
      this.router.navigate(['loader']);
    }
    else {
      //Consider writing our own custom error
      //Need functionality to add red text underneath 
      //password text field saying "Wrong Password"
      throw new Error("Wrong Password");
    }
  }

}
