import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@app/core/services/product.service';
import { CategoryService } from '@app/core/services/category.service';
import { Product } from '@app/core/models/product.model';
import { Category } from '@app/core/models/category.model';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  totalResults = 0;
  loading = true;

  query = '';
  categoryId: string | null = null;
  minPrice: number | null = null;
  maxPrice: number | null = null;
  color: string | null = null;
  size: string | null = null;
  sort = 'newest';

  readonly colors = ['Black', 'Silver', 'Gold', 'Rose Gold', 'Brown', 'Beige', 'Red', 'Multicolor'];
  readonly sizes = ['XS', 'S', 'M', 'L', 'XL', '32'];
  readonly sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'rating_desc', label: 'Top Rated' },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit() {
    this.categoryService.getAllActive().subscribe({
      next: (cats) => (this.categories = cats),
      error: () => (this.categories = []),
    });

    this.route.queryParams.subscribe((params) => {
      this.query = params['q'] || '';
      this.categoryId = params['categoryId'] || null;
      this.minPrice = params['minPrice'] ? Number(params['minPrice']) : null;
      this.maxPrice = params['maxPrice'] ? Number(params['maxPrice']) : null;
      this.color = params['color'] || null;
      this.size = params['size'] || null;
      this.sort = params['sort'] || 'newest';
      this.loadProducts();
    });
  }

  loadProducts() {
    this.loading = true;
    this.productService
      .filter({
        q: this.query || undefined,
        categoryId: this.categoryId || undefined,
        minPrice: this.minPrice ?? undefined,
        maxPrice: this.maxPrice ?? undefined,
        color: this.color || undefined,
        size: this.size || undefined,
        sort: this.sort,
        page: 0,
        pageSize: 24,
      })
      .subscribe({
        next: (res) => {
          this.products = res.content || res;
          this.totalResults = res.totalElements ?? this.products.length;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.products = [];
          this.totalResults = 0;
        },
      });
  }

  private syncUrl(extra: Record<string, string | number | null> = {}) {
    const params: Record<string, string> = {};
    if (this.query) params['q'] = this.query;
    if (this.categoryId) params['categoryId'] = this.categoryId;
    if (this.minPrice != null) params['minPrice'] = String(this.minPrice);
    if (this.maxPrice != null) params['maxPrice'] = String(this.maxPrice);
    if (this.color) params['color'] = this.color;
    if (this.size) params['size'] = this.size;
    if (this.sort !== 'newest') params['sort'] = this.sort;
    for (const [key, value] of Object.entries(extra)) {
      if (value === null) delete params[key];
      else params[key] = String(value);
    }
    this.router.navigate([], { relativeTo: this.route, queryParams: params });
  }

  onKeywordSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.query = input.value.trim();
    this.syncUrl();
  }

  selectCategory(id: string | null) {
    this.categoryId = this.categoryId === id ? null : id;
    this.syncUrl({ categoryId: this.categoryId });
  }

  applyPriceRange() {
    if (this.minPrice != null && this.maxPrice != null && this.minPrice > this.maxPrice) {
      const tmp = this.minPrice;
      this.minPrice = this.maxPrice;
      this.maxPrice = tmp;
    }
    this.syncUrl({
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
    });
  }

  clearPriceRange() {
    this.minPrice = null;
    this.maxPrice = null;
    this.syncUrl({ minPrice: null, maxPrice: null });
  }

  toggleColor(c: string) {
    this.color = this.color === c ? null : c;
    this.syncUrl({ color: this.color });
  }

  toggleSize(s: string) {
    this.size = this.size === s ? null : s;
    this.syncUrl({ size: this.size });
  }

  setSort(value: string) {
    this.sort = value;
    this.syncUrl();
  }

  get hasActiveFilters(): boolean {
    return !!(this.query || this.categoryId || this.minPrice != null || this.maxPrice != null || this.color || this.size);
  }

  clearAllFilters() {
    this.router.navigate(['/search']);
  }

  get categoryName(): string | null {
    return this.categories.find((c) => c.id === this.categoryId)?.name || null;
  }
}
