import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-carousel',
  standalone: false,
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
