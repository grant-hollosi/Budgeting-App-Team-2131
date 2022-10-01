import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  isHelpOpen = false;
  isAboutOpen = false;
  isPolicyOpen = false;
  isTermsOpen = false;


  SetHelp(isOpen: boolean) {
    this.isHelpOpen = isOpen;
  }

  SetAbout(isOpen: boolean) {
    this.isAboutOpen = isOpen;
  }

  SetPolicy(isOpen: boolean) {
    this.isPolicyOpen = isOpen;
  }

  SetTerms(isOpen: boolean) {
    this.isTermsOpen = isOpen;
  }

}
