import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  _loginUrl = 'http://localhost:9090/order/getOrders';

  constructor(private _http: HttpClient) { }

  getOrderHistory() {
  
    let header = new HttpHeaders({ "Authorization": "Bearer "+localStorage.getItem('token'),"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers":"Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"});
    const requestOptions = {  headers: header};      
    //user will be authneticated here
   return  this._http.get<any>(this._loginUrl, requestOptions);
  }
}
