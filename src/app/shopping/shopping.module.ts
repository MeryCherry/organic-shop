import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductQuantityComponent } from '../product-quantity/product-quantity.component';

@NgModule({
  declarations: [
    OrdersComponent,
    ProductsComponent,
    ShoppingCartComponent,
    MyOrdersComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    OrdersComponent,
    ProductsComponent,
    ShoppingCartComponent,
    MyOrdersComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent
  ],
  providers: []
})
export class ShoppingModule { }
