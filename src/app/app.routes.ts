import { Routes } from '@angular/router';
import { NavbarComponent } from "@layout";
import {
  BucketComponent,
  CatalogComponent,
  LoginComponent,
  ProfileComponent,
  SignUpComponent
} from "@pages";
import { ProductCardComponent } from "./pages/product-card/product-card.component";
import { ViewUsersComponent } from "./pages/view-users/view-users.component";
import { ViewGoodComponent } from "./pages/view-good/view-good.component";

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
        path: 'product/:id',
        component: ProductCardComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'bucket',
        component: BucketComponent
      },
      {
        path: 'view-users',
        component: ViewUsersComponent,
      },
      {
        path: 'view-good',
        component: ViewGoodComponent,
      }
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
        path: 'sign-up',
        component: SignUpComponent,
      }
    ],
  },
];
