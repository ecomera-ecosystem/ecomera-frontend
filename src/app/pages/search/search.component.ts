import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@app/core/services/product.service';
import { Product } from '@app/core/models/product.model';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  products: Product[] = [];
  query = '';
  categoryId: string | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.query = params['q'] || '';
      this.categoryId = params['categoryId'] || null;
      this.loadProducts();
    });
  }

  loadProducts() {
    this.loading = true;
    if (this.query) {
      this.productService.search(this.query).subscribe({
        next: (res) => {
          this.products = res.content || res;
          this.loading = false;
        },
        error: () => (this.loading = false),
      });
    } else if (this.categoryId) {
      this.productService.getByCategory(this.categoryId).subscribe({
        next: (res) => {
          this.products = res.content || res;
          this.loading = false;
        },
        error: () => (this.loading = false),
      });
    } else {
      this.productService.getAll(0, 50).subscribe({
        next: (res) => {
          this.products = res.content || res;
          this.loading = false;
        },
        error: () => (this.loading = false),
      });
    }
  }

  search(event: Event) {
    const input = event.target as HTMLInputElement;
    this.router.navigate(['/search'], { queryParams: { q: input.value } });
  }
}
