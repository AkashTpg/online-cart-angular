import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Categories } from './_models/Categories';
import { CategoriesService } from './_services/categories.service';
import { ProductService } from './_services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'online-cart-angular';
  catgoriesList:Categories[]=[];
  

  constructor(private categoryService: CategoriesService, private productService:ProductService, private router: Router) { }
  
  ngOnInit(){
    this.categoryService.getCategoriesList().subscribe(data=>this.catgoriesList=data);
    this.productService.getProducts();
    this.productService.getTotalPages();
  }
  changeCategory(uuid:string){
    this.router.navigate(['/home']);
    this.productService.setCurrentCategory(uuid);
    this.productService.getProductsBycategory(uuid);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/','login']);
  }
  
}
