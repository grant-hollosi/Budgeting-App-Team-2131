import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BarGraphPageRoutingModule } from './bar-graph-routing.module';

import { BarGraphPage } from './bar-graph.page';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BarGraphPageRoutingModule
  ],
  declarations: [BarGraphPage, HeaderComponent, TabsComponent]
})
export class BarGraphPageModule {}
