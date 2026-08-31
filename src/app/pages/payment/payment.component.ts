import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '@app/core/services/payment.service';
import { OrderService } from '@app/core/services/order.service';
import { Order } from '@app/core/models/order.model';
import { PaymentMethod } from '@app/core/models/payment.model';

@Component({
  selector: 'app-payment',
  standalone: false,
  templateUrl: './payment.component.html',
})
export class PaymentComponent implements OnInit {
  order: Order | null = null;
  loading = true;
  processing = false;
  error = '';

  method: PaymentMethod = 'CREDIT_CARD';
  methods: { value: PaymentMethod; label: string; icon: string }[] = [
    { value: 'CREDIT_CARD', label: 'Card', icon: 'credit_card' },
    { value: 'PAYPAL', label: 'PayPal', icon: 'account_balance_wallet' },
    { value: 'BANK_TRANSFER', label: 'Bank', icon: 'account_balance' },
  ];

  card = { number: '', expiry: '', cvc: '' };

  private orderId = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService,
    private orderService: OrderService,
  ) {}

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('orderId') || '';
    if (!this.orderId) {
      this.router.navigate(['/']);
      return;
    }
    this.orderService.getById(this.orderId).subscribe({
      next: (order) => {
        this.order = order;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.router.navigate(['/profile']);
      },
    });
  }

  selectMethod(m: PaymentMethod) {
    this.method = m;
    this.error = '';
  }

  onNumber(event: Event) {
    const input = event.target as HTMLInputElement;
    this.card.number = input.value
      .replace(/\D/g, '')
      .slice(0, 16)
      .replace(/(.{4})/g, '$1 ')
      .trim();
    input.value = this.card.number;
  }

  onExpiry(event: Event) {
    const input = event.target as HTMLInputElement;
    const digits = input.value.replace(/\D/g, '').slice(0, 4);
    this.card.expiry = digits.length > 2 ? `${digits.slice(0, 2)} / ${digits.slice(2)}` : digits;
    input.value = this.card.expiry;
  }

  onCvc(event: Event) {
    const input = event.target as HTMLInputElement;
    this.card.cvc = input.value.replace(/\D/g, '').slice(0, 4);
    input.value = this.card.cvc;
  }

  private validate() {
    if (this.method === 'CREDIT_CARD') {
      return this.card.number.replace(/\s/g, '').length === 16
        && this.card.expiry.replace(/\D/g, '').length >= 4
        && this.card.cvc.length >= 3;
    }
    return true;
  }

  pay() {
    if (!this.order || this.processing) return;
    if (!this.validate()) {
      this.error = 'Please enter a valid card. Any 16-digit card with a valid expiry and CVC works for this demo.';
      return;
    }
    this.processing = true;
    this.error = '';

    this.paymentService.create({ orderId: this.order.id, paymentMethod: this.method }).subscribe({
      next: (payment) => this.simulatePayment(payment),
      error: (err) => {
        this.processing = false;
        this.error = err?.error?.message || 'Unable to initiate payment. Please try again.';
      },
    });
  }

  private simulatePayment(payment: { stripePaymentIntentId: string; status: string }) {
    if (payment.status === 'SUCCEEDED') {
      this.finish();
      return;
    }
    this.paymentService.simulateSuccess(payment.stripePaymentIntentId).subscribe({
      next: () => this.finish(),
      error: (err) => {
        this.processing = false;
        this.error = err?.error?.message || 'Payment failed. Please try again.';
      },
    });
  }

  private finish() {
    this.processing = false;
    this.router.navigate(['/profile'], { queryParams: { orderPlaced: 'true' } });
  }
}
