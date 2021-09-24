import { Component, OnInit } from '@angular/core';
import { ProductDetail } from '../_models/ProductDetail';
import { ProductService } from '../_services/product.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productDetail$!: Observable<ProductDetail>;
  productDetail:ProductDetail;
  uuid:string;

  constructor(private productService:ProductService, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    // this.uuid = this.route.snapshot.paramMap.get('id');
    // this.productService.getProductDetails(this.uuid).subscribe(data=>this.productDetail=data);
    this.productDetail$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.productService.getProductDetails(params.get('id')!))
    );
  }

}
