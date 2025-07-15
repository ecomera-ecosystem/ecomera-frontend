import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-hero-carousel',
  imports: [CarouselModule, RouterModule, CommonModule],
  templateUrl: './hero-carousel.component.html',
  styleUrl: './hero-carousel.component.css',
})
export class HeroCarouselComponent {
  customOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    dots: true,
    nav: true,
    navText: ['‹', '›'],
    items: 1,
    animateOut: 'fadeOut',
  };
}
