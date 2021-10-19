import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../_models/Product';
import { ProductService } from '../_services/product.service';



@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.css']
})
export class ProductDashboardComponent implements OnInit {
  
  product$:any;
  page$:Observable<number>;
  totalPage$:Observable<number>;
  totalPages:number; 
  currentPageNum:number = 0;
  pageArray:number[];

  constructor(private productService:ProductService) {
     
  }

  ngOnInit(): void {
    this.product$ = this.productService.products;
    this.page$ = this.productService.page;
    this.totalPage$ = this.productService.totalPage;
    this.page$.subscribe(n=>{this.currentPageNum=n});
    this.totalPage$.subscribe(n=>{this.totalPages=n;this.pageArray = Array(this.totalPages).fill(0);});
    // this.productService.getProducts();
    // this.productService.getTotalPages();
  }

  // getNumberOfPages(){
  //   this.productService.getTotalPages().subscribe(data=>{this.totalPages=Number(data); this.pageArray = Array(this.totalPages).fill(0);});
  // }
  goTopage(i:number){
    console.log("go to page : "+i);
    this.currentPageNum = i;
    this.productService.fetchNewData(this.currentPageNum);
  }
  prevPage(){
    if(this.currentPageNum>0){
      this.currentPageNum--;
      this.productService.fetchNewData(this.currentPageNum);
    }
  }
  nextPage(){
    if(this.currentPageNum<(this.totalPages-1)){
      this.currentPageNum++;
      this.productService.fetchNewData(this.currentPageNum);
    }
  }

}
