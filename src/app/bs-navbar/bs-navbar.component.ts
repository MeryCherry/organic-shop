import { ShoppingCart } from './../models/shopping-cart';
import { AppUser } from './../models/app-user';
import { AuthService } from '../services/authentication/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../services/shopping/shopping-cart.service';
import { Observable } from 'rxjs';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnInit  {

  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  constructor(private auth: AuthService, private router: Router, private shoppingCartService: ShoppingCartService) {
   }

   async ngOnInit(){
    // we don't need to unsubscribe here onDestroy, because
    // it's suppose to be just one instance of that component,
    // displayed in main template all time
    this.auth.appUser$.subscribe(user => { this.appUser = user;  } );

    this.cart$ = await this.shoppingCartService.getCart();
   }

      logout() {
        this.auth.logout();
        this.router.navigate(['/login']);
      }

}
