import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationDeatilPage } from './notification-deatil.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationDeatilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationDeatilPageRoutingModule {}
