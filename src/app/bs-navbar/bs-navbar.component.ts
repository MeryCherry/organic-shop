import { AppUser } from './../models/app-user';
import { AuthService } from '../services/authentication/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnInit  {

  appUser: AppUser;

  constructor(private auth: AuthService) {
   }

   ngOnInit(){
    // we don't need to unsubscribe here onDestroy, because
    // it's suppose to be just one instance of that component,
    // displayed in main template all time
    this.auth.appUser$.subscribe(user => { this.appUser = user;  } );
   }

      logout() {
        this.auth.logout();
      }

}
