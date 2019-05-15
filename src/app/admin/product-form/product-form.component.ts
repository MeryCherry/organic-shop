import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

import { ProductService } from 'shared/services/product.service';
import { CategoryService } from 'shared/services/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.sass']
})
export class ProductFormComponent {

  categories$;
  product ={};
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id).pipe(take(1)).subscribe(
        p => this.product = p
      );
    }
   }

   save( product) {
    this.router.navigate(['/admin/product']);

    if (this.id) {
      this.productService.update(this.id, product);
     } else {
      this.productService.create(product);
     }
   }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) {return; }
    this.productService.delete(this.id);
    this.router.navigate(['/admin/product']);

  }

}
