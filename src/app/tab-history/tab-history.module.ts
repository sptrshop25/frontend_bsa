import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabHistoryPageRoutingModule } from './tab-history-routing.module';

import { TabHistoryPage } from './tab-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabHistoryPageRoutingModule,
    DatePipe
  ],
  declarations: [TabHistoryPage]
})
export class TabHistoryPageModule {}
