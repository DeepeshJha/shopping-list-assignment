import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductListService } from 'src/app/product-list.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public productService: ProductListService) {
    this.productService.cartTotalValue.subscribe(cartval => {
      this.cartTotalValue = cartval;
    })
  }

  title = 'shopping-list';
  searchProduct = new FormControl();
  cartTotalValue: number = 0;

  searchForProducts(){
    this.searchProduct.valueChanges.subscribe(val => {
      this.productService.searchForProduct(val)
    }) 
  }
}
