import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PieChartPageRoutingModule } from './pie-chart-routing.module';

import { PieChartPage } from './pie-chart.page';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PieChartPageRoutingModule
  ],
  declarations: [PieChartPage, HeaderComponent, TabsComponent]
})
export class PieChartPageModule {}
