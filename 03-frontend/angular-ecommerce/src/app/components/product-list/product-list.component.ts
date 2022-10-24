import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1;
  currentCategoryName: string = '';

  constructor(
    private productService: ProductService, //Inject our product service into constructor/component
    private route: ActivatedRoute //current active route that loaded the component. FOr accessing route parameters
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      //subscribe on the param map for the given route
      this.listProducts(); //similar to @PostConstruct; add hook to call listProducts method
    });
  }

  listProducts(): void {
    //check if "id" param is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      //get the "id" param string. convert string to a number using the + symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!; //add !: the non-null assertion operator. Tells compiler obj is not null
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
    } else {
      //set default category id to 1, and category name set to books
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books';
    }

    //now get the products for the given category id
    this.productService.getProductList(this.currentCategoryId).subscribe(
      //method is invoked once you subscribe
      (data) => {
        this.products = data;
      }
    );
  }
}
