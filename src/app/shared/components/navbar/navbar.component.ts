import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Input() isLoggedIn: boolean = false;
  @Input() cartItemCount: number = 0;

  categories = [
    { name: "Men's Clothing", path: '/products/men' },
    { name: "Women's Clothing", path: '/products/women' },
    { name: '💍 Jewelery', path: '/products/jewelry' },
    { name: 'Electronics', path: '/products/electronics' },
    { name: 'See All', path: '/products' },
  ];

  logout() {
    console.log('Logging out...');
  }
}
