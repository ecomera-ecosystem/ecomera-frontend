import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthStateService } from '@app/core/services/auth-state.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Ecomera';
  isAuthPage = false;
  isLoggedIn = false;

  private authRoutes = ['/login', '/register'];

  constructor(
    private router: Router,
    private authState: AuthStateService,
  ) {}

  ngOnInit(): void {
    this.authState.isLoggedIn$.subscribe(value => this.isLoggedIn = value);

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        this.isAuthPage = this.authRoutes.includes(e.urlAfterRedirects);
      });
  }
}
