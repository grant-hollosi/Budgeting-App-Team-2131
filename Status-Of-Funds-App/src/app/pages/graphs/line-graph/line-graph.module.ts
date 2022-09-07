import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LineGraphPageRoutingModule } from './line-graph-routing.module';

import { LineGraphPage } from './line-graph.page';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LineGraphPageRoutingModule
  ],
  declarations: [LineGraphPage, HeaderComponent, TabsComponent]
})
export class LineGraphPageModule {}
