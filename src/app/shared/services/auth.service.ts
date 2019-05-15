import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from 'shared/models/app-user';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute) {
  // get current state of user, if is looged in or not
   this.user$ =  afAuth.authState;
  }

  login() {
    // getting query params from url, if user got to login page
    // from some other page, then to redirect him/her to this page after loggin
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    // storing got query param in local storage
    localStorage.setItem('returnUrl', returnUrl);
    // to redirect to one of auth providers, like google/facebook etc
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    // switchMap, makes mapping, but it also switches
    // to new observable( inner) and forget about outer
    // mapping from first observable to second
    return this.user$.pipe(switchMap(
      user => {
        if (user) {
          return this.userService.get(user.uid);
        }
        return of(null);
      }
      ));
  }
}
