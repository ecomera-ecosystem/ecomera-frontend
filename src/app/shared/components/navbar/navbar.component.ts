import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '@app/core/services/cart.service';
import { AuthService } from '@app/core/services/auth.service';
import { AuthStateService } from '@app/core/services/auth-state.service';
import { CartItem } from '@app/core/models/cart.model';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnChanges {
  @Input() isLoggedIn: boolean = false;

  userName = '';
  cartItems: CartItem[] = [];
  cartTotal = 0;
  mobileMenuOpen = false;
  mobileSearchOpen = false;

  constructor(
    private router: Router,
    private cartService: CartService,
    private authService: AuthService,
    private authState: AuthStateService,
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isLoggedIn']) {
      if (this.isLoggedIn) {
        this.getMe();
        this.loadCart();
      } else {
        this.userName = '';
        this.cartItems = [];
        this.cartTotal = 0;
      }
    }
  }

  private getMe() {
    this.authService.getMe().subscribe({
      next: (user) => {
        this.userName = `${user.firstName}`;
      },
      error: () => {
        const token = this.authService.getToken();
        if (!token) return;
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const first = payload.firstName || '';
          const last = payload.lastName || '';
          this.userName = first && last ? `${first} ${last}` : first || last || payload.sub || '';
        } catch {
          this.userName = '';
        }
      },
    });
  }

  loadCart() {
    this.cartService.getCart().subscribe({
      next: (cart) => {
        this.cartItems = cart.items || [];
        this.cartTotal = cart.total || 0;
      },
    });
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  categories = [
    { name: "Men's Clothing", q: 'men' },
    { name: "Women's Clothing", q: 'women' },
    { name: 'Jewelry', q: 'jewelry' },
    { name: 'Electronics', q: 'electronics' },
  ];

  searchCategory(q: string) {
    this.router.navigate(['/search'], { queryParams: { q } });
  }

  showAll() {
    this.router.navigate(['/search']);
  }

  search(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.value.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: input.value.trim() } });
    }
  }

  logout() {
    this.authService.signout().subscribe();
    this.authState.logout();
    this.cartItems = [];
    this.cartTotal = 0;
    this.router.navigate(['/login']);
  }
}
