import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'search/:keyword', component: ProductListComponent },
  { path: 'category/:id/:name', component: ProductListComponent }, //start from the most specific route all the way down to the most generic route
  { path: 'category', component: ProductListComponent },
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)], //add imports and exports manually to make it work
  exports: [RouterModule],
})
export class AppRoutingModule {}
