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

  constructor(private httpClient: HttpClient) {} //inject http client

  //returns an observable
  //Map the JSON data from Spring Data REST to Product array
  getProductList(): Observable<Product[]> {
    return this.httpClient
      .get<GetResponse>(this.baseUrl)
      .pipe(map((response) => response._embedded.products)); //map is a special operator from the RXJS (Reactive JavaScript) module
  }
}

// add supporting interface to help with mapping
interface GetResponse {
  _embedded: {
    products: Product[];
  };
  /* 
interface getresponse will help us unwrap the JSON
data from the spring of data REST API and make use
of that underscore embedded entry that comes back
from the spring data REST API.
*/
}
