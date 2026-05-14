import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomepageComponent } from './homepage.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    HomepageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
})
export class HomepageModule {}
