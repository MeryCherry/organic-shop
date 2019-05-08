import { ProductService } from '../../services/products/product.service';
import { Component, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnDestroy, OnInit {

  // sorting element for columns
  @ViewChild(MatSort) sort: MatSort;
  // pagination element for columns
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // inline type, each product has property
  // title of type string
  // products: { title: string}[];
  products: Product[];
  subscription: Subscription;
  // this is column names definition for angular material
  // data table
  displayedColumns: string[] = ['title', 'price', 'edit'];
  dataSource: MatTableDataSource<Product>;
  itemCount;

  constructor(private productsService: ProductService) {}

   // filtering method, it filters by title, filtering is done on client
   filter(query: string) {
      // this.dataSource.filter = query.trim().toLowerCase();
      let filteredProducts = (query) ? this.products.filter
       (p => p.title.toLowerCase().includes(query.toLowerCase())) :
       this.products;
      this.initizalizeTable(filteredProducts);
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
   }

   private initizalizeTable(products: Product[]) {
        // binding sorting and paginating for data in table
        this.dataSource = new MatTableDataSource(products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.itemCount = this.dataSource.data.length;
   }
   ngOnInit() {
    this.subscription = this.productsService.getAll().subscribe(
      (prod: Product[]) => {
        this.products = prod;
        this.initizalizeTable(prod);
      });
   }
   ngOnDestroy() {
    this.subscription.unsubscribe();
   }

}
