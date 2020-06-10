import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  constructor(public http: HttpClient) { }

  private searchProducts = new BehaviorSubject('')
  searchValue = this.searchProducts.asObservable();


  searchForProduct(value: string){
    this.searchProducts.next(value)
  }

  private updateCartTotalValue = new BehaviorSubject(0);
  cartTotalValue = this.updateCartTotalValue.asObservable();

  updateCartValue(data: number) {
    this.updateCartTotalValue.next(data)
  }

  private _getProductListUrl = "/assets/data/productlist.json";

  headers = new HttpHeaders().set('content-Type', 'text/plain')
  options = { headers: this.headers, withCredentials: true }

  getProductList(): Observable<any> {
    return this.http.get(this._getProductListUrl, this.options)
        .pipe()
        .map(response => {
          return response;
        })
  }
  
}
