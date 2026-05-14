import { Component } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: false,
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
