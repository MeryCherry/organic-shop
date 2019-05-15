import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatComponentsModule } from 'app/mat-components/mat-components.module';
import { AuthGuardService as AuthGuard } from 'shared/services/auth-guard.service';
import { SharedModule } from 'shared/shared.module';

import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGuardService as AdminAuthGuard } from './services/admin-auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MatComponentsModule,
    RouterModule.forChild([
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
      }
    ])
  ],
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent
  ],
  providers: [
    AdminAuthGuard
  ],
})
export class AdminModule { }
