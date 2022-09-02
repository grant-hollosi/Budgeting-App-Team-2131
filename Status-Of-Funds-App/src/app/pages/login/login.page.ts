import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  inputValue: string = "";
  constructor() { }

  ngOnInit() {
  }

  logInButtonAction(){
    console.log("Button pressed");
    if (this.inputValue == "adminPassword123") {
      console.log("Admin Login");

    } else if (this.inputValue== "userPassword123") {
      console.log("User password")
    }
    else {
      //Consider writing our own custom error
      //Need functionality to add red text underneath 
      //password text field saying "Wrong Password"
      throw new Error("Wrong Password");
    }
  }

}
