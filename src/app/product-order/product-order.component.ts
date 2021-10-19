import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { Order } from './order';
import { Product } from '../_models/Product';
import { OrderService } from '../_services/order.service';

@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.css']
})
export class ProductOrderComponent implements OnInit {
  public products:Product[]=[];
  public uuid:string;
  appstate$: Observable<object>;
  registerForm: FormGroup;
    orderInfo:Order={
      fuullName: "",
      phone: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      pincode: "",
      orderedProduct:[]
    };
    loading = false;
    submitted = false;
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private activatedRoute:ActivatedRoute,
        private orderService: OrderService,
        ) {  
          
      this.router.getCurrentNavigation().extras.state;let index=0;
      for (var key in history.state) {
        let item:Product={
          name: "",
          price : 0,
          rating: 0,
          uuid: ''
        };
        if (!history.state.hasOwnProperty(key)) continue;
    
        var obj = history.state[key];
        for (var prop in obj) {
            if (!obj.hasOwnProperty(prop)) continue;
            if(prop==="name"){
              item.name=obj[prop];
              continue;
            }
            if(prop==="price"){
              item.price=obj[prop];
              continue;
            }
        }
        this.products.push(item)
    }
      this.products.pop();
    }
  
    ngOnInit() {
    this.registerForm = this.formBuilder.group({
    inputName: ['', [Validators.required,Validators.minLength(3)]],
    inputNumber: ['', [Validators.required,Validators.pattern('[6-9]\\d{9}')]],
    inputAddress1: ['', [Validators.required,Validators.maxLength(200)]],
    inputAddress2: ['', Validators.maxLength(200)],
    inputCity: ['', Validators.required],
    inputState: ['', ],
    inputZip: ['', [Validators.required, Validators.minLength(6)]]
         });
     }
    get f() { return this.registerForm.controls; }

    onSubmit() {
       this.submitted = true;
        // stop here if form is invalid
        if (this.registerForm.invalid) {
           return;
       }
      this.loading=false;
      this.orderInfo.fuullName=this.registerForm.get('inputName').value;
      this.orderInfo.phone=this.registerForm.get('inputNumber').value;
      this.orderInfo.address1=this.registerForm.get('inputAddress1').value;
      this.orderInfo.address2=this.registerForm.get('inputAddress2').value;
      this.orderInfo.city=this.registerForm.get('inputCity').value;
      this.orderInfo.state=this.registerForm.get('inputState').value;
      this.orderInfo.pincode=this.registerForm.get('inputZip').value;
      for(let i=0;i<this.products.length;i++){
        this.orderInfo.orderedProduct.push(this.products[i]);
      }
      this.orderService.order(this.orderInfo)
      .subscribe(
          data => {
            alert("your order placed successfully")
          },
          error => {
              this.loading = false;
              alert("Something went wrong..plz try again..")
          }); 
        
    }
    
     
  

}
