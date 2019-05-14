import { AuthService } from './../services/authentication/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../services/shopping/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription } from 'rxjs';
import { OrderService } from '../services/order/order.service';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping = {};
  cart: ShoppingCart;
  cartSubscription: Subscription;
  userSubscription: Subscription;
  userId: string;

  constructor(
     private authService: AuthService,
     private shoppingCartService: ShoppingCartService,
     private orderService: OrderService ) { }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription =  cart$.subscribe( cart => this.cart = cart);
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  placeOrder() {
    let order = {
      userId: this.userId,
      datePlaced : new Date().getTime(),
      shipping: this.shipping,
      items: this.cart.items.map( i => {
        return {
          product: {
            title: i.title,
            imageUrl: i.imageUrl,
            price: i.price
          },
          quantity: i.quantity,
          totalPrice: i.totalPrice
        };
      })
    };
    this.orderService.storeOrder(order);
  }
}
