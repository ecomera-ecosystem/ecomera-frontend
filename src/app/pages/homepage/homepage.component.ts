import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { HeroCarouselComponent } from '../../shared/components/hero-carousel/hero-carousel.component';

@Component({
  selector: 'app-homepage',
  imports: [HeroCarouselComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {
  constructor(private authService: AuthService, private router: Router) {
 
  }
  logout() {
    this.authService.signout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
    });
  }
}
