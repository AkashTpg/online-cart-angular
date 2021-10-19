import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { User } from '@/_models';
import { config } from 'process';
import { Order } from '../product-order/order';

@Injectable({ providedIn: 'root' })
export class OrderService {
  apiUrl:string="http://localhost:9090/orders/"
    constructor(private http: HttpClient) { }
    order(orderInfo: Order) {
      //console.log("service called")
      //console.log(JSON.stringify(orderInfo));
        return this.http.post(this.apiUrl, orderInfo);
    }

}