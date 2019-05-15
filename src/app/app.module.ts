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
import { SharedModule } from 'shared/shared.module';

import { environment } from '../environments/environment';
import { AdminModule } from './admin/admin.module';
import { AdminAuthGuardService as AdminAuthGuard } from './admin/services/admin-auth-guard.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './core/components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './core/components/home/home.component';
import { LoginComponent } from './core/components/login/login.component';
import { MatComponentsModule } from './mat-components/mat-components.module';
import { ProductsComponent } from './shopping/components/products/products.component';
import { OrdersComponent } from './shopping/orders/orders.component';
import { ShoppingModule } from './shopping/shopping.module';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    LoginComponent,
    OrdersComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
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
