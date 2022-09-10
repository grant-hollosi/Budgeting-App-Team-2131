import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {take, map} from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private auth: AuthService) { }

  sayHi() {
    console.log("Hi");
  }

  ngOnInit() {
    
  }

}
