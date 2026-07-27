import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '@app/core/services/cart.service';
import { Cart, CartItem } from '@app/core/models/cart.model';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  cart: Cart | null = null;
  loading = true;

  constructor(
    private cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.loading = true;
    this.cartService.getCart().subscribe({
      next: (cart) => {
        this.cart = cart;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  updateQuantity(item: CartItem, event: Event) {
    const input = event.target as HTMLInputElement;
    const qty = parseInt(input.value, 10);
    if (qty < 1) return;
    this.cartService.updateQuantity(item.id, qty).subscribe({
      next: (cart) => (this.cart = cart),
    });
  }

  removeItem(itemId: string) {
    this.cartService.removeItem(itemId).subscribe({
      next: (cart) => (this.cart = cart),
    });
  }

  clearCart() {
    this.cartService.clearCart().subscribe({
      next: () => {
        this.cart = { id: '', userId: '', items: [], total: 0 };
      },
    });
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }
}
