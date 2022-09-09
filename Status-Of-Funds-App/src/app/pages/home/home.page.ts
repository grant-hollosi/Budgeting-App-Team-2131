import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { IonButton, IonIcon, IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChildren(IonIcon) icon: IonIcon;
  @ViewChildren(IonButton) button: IonButton;

  constructor(private router: Router) { }

  ngOnInit() { }

  loadData(event) {
    setTimeout(() => {
      console.log("Done");
      event.target.complete();

      if (DataTransfer.length === 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  toggleFlag(event) {
    event.stopPropagation();
    event.target.children[0].name = event.target.children[0].name == "flag" ? "flag-outline" : "flag";
  }

  navigate(page: string) {
    this.router.navigate([page]);
  }

}
