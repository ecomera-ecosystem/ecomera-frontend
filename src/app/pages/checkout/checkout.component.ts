import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  checkoutForm: FormGroup;
  loading = true;
  placing = false;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.checkoutForm = this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

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
    if (this.checkoutForm.invalid || !this.cart) return;
    this.placing = true;

    this.orderService.create({
      items: this.cart.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      shippingAddress: this.checkoutForm.value,
    }).subscribe({
      next: (order) => {
        this.placing = false;
        this.router.navigate(['/profile', order.id]);
      },
      error: () => {
        this.placing = false;
      },
    });
  }
}
