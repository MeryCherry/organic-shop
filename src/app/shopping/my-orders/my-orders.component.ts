import { Component, OnInit} from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  orders$;

  constructor(
    private authService: AuthService,
    private orderService: OrderService) {
  }

  ngOnInit() {
    this.orders$ = this.authService.user$.pipe(switchMap(u => this.orderService.getByUserID(u.uid)));
  }
}
