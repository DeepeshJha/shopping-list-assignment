import { Component, OnInit } from '@angular/core';
import { ProductListService } from 'src/app/product-list.service'
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor(public productService: ProductListService) {
    this.productService.searchValue.subscribe(searchval => {
      this.allProducts = this.filterProducts(searchval)
    })
  }

  filterProducts(searchval): string[] {
    return this.filterProductList.filter(prod => prod.name.toLowerCase().includes(searchval.toLowerCase()))
  }

  allProducts = []; filterProductList = [];
  ngOnInit() {
    this.productService.getProductList().subscribe(response => {
      this.allProducts = response
      this.filterProductList = response
    })
  }

  updatedCartCount: number = 0;
  addToCart() {
    this.updatedCartCount += 1
    this.productService.updateCartValue(this.updatedCartCount);
  }

  priceLowToHigh() {
    this.allProducts = this.allProducts.sort(this.compareLowToHigh)
  }

  priceHighToLow() {
    this.allProducts = this.allProducts.sort(this.compareHighToLow)
  }

  sortByRelevance() {
    this.productService.getProductList().subscribe(response => {
      this.allProducts = response
      this.filterProductList = response
    })
  }

  compareLowToHigh(a, b) {
    if (a.price < b.price) {
      return -1;
    } else if (a.price > b.price) {
      return 1;
    } else {
      return 0;
    }
  }
  compareHighToLow(a, b) {
    if (a.price > b.price) {
      return -1;
    } else if (a.price < b.price) {
      return 1;
    } else {
      return 0;
    }
  }
}
