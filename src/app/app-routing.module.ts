import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  {path: 'products', component: ProductsComponent},
  {path: 'add-product', component: AddProductComponent},
  {path:'add-product/:id', component: AddProductComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 
 }
