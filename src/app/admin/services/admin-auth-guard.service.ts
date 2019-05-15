import { UserService } from 'shared/services/user.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService, private router: Router) { }

  canActivate(): Observable<boolean> {
    // getting app user from authentication service
    return this.auth.appUser$.pipe(
        // mapping the result, so user object to boolean
        map((appUser: any) => appUser.isAdmin)
      );
  }

}
