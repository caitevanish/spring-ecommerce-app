import { ProductService } from './services/product.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    PageNotFoundComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule, //service module provided by Angular that allows us to perform HTTP requests and easily manipulate those requests and their responses.
    AppRoutingModule,
  ],
  providers: [ProductService], //add refernce to our ProductService. Allows us to inject given service into other parts of our application
  bootstrap: [AppComponent],
})
export class AppModule {}
