import { ProductService } from './services/products/product.service';
import { AdminAuthGuardService as AdminAuthGuard } from './admin-auth-guard.service';
import { UserService } from './services/authentication/user.service';
import { AuthGuardService as AuthGuard } from './services/authentication/auth-guard.service';
import { AuthService } from './services/authentication/auth.service';
import { MyOrdersComponent } from './shopping/my-orders/my-orders.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { ShoppingModule } from './shopping/shopping.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { ProductsComponent } from './shopping/products/products.component';
import { ShoppingCartComponent } from './shopping/shopping-cart/shopping-cart.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './services/products/category.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatComponentsModule } from './mat-components/mat-components.module';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    CommonModule,
    AppRoutingModule,
    ShoppingModule,
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
      {path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuard]},

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
      { path: '', component: HomeComponent },
      { path: '**', component: HomeComponent }
    ])
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    UserService,
    CategoryService,
    AngularFireDatabase,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
