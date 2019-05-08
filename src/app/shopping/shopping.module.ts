import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    OrdersComponent,
    ProductsComponent,
    ShoppingCartComponent,
    MyOrdersComponent
  ],
  imports: [
    BrowserModule,
    RouterModule
  ],
  exports: [
    OrdersComponent,
    ProductsComponent,
    ShoppingCartComponent,
    MyOrdersComponent
  ],
  providers: []
})
export class ShoppingModule { }
