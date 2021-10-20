import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
      let header = new HttpHeaders({ "Authorization": "Bearer "+localStorage.getItem('token'),"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers":"Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"});
    const requestOptions = {  headers: header};
        return this.http.post(this.apiUrl, orderInfo ,requestOptions);
    }

}