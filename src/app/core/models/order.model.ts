export interface OrderItem {
  productId: string;
  productTitle: string;
  productImage: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: string;
  shippingAddress: ShippingAddress;
  createdAt: string;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface CreateOrderRequest {
  items: { productId: string; quantity: number }[];
  shippingAddress: ShippingAddress;
}
