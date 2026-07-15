import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroCarouselComponent } from './components/hero-carousel/hero-carousel.component';
import { ProductCardComponent } from './components/product-card/product-card.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    HeroCarouselComponent,
    ProductCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatBadgeModule,
    MatDividerModule,
    MatCardModule,
    MatProgressSpinnerModule,
    CarouselModule,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    HeroCarouselComponent,
    ProductCardComponent,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
})
export class SharedModule {}
