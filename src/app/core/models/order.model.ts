export interface OrderItem {
  id: string;
  productId: string;
  productTitle: string;
  unitPrice: number;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  status: string;
  totalPrice: number;
  createdAt: string;
  orderItems: OrderItem[];
}
