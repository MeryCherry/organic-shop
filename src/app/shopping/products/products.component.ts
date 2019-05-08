import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../services/products/category.service';
import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/products/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent {

  products: Product[] = [];
  filteredProducts: Product[];
  categories$;
  category: string;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    categoryService: CategoryService) {

    productService.getAll().pipe(switchMap(
        (prod: Product[]) => {
            this.products = prod;
            return route.queryParamMap;
        })).subscribe(
          params => {
          // tslint:disable-next-line: prefer-const
            this.category = params.get('category');
            this.filteredProducts = (this.category) ?
            this.products.filter(p => p.category === this.category) :
            this.products;
          });

    this.categories$ = categoryService.getAll();
   }

}
