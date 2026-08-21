import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@app/core/services/product.service';
import { CartService } from '@app/core/services/cart.service';
import { Product } from '@app/core/models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  relatedProducts: Product[] = [];
  selectedImage: string = '';
  quantity = 1;
  loading = true;
  addedToCart = false;
  readonly Math = Math;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private productService: ProductService,
    private cartService: CartService,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/']);
      return;
    }
    this.productService.getById(id).subscribe({
      next: (product) => {
        this.product = product;
        this.selectedImage = this.getPrimaryImage(product);
        this.loading = false;
        this.loadRelatedProducts(product);
      },
      error: () => {
        this.loading = false;
        this.router.navigate(['/not-found']);
      },
    });
  }

  private loadRelatedProducts(product: Product) {
    if (!product.categoryId) return;
    this.productService
      .filter({ categoryId: product.categoryId, sort: 'rating_desc', page: 0, pageSize: 8 })
      .subscribe({
        next: (res) => {
          const items: Product[] = res.content || res || [];
          this.relatedProducts = items.filter((p) => p.id !== product.id).slice(0, 4);
        },
        error: () => (this.relatedProducts = []),
      });
  }

  getPrimaryImage(product: Product): string {
    return product.images?.find((i) => i.isPrimary)?.imageUrl
      || product.images?.[0]?.imageUrl
      || '';
  }

  selectImage(url: string) {
    this.selectedImage = url;
  }

  addToCart() {
    if (!this.product) return;
    this.cartService.addItem({ productId: this.product.id, quantity: this.quantity }).subscribe({
      next: () => {
        this.addedToCart = true;
        setTimeout(() => (this.addedToCart = false), 2000);
      },
    });
  }
}
