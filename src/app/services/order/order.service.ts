import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping/shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getAll() {
    // we use snapshotchanges to map list and get also
    // key parameter otherwise we would use commented line
    const productRef = this.db.list('/orders', ref => ref.orderByChild('datePlaced'));
    return productRef.snapshotChanges().pipe(map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val()}));
    }));
   // return this.db.list('/orders').valueChanges();
  }

  getByUserID(userId: string) {
     const ordersRef = this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId));
     return ordersRef.snapshotChanges().pipe(map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val()}));
    }));
  }
}
