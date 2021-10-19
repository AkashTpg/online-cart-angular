import { Component, OnInit } from '@angular/core';
import { ProductDetail } from '../_models/ProductDetail';
import { ProductService } from '../_services/product.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CartService } from '../_services/cart.service';
import { Product } from '../_models/Product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productDetail$!: Observable<ProductDetail>;
  productDetail:ProductDetail;
  products:any=[];
  uuid:string;
  userLoggedIn:boolean=false;

  constructor(private productService:ProductService, private route: ActivatedRoute,
    private _cartService:CartService,private _router: Router) { }

  ngOnInit(): void {
    // this.uuid = this.route.snapshot.paramMap.get('id');
    // this.productService.getProductDetails(this.uuid).subscribe(data=>this.productDetail=data);
    this.productDetail$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.productService.getProductDetails(params.get('id')!))
    );
  }
  addToCart(item: Product){
    this._cartService.addtoCart(item);
  }
  checkUserLoggedIn(product:Product){
    //alert("method enter")
    if(localStorage.getItem('token')){
      this.userLoggedIn=false;
      this.products.push(product);
      this._router.navigateByUrl('/order',{state:this.products})
      //navigate(['/','order']);
     
    }
    else{
      this.userLoggedIn=true;
    }
  }

}
