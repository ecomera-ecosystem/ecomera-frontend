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
  categories: { id: string; name: string; image: string }[] = [];
  loading = true;

  private categoryImageMap: Record<string, string> = {
    electronics: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&h=400&fit=crop',
    clothing: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop',
    fashion: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
    jewelry: 'https://images.unsplash.com/photo-1515562141589-67f0d931e5e0?w=600&h=400&fit=crop',
    'home & garden': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
    sports: 'https://images.unsplash.com/photo-1461896836934-bd45ba8d0f32?w=600&h=400&fit=crop',
    beauty: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop',
    books: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=400&fit=crop',
    toys: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=600&h=400&fit=crop',
    shoes: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop',
    bags: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=400&fit=crop',
    watches: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=400&fit=crop',
    food: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop',
    automotive: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop',
  };

  private fallbackImage = 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAll(0, 8).subscribe({
      next: (res) => {
        this.products = res.content || res;
        this.extractCategories();
        this.loading = false;
      },
      error: (err) => {
        console.error(err)
        this.loading = false;
      },
    });
  }

  getCategoryImage(name: string): string {
    const key = name.toLowerCase();
    for (const [cat, url] of Object.entries(this.categoryImageMap)) {
      if (key.includes(cat) || cat.includes(key)) return url;
    }
    return this.fallbackImage;
  }

  private extractCategories() {
    const seen = new Set<string>();
    this.categories = [];
    for (const p of this.products) {
      if (p.categoryId && p.categoryName && !seen.has(p.categoryId)) {
        seen.add(p.categoryId);
        this.categories.push({
          id: p.categoryId,
          name: p.categoryName,
          image: this.getCategoryImage(p.categoryName),
        });
      }
    }
  }
}
