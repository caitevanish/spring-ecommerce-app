import { SearchComponent } from './../search/search.component';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1;
  currentCategoryName: string = '';
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  //new properties for paginagtion
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword: string = '';

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
    //if in search mode, call method 1 OR method 2
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
    // const theKeywordNum: number = theKeyword

    //if we have a different keyword htan the previous, set page number to 1
    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }
    this.previousKeyword = theKeyword;

    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);

    //now search for products using keyword
    //define the SearchProducts method in Product services
    this.productService
      .searchProductsPaginate(
        this.thePageNumber - 1,
        this.thePageSize,
        theKeyword
      )
      .subscribe(this.processResult());
  }

  //Refactored code: moved method implementation from listProducts to handleListProducts
  handleListProducts() {
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
    //
    //check if we have a different category id than the previous
    //NOte: Angular will reuse a component if it is currently being viewed

    //if we have a different category id than previous
    //then we set the pageNumber back to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;
    console.log(
      `currentCategoryId=${this.currentCategoryId}, this.thePageNumber=${this.thePageNumber}`
    );

    //now get the products for the given category id
    //thePageNumber -1 !! pagin. component pages are 1 based, Spring data rest is 0 based! Gotta do the math.
    this.productService
      .getProductListPaginate(
        this.thePageNumber - 1,
        this.thePageSize,
        this.currentCategoryId
      )
      .subscribe(this.processResult()); //refactored to not have repeating code! Using processResult() below
  }

  updatePageSize(pageSize: string) {
    this.thePageSize = +pageSize; //convert from string to num
    this.thePageNumber = 1;
    this.listProducts();
  }

  addToCart(theProduct: Product) {
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);
  }

  processResult() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }
}
