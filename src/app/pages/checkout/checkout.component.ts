import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '@app/core/services/cart.service';
import { OrderService } from '@app/core/services/order.service';
import { Cart } from '@app/core/models/cart.model';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent implements OnInit {
  cart: Cart | null = null;
  loading = true;
  placing = false;
  error = '';

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.cartService.getCart().subscribe({
      next: (cart) => {
        this.cart = cart;
        this.loading = false;
        if (!cart || cart.items.length === 0) {
          this.router.navigate(['/cart']);
        }
      },
      error: () => {
        this.loading = false;
        this.router.navigate(['/cart']);
      },
    });
  }

  placeOrder() {
    if (!this.cart || this.placing) return;
    this.placing = true;
    this.error = '';

    this.orderService.checkout().subscribe({
      next: () => {
        this.placing = false;
        this.router.navigate(['/profile'], { queryParams: { orderPlaced: 'true' } });
      },
      error: (err) => {
        this.placing = false;
        this.error = err?.error?.message || 'Failed to place order. Please try again.';
      },
    });
  }
}
