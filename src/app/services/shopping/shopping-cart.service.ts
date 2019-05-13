import { ShoppingCart } from './../../models/shopping-cart';
import { take, map } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }


  create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(){

    let cartId = await this.getOrCreateCartId();
    let cart = this.db.object('/shopping-carts/' + cartId).snapshotChanges().pipe(
    map((action: any) => {
    const key = action.key;
    const items = action.payload.val().items;
    return new ShoppingCart(key, items);
    }));
    return cart;
    }

  getItem( cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }
  private async getOrCreateCartId(): Promise<string> {
        // to have possibility for creating and storring products
    // in shopping cart for users that are not logged
    // we use local storage to store data from shopping cart
    // get id of shopping cart
    let cartId = localStorage.getItem('cartId');
    if (cartId) { return cartId; }

      // create cart in database and set its key in local storage
      // calling async method as sync method, with await
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;

  }

  async removeFromCart(product: Product) {
    this.updateProductQuantity(product, -1 , 0);
  }
  async addToCart(product: Product) {
    this.updateProductQuantity(product, 1 , 1);
  }

  // increase or decrease product quantity
  // product => product to be added/removed
  // change => number added to quantity of products
  // minNum=> if there is no products in cart, what quantity should be set
  private async updateProductQuantity(product: Product, change: number, minNum: number) {
        // calling async method as sync method, with await
        let cartId = await this.getOrCreateCartId();
        // getting observable for shopping cart items
        let item$ = this.getItem(cartId, product.key);
       // if there is already item with id in shopping cart
       // check property quantity, then update it
       // otherwise add this property and set value to 1
        item$.snapshotChanges()
         .pipe(take(1))
         .subscribe(i => {
           item$.update({
             product: product,
             quantity: ((i.payload.hasChild('quantity')) ? (i.payload.val()['quantity' ] || 0 ) + change : minNum)
           });
         });
  }

}
