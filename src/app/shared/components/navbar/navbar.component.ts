import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatBadgeModule,
    MatDividerModule,
  ],
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
    // Add real logout logic here
    console.log('Logging out...');
  }
}
