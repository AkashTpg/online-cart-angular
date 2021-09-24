import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categories } from '../_models/Categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategoriesList(){
    return this.http.get<Categories[]>('http://localhost:9090/products/getCategories');
  }
}
