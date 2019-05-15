import { AdminModule } from './admin/admin.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { CustomFormsModule } from 'ng2-validation';
import { AuthGuardService as AuthGuard } from 'shared/services/auth-guard.service';

import { environment } from '../environments/environment';
import { AdminAuthGuardService as AdminAuthGuard } from './admin/services/admin-auth-guard.service';
import { AdminOrdersComponent } from './admin/components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/components/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/components/product-form/product-form.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MatComponentsModule } from './mat-components/mat-components.module';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ShippingFormComponent } from './shopping-form/shipping-form.component';
import { MyOrdersComponent } from './shopping/my-orders/my-orders.component';
import { ProductsComponent } from './shopping/products/products.component';
import { ShoppingCartComponent } from './shopping/shopping-cart/shopping-cart.component';
import { SharedModule } from 'shared/shared.module';
import { OrdersComponent } from './shopping/orders/orders.component';
import { ProductFilterComponent } from './shopping/products/product-filter/product-filter.component';
import { ShoppingCartSummaryComponent } from './shopping/shopping-cart-summary/shopping-cart-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    LoginComponent,
    ShippingFormComponent,
    OrdersComponent,
    ProductsComponent,
    ShoppingCartComponent,
    MyOrdersComponent,
    ProductFilterComponent,
    ShoppingCartSummaryComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AdminModule,
    FormsModule,
    CustomFormsModule,
    CommonModule,
    AppRoutingModule,
    MatComponentsModule,
    AngularFireModule.initializeApp(environment.firebase),
   // AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent},

      {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard]},
      {path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard]},
      {path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard]},

      {
        path: 'admin/product/new',
        component: ProductFormComponent,
         canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/product/:id',
        component: ProductFormComponent,
         canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/product',
        component: AdminProductsComponent,
         canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/orders',
        component: AdminOrdersComponent,
         canActivate: [AuthGuard, AdminAuthGuard]
      },
      { path: '', component: ProductsComponent },
      { path: '**', component: ProductsComponent }
    ])
  ],
  providers: [
    AdminAuthGuard,
    AngularFireDatabase
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
