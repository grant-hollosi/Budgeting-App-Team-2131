import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsComponent } from './components/tabs/tabs.component';
import { UploadPage } from './pages/upload/upload.page';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'loader',
    loadChildren: () => import('./pages/loader/loader.module').then(m => m.LoaderPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'pie-chart',
    loadChildren: () => import('./pages/graphs/pie-chart/pie-chart.module').then(m => m.PieChartPageModule)
  },
  {
    path: 'line-graph',
    loadChildren: () => import('./pages/graphs/line-graph/line-graph.module').then(m => m.LineGraphPageModule)
  },
  {
    path: 'bar-graph',
    loadChildren: () => import('./pages/graphs/bar-graph/bar-graph.module').then(m => m.BarGraphPageModule)
  },
  {
    path: 'fund-details',
    loadChildren: () => import('./pages/fund-details/fund-details.module').then(m => m.FundDetailsPageModule)
  },
  {
    path: 'upload',
    loadChildren: () => import('./pages/upload/upload.module').then(m => m.UploadPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule)
  },  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
