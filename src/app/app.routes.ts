import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./home/home.routes').then((m) => m.HomeRoutesModule),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./dashboard/dashboard.routes').then(
        (m) => m.DashboardRoutesModule
      ),
    data: {
      title: 'Dashboard',
      roles: ['administrador', 'encargado'],
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
