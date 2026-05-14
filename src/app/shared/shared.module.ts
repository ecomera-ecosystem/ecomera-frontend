import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroCarouselComponent } from './components/hero-carousel/hero-carousel.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    HeroCarouselComponent,
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
    CarouselModule,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    HeroCarouselComponent,
  ],
})
export class SharedModule {}
