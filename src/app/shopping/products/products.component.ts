import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/products/product.service';
import { Product } from 'src/app/models/product';
import { ShoppingCartService } from 'src/app/services/shopping/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  filteredProducts: Product[];
  cart: any;
  category: string;
  subscription: Subscription;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private shoppingCartService: ShoppingCartService) {
      productService.getAll().pipe(switchMap(
        (prod: Product[]) => {
            this.products = prod;
            return route.queryParamMap;
        })).subscribe(
          params => {

            this.category = params.get('category');
            this.filteredProducts = (this.category) ?
            this.products.filter(p => p.category === this.category) :
            this.products;
          });
   }

   async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart())
   .subscribe(cart => this.cart = cart );
   }

   ngOnDestroy() {
     this.subscription.unsubscribe();
   }

}
