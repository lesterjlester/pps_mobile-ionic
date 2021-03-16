import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children : [
      {
        path : '',
        redirectTo : '/landing/driver',
        pathMatch : 'full'
      },
      {
        path: 'driver',
        loadChildren: () => import('../driver/driver.module').then( m => m.DriverPageModule)
      }, 
      {
        path: 'travel',
        loadChildren: () => import('../travel/travel.module').then( m => m.TravelPageModule)
      }, 
      {
        path: 'incident',
        loadChildren: () => import('../incident/incident.module').then( m => m.IncidentPageModule)
      }, 
      {
        path: 'report',
        loadChildren: () => import('../report/report.module').then( m => m.ReportPageModule)
      }, 
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
      }, 
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
