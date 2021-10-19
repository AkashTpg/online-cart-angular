import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Categories } from '../_models/Categories';
import { Product } from '../_models/Product';
import { CategoriesService } from '../_services/categories.service';
import { ProductService } from '../_services/product.service';
import { Router } from '@angular/router';




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
  catgoriesList:Categories[]=[];
  constructor(private categoryService: CategoriesService,  private router: Router, private productService:ProductService) {
     
  }

  ngOnInit(): void {
    this.categoryService.getCategoriesList().subscribe(data=>this.catgoriesList=data);
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

  changeCategory(uuid:string){
    this.router.navigate(['/home']);
    this.productService.setCurrentCategory(uuid);
    this.productService.getProductsBycategory(uuid);
  }
  
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
