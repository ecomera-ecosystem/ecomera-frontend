import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomepageComponent } from './pages/homepage/homepage.component';


export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
    title: 'Ecomera',
  },
  {
    path: 'home',
    component: HomepageComponent,
    title: 'Welcome to Ecomera ',
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
