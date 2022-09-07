import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FundDetailsPageRoutingModule } from './fund-details-routing.module';

import { FundDetailsPage } from './fund-details.page';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FundDetailsPageRoutingModule
  ],
  declarations: [FundDetailsPage, HeaderComponent, TabsComponent]
})
export class FundDetailsPageModule {}
