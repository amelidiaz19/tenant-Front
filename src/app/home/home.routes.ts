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
            import('./homepage/homepage.component').then((m) => m.HomepageComponent),
        },
        {
          path: 'about-us',
          loadComponent: () =>
            import('./about-us/about-us.component').then(
              (m) => m.AboutUsComponent
            ),
          data: {
            title: 'Catálogo',
          },
        },
        {
          path: 'auth',
          loadComponent: () =>
            import('./auth/sign-in/sign-in.component').then((m) => m.SignInComponent),
        },
        {
          path: 'contact',
          loadComponent: () =>
            import('./contact/contact.component').then(
              (m) => m.ContactComponent
            ),
        },
      ],
    },
  ] as Routes;
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class HomeRoutesModule {}
  