import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private storage: Storage) {}
  async ngOnInit() {
    await this.storage.create();
  }
}
export const TOKEN_KEY = 'user-access-token';
