import { ProductService } from './../../services/product.service';
import { ProductListComponent } from './../product-list/product-list.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {}

  
  doSearch(value: string) {
    console.log(`value=${value}`);
    this.router.navigateByUrl(`/search/${value}`);  // routing the data to our search route, handled by product list component
  }
  
}
