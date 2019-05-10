import { take } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

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

  getCart(cartId: string) {
    return this.db.object('/shopping-carts' + cartId);
  }

  getItem( cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }
  private async getOrCreateCartId() {
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
  async addToCart(product: Product) {
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
          quantity: ((i.payload.hasChild('quantity')) ? i.payload.val()['quantity' ] + 1 : 1)
        });
      });
  }

}
