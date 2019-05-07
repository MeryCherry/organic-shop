import { UserService } from './services/authentication/user.service';
import { AuthService } from './services/authentication/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private userService: UserService, private auth: AuthService, private router: Router) {
    auth.user$.subscribe(user => {
      if (user) {
        userService.save(user);
        let returnUrl = localStorage.getItem('returnUrl');
        if (!returnUrl) { router.navigateByUrl(returnUrl); } else { router.navigateByUrl(''); }
      }
      router.navigateByUrl('/login');
    });
  }
}
