import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { RegisterComponent } from './features/auth/pages/register/register.component';


export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
    title: 'Ecomera',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Log in',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Sign up',
  },
];
