import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationDeatilPageRoutingModule } from './notification-deatil-routing.module';

import { NotificationDeatilPage } from './notification-deatil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationDeatilPageRoutingModule
  ],
  declarations: [NotificationDeatilPage]
})
export class NotificationDeatilPageModule {}
