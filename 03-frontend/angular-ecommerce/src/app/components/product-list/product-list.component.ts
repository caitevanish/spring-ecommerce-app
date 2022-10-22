import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  // templateUrl: './product-list-table.component.html',
  // templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1;

  constructor(private productService: ProductService) {} //Inject our product service into constructor/component

  ngOnInit(): void {
    this.listProducts(); //similar to @PostConstruct; add hook to call listProducts method
  }

  listProducts() {
    this.productService.getProductList().subscribe(
      //method is invoked once you subscribe
      (data) => {
        this.products = data;
      }
    );
  }
}
