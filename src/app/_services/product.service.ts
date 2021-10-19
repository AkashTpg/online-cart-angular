import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../_models/Product';
import { ProductDetail } from '../_models/ProductDetail';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productSubject= new BehaviorSubject<Product[]>([]);
  private dataStore: { productList: Product[] } = { productList: [] };
  private currentCategoryUUID:string = "NONE";
  private currentPage:number = 0;
  private readonly pageSize = 9;

  private pageSubject= new BehaviorSubject<number>(0);
  private totalPageSubject= new BehaviorSubject<number>(0);
  

  constructor(private http: HttpClient) {}

  getProducts(){
    this.http.get<Product[]>('http://localhost:9090/products/getAllList/'+this.currentPage+'/'+this.pageSize+'').subscribe(
      data => {
        this.dataStore.productList = data;
        this.productSubject.next(Object.assign({}, this.dataStore).productList);
      },
      error => console.log('Could not load Products.')
    );
    
  }
  getProductDetails(uuid:string){
    return this.http.get<ProductDetail>('http://localhost:9090/products/getProductDetails/'+uuid+'');
  }
  getProductsBycategory(uuid:string){
    this.http.get<Product[]>('http://localhost:9090/products/getProductByCategories/'+uuid+'/'+this.currentPage+'/'+this.pageSize+'').subscribe(
      data => {
        this.dataStore.productList = data;
        this.productSubject.next(Object.assign({}, this.dataStore).productList);
      },
      error => console.log('Could not load Products.')
    );
   
  }
  setCurrentCategory(categ_uuid:string){
    this.currentCategoryUUID = categ_uuid;
    this.currentPage = 0;
    this.pageSubject.next(this.currentPage);
    this.getTotalPages();
  }
  getTotalPages(){
    this.http.get('http://localhost:9090/products/getNumberOfPages/'+this.pageSize+'/'+this.currentCategoryUUID+'').subscribe(
      data=>{this.totalPageSubject.next(Number(data))}
    );
  }
  getTotalPagesBySearch(keyword: string){
    this.http.get('http://localhost:9090/products/getNumberOfPagesBySearch/'+this.pageSize+'/'+keyword+'').subscribe(
      data=>{this.totalPageSubject.next(Number(data))}
    );
  }
  getProductsByName(keyword:string){
    this.http.get<Product[]>('http://localhost:9090/products/getProductBySearch/'+keyword+'/'+this.currentPage+'/'+this.pageSize+'').subscribe(
      data => {
        this.dataStore.productList = data;
        this.productSubject.next(Object.assign({}, this.dataStore).productList);
      },
      error => console.log('Could not load Products.')
    );
   
  }
  get products() {
    return this.productSubject.asObservable();
  }
  get page(){
    return this.pageSubject.asObservable();
  }
  get totalPage(){
    return this.totalPageSubject.asObservable();
  }

  fetchNewData(currentPageNum: number){
    this.currentPage = currentPageNum;
    if(this.currentCategoryUUID=="NONE"){
      this.getProducts();
    }
    else{
      this.getProductsBycategory(this.currentCategoryUUID);
    }
  }
}
