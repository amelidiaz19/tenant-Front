import { RouterModule, Routes } from '@angular/router';
import { LayoutHomeComponent } from './layout-home/layout-home.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: LayoutHomeComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./homepage/homepage.component').then(
            (m) => m.HomepageComponent
          ),
      },
      {
        path: 'about-us',
        loadComponent: () =>
          import('./about-us/about-us.component').then(
            (m) => m.AboutUsComponent
          ),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./auth/sign-in/sign-in.component').then(
            (m) => m.SignInComponent
          ),
      },
      {
        path: 'register/:id',
        loadComponent: () =>
          import('./auth/sign-up/sign-up.component').then(
            (m) => m.SignUpComponent
          ),
      },
      {
        path: 'pricing',
        loadComponent: () =>
          import('./pricing/pricing.component').then((m) => m.PricingComponent),
      },
      {
        path: 'documentation',
        loadComponent: () =>
          import('./documentation/documentation.component').then((m) => m.DocumentationComponent),
      },
    ],
  },
] as Routes;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutesModule {}
