import { Component, OnInit} from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.sass']
})
export class OrdersComponent implements OnInit {

  orders$;

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.orders$ = this.orderService.getAll();
  }
}
