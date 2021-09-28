import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderHistoryService } from '../_services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orderHistoryList;

  constructor(private _router: Router, private _orderHistoryService: OrderHistoryService) { }

  ngOnInit(): void {
    if (localStorage.hasOwnProperty('token')) {
      this._orderHistoryService.getOrderHistory().subscribe(
        data => {
          this.orderHistoryList = data;
          console.log('Success: ', this.orderHistoryList);
        },
        error => console.error('Error: ', error)
      )
    } else {
      alert("User not logged in. Please login first!!!")
      this._router.navigate(['/','login']);
    }
  }
}
