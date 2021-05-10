import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'; 
import { AuthGuard } from './services/auth-guard.service';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./views/login/login.module').then( m => m.LoginPageModule)
  },   {
    path: 'landing',
    loadChildren: () => import('./views/landing/tabs/tabs.module').then( m => m.TabsPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'driver',
    loadChildren: () => import('./views/landing/driver/driver.module').then( m => m.DriverPageModule)
  },
  {
    path: 'travel',
    loadChildren: () => import('./views/landing/travel/travel.module').then( m => m.TravelPageModule)
  },
  {
    path: 'incident',
    loadChildren: () => import('./views/landing/incident/incident.module').then( m => m.IncidentPageModule)
  },
  {
    path: 'report',
    loadChildren: () => import('./views/landing/report/report.module').then( m => m.ReportPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./views/landing/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'maps',
    loadChildren: () => import('./views/maps/maps.module').then( m => m.MapsPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./views/landing/notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'notification-deatil',
    loadChildren: () => import('./views/landing/notification-deatil/notification-deatil.module').then( m => m.NotificationDeatilPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
