import { Component, OnInit } from '@angular/core';
import { ProductService } from '@app/core/services/product.service';
import { CategoryService } from '@app/core/services/category.service';
import { Product } from '@app/core/models/product.model';
import { Category } from '@app/core/models/category.model';

@Component({
  selector: 'app-homepage',
  standalone: false,
  templateUrl: './homepage.component.html',
})
export class HomepageComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  loading = true;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit() {
    this.categoryService.getAllActive().subscribe({
      next: (cats) => {
        this.categories = cats;
      },
      error: (err) =>{
        console.error('Error fetching categories:', err);
      }
    });

    this.productService.getAll(0, 8).subscribe({
      next: (res) => {
        this.products = res.content || res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
