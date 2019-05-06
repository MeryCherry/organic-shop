import { ProductService } from './../../product.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.sass']
})
export class AdminProductsComponent {

  products$;

  constructor(private productsService: ProductService) {
    this.products$ = productsService.getAll();
   }
}
