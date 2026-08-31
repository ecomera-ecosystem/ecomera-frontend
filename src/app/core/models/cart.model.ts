export interface CartItem {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  unitPrice: number;
  quantity: number;
  availableStock: number;
  subtotal: number;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
}
