export type PaymentMethod = 'CREDIT_CARD' | 'PAYPAL' | 'BANK_TRANSFER';

export type PaymentStatus = 'PENDING' | 'SUCCEEDED' | 'FAILED' | 'REFUNDED' | 'PARTIALLY_REFUNDED';

export interface Payment {
  id: string;
  orderId: string;
  userId: string;
  email: string;
  stripePaymentIntentId: string;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaymentRequest {
  orderId: string;
  paymentMethod: PaymentMethod;
}
