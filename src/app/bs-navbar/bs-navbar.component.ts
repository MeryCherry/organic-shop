import { ShoppingCart } from 'shared/models/shopping-cart';
import { AppUser } from 'shared/models/app-user';
import { AuthService } from 'shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

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

   async ngOnInit() {
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
