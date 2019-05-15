import { Component, OnInit} from '@angular/core';
import { OrderService } from 'shared/services/order.service';

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
