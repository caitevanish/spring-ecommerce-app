import { ProductCategory } from './../common/product-category';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';
  // private baseUrl = 'http://localhost:8080/api/products?size=100';     //Defaults to 20 items per page, use query to get more items
  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) {} //inject http client

  //need to build url based on category id, page and size
  getProductListPaginate(
    thePage: number,
    thePageSize: number,
    theCategoryId: number
  ): Observable<GetResponseProducts> {
    //need to access information in calling app
    const searchUrl =
      `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}` +
      `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  //returns an observable
  //Map the JSON data from Spring Data REST to Product array
  getProductList(theCategoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`; //calling new URL on Spring Boot app (ProductRepository.java)

    return this.getProducts(searchUrl);
  }

  SearchProducts(theKeyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`; //Build url based on keyword

    return this.getProducts(searchUrl);
  }

  //refactored to a private method to reduce code redundancy, ie. a code smell!
  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient
      .get<GetResponseProducts>(searchUrl)
      .pipe(map((response) => response._embedded.products)); //map is a special operator from the RXJS (Reactive JavaScript) module
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<GetResponseProductCategory>(this.categoryUrl) //call REST API
      .pipe(map((response) => response._embedded.productCategory)); //REturns an observable
  }

  //get product details
  getProduct(theProductId: number): Observable<Product> {
    //need to build url based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;

    //call rest api based on product url
    return this.httpClient.get<Product>(productUrl);
  }
}

// add supporting interface to help with mapping
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
  /* 
interface getresponse will help us unwrap the JSON
data from the spring of data REST API and make use
of that underscore embedded entry that comes back
from the spring data REST API.
*/
}
