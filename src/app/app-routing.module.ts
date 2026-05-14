import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from '@app/pages/homepage/homepage.component';
import { LoginComponent } from '@app/pages/auth/login/login.component';
import { RegisterComponent } from '@app/pages/auth/register/register.component';
import { NotFoundComponent } from '@app/pages/not-found/not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home', title: 'Ecomera' },
  { path: 'home', component: HomepageComponent, title: 'Welcome to Ecomera' },
  { path: 'login', component: LoginComponent, title: 'Log in' },
  { path: 'register', component: RegisterComponent, title: 'Sign up' },
  { path: '**', component: NotFoundComponent, title: 'Page Not Found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
