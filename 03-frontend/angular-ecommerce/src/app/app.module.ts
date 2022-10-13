import { ProductService } from './services/product.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http'; //manually type this in

@NgModule({
  declarations: [AppComponent, ProductListComponent],
  imports: [
    BrowserModule,
    HttpClientModule, //service module provided by Angular that allows us to perform HTTP requests and easily manipulate those requests and their responses.
  ],
  providers: [ProductService], //add refernce to our ProductService. Allows us to inject given service into other parts of our application
  bootstrap: [AppComponent],
})
export class AppModule {}