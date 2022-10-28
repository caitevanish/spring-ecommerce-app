import { CartItem } from './../../common/cart-item';
import { CartService } from './../../services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;

  constructor(
    private productService: ProductService,
    private CartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      //subscribe on the params and then make a call to a method handle product details.
      this.handleProductDetails();
    });
  }
  handleProductDetails() {
    //get the id param string. convert string to a number
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProduct(theProductId).subscribe((data) => {
      this.product = data;
      //race condition! HTML template attempting to access property: product.imageUrl
      //propert is not assigned a value UNTIL data arrives from the ProductService method call
    });
  }
  addToCart() {
    console.log(
      `Adding to cart: ${this.product.name}, ${this.product.unitPrice}`
    );
    const theCartItem = new CartItem(this.product);
    this.CartService.addToCart(theCartItem);  //by the time it is added to cart product is loaded with data
  }
}
