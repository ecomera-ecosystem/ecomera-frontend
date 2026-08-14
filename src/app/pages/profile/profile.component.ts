import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '@app/core/services/order.service';
import { AuthService } from '@app/core/services/auth.service';
import { AuthStateService } from '@app/core/services/auth-state.service';
import { User } from '@app/core/models/auth.model';
import { Order } from '@app/core/models/order.model';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  orders: Order[] = [];
  loading = true;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private authState: AuthStateService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.authService.getMe().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: () => {
        this.authState.logout();
        this.router.navigate(['/login']);
      },
    });

    this.orderService.getAll().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }
}
