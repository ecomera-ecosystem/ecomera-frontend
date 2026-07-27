import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';
import { AuthModule } from '@app/pages/auth/auth.module';
import { HomepageModule } from '@app/pages/homepage/homepage.module';
import { ProductDetailModule } from '@app/pages/product-detail/product-detail.module';
import { CartModule } from '@app/pages/cart/cart.module';
import { CheckoutModule } from '@app/pages/checkout/checkout.module';
import { SearchModule } from '@app/pages/search/search.module';
import { ProfileModule } from '@app/pages/profile/profile.module';
import { NotFoundComponent } from '@app/pages/not-found/not-found.component';
import { AuthInterceptor } from '@app/core/interceptor/auth.interceptor';

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    AuthModule,
    HomepageModule,
    ProductDetailModule,
    CartModule,
    CheckoutModule,
    SearchModule,
    ProfileModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
