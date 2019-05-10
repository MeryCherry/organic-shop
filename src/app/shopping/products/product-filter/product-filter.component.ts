import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'src/app/services/products/category.service';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('category') category;
  categories$;

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getAll();
  }

  ngOnInit() {
  }

}
