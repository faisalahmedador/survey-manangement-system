import { Routes } from '@angular/router';
import {LayoutHomeComponent} from './layout/layout-home/layout-home.component';
import {Login} from './auth/login';
import {authGuard} from './shared/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    component: Login
  },
  {
    path: '',
    component: LayoutHomeComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home').then(m => m.Home)
      },
      {
        path: 'survey',
        loadChildren: () => import('../app/features/survey/survey.routes').then(m => m.surveyRoutes)
      },
      {
        path: '404',
        loadComponent: () => import('./shared/components/not-found/not-found.component').then(m => m.NotFoundComponent)
      }, {
        path: '**',
        redirectTo: '/404'
      }
    ]
  }
];
