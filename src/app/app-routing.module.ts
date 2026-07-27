import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from '@app/pages/homepage/homepage.component';
import { LoginComponent } from '@app/pages/auth/login/login.component';
import { RegisterComponent } from '@app/pages/auth/register/register.component';
import { NotFoundComponent } from '@app/pages/not-found/not-found.component';
import { ProductDetailComponent } from '@app/pages/product-detail/product-detail.component';
import { CartComponent } from '@app/pages/cart/cart.component';
import { CheckoutComponent } from '@app/pages/checkout/checkout.component';
import { SearchComponent } from '@app/pages/search/search.component';
import { ProfileComponent } from '@app/pages/profile/profile.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home', title: 'Ecomera' },
  { path: 'home', component: HomepageComponent, title: 'Welcome to Ecomera' },
  { path: 'products/:id', component: ProductDetailComponent, title: 'Product Details' },
  { path: 'cart', component: CartComponent, title: 'Shopping Cart' },
  { path: 'checkout', component: CheckoutComponent, title: 'Checkout' },
  { path: 'search', component: SearchComponent, title: 'Search Products' },
  { path: 'profile', component: ProfileComponent, title: 'My Account' },
  { path: 'login', component: LoginComponent, title: 'Log in' },
  { path: 'register', component: RegisterComponent, title: 'Sign up' },
  { path: '**', component: NotFoundComponent, title: 'Page Not Found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
