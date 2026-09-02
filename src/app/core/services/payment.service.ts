import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment, CreatePaymentRequest, PaymentMethod } from '@app/core/models/payment.model';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private apiUrl = `${environment.apiUrl}/payments`;
  private STRIPE_SIGNATURE = 'mock_signature_for_dev';

  constructor(private http: HttpClient) {}

  create(request: CreatePaymentRequest): Observable<Payment> {
    return this.http.post<Payment>(this.apiUrl, request);
  }

  getByOrder(orderId: string): Observable<Payment> {
    return this.http.get<Payment>(`${this.apiUrl}/order/${orderId}`);
  }

  getById(id: string): Observable<Payment> {
    return this.http.get<Payment>(`${this.apiUrl}/${id}`);
  }

  simulateSuccess(paymentIntentId: string): Observable<void> {
    const headers = new HttpHeaders({ 'Stripe-Signature': this.STRIPE_SIGNATURE });
    return this.http.post<void>(
      `${this.apiUrl}/webhook`,
      { type: 'payment_intent.succeeded', payment_intent_id: paymentIntentId },
      { headers },
    );
  }

  simulateFailure(paymentIntentId: string): Observable<void> {
    const headers = new HttpHeaders({ 'Stripe-Signature': this.STRIPE_SIGNATURE });
    return this.http.post<void>(
      `${this.apiUrl}/webhook`,
      { type: 'payment_intent.payment_failed', payment_intent_id: paymentIntentId },
      { headers },
    );
  }
}
