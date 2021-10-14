import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../_models/Product';
import { CartService } from '../_services/cart.service';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {
    public products : any = [];
    public grandTotal !: number;
    userLoggedIn:boolean=false;
    constructor(private cartService : CartService,private _router: Router) {
       
     }
  
    ngOnInit(): void {
      this.cartService.getProducts()
      .subscribe(res=>{
        this.products = res;
        this.products.forEach((a:Product) => {
          if(a.name)
          Object.assign(a,{quantity:1,total:a.price});
        });
        // let count=0;
        // for(let i=0;i<this.products.length;i++){
        //   for(let j=0;j<this.products.length;i++){
        //     if(this.products[i].name===this.products[j].name){
        //       count++;
        //     }
        //   }
        //   Object.assign(this.products[i],{quantity:count,total:(this.products[i].price)*count});
        //}
        this.grandTotal = this.cartService.getTotalPrice();
      })
    }
    removeItem(item: any){
      this.cartService.removeCartItem(item);
    }
    emptycart(){
      this.cartService.removeAllCart();
    }
    checkUserLoggedIn(products :any){
      
      if(localStorage.getItem('token')){
        this.userLoggedIn=false;
        this._router.navigateByUrl('/order',{state:products})
      }
      else{
        this.userLoggedIn=true;
      }
    }
  
  }
