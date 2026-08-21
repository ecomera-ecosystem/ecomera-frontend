import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';

import { SharedModule } from '@app/shared/shared.module';
import { ProductDetailComponent } from './product-detail.component';

@NgModule({
  declarations: [ProductDetailComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    SharedModule,
  ],
})
export class ProductDetailModule {}
