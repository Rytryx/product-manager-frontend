import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductModifyComponent } from './product-modify/product-modify.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductModifyComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProductModule { }
