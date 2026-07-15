import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '@app/core/models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(private router: Router) {}

  get primaryImage(): string {
    return this.product.images?.find(i => i.isPrimary)?.imageUrl || this.product.images?.[0]?.imageUrl || '';
  }

  navigateToDetail() {
    this.router.navigate(['/products', this.product.id]);
  }
}
