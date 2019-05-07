import { ProductService } from './../../product.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.sass']
})
export class AdminProductsComponent implements OnDestroy {

  // inline type, each product has property 
  // title of type string
  // products: { title: string}[];
  products: Product[];
  filteredProducts: Product[];
  subscription: Subscription;

  constructor(private productsService: ProductService) {
   this.subscription = productsService.getAll().subscribe(
      (prod: Product[]) =>  this.filteredProducts = this.products = prod
    );
   }

   // filtering method, it filters by title, filtering is done on client
   filter(query: string) {
      this.filteredProducts = (query) ? this.products.filter
      (p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
   }

   ngOnDestroy() {
    this.subscription.unsubscribe();
   }
}
