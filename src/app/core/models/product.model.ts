export interface ProductImage {
  id: string;
  imageUrl: string;
  altText: string;
  isPrimary: boolean;
  displayOrder: number;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  images: ProductImage[];
  categoryId: string;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
}
