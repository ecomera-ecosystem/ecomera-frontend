import { Component, OnInit } from '@angular/core';
import { ProductService } from '@app/core/services/product.service';
import { Product } from '@app/core/models/product.model';

@Component({
  selector: 'app-homepage',
  standalone: false,
  templateUrl: './homepage.component.html',
})
export class HomepageComponent implements OnInit {
  products: Product[] = [];
  loading = true;

  constructor(private productService: ProductService) {}

  ngOnInit() {
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
