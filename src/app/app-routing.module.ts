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
    canActivate: [AuthGuard]
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

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
