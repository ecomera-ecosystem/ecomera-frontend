import { Component, OnInit } from '@angular/core';
import { OrderService } from '@app/core/services/order.service';
import { AuthService } from '@app/core/services/auth.service';
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
  ) {}

  ngOnInit() {
    // Decode user from token if available
    const token = this.authService.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.user = {
          id: payload.sub || payload.userId,
          email: payload.sub,
          firstname: payload.firstname || '',
          lastname: payload.lastname || '',
          role: payload.role,
        };
      } catch {}
    }

    this.orderService.getAll().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }
}
