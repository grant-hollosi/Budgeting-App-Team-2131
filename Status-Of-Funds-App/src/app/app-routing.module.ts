import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsComponent } from './components/tabs/tabs.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'loader',
    loadChildren: () => import('./pages/loader/loader.module').then(m => m.LoaderPageModule), 
    canActivate: [AuthGuard], 
    data: {
      role: 'USER'
    }
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule), 
    canActivate: [AuthGuard], 
    data: {
      role: 'USER'
    }
  },
  {
    path: 'fund-details',
    loadChildren: () => import('./pages/fund-details/fund-details.module').then(m => m.FundDetailsPageModule), 
    canActivate: [AuthGuard], 
    data: {
      role: 'USER'
    }
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule), 
    canActivate: [AuthGuard], 
    data: {
      role: 'ADMIN'
    }
  },
  {
    path: 'graph',
    loadChildren: () => import('./pages/graph/graph.module').then(m => m.GraphPageModule),
    canActivate: [AuthGuard],
    data: {
      role: 'USER'
    }
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
