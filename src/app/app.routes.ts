import { Routes } from '@angular/router';
import { NavbarComponent } from "@layout";
import {
  BucketComponent,
  CatalogComponent,
  LoginComponent,
  NewPasswordComponent,
  ProfileComponent, ResetComponent,
  SignUpComponent
} from "@pages";

export const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: '',
        redirectTo: '/catalog',
        pathMatch: 'full'
      },
      {
        path: 'catalog',
        component: CatalogComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'bucket',
        component: BucketComponent
      },
    ]
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'new-password',
        component: NewPasswordComponent,
      },
      {
        path: 'reset',
        component: ResetComponent,
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
      }
    ],
  },
];
