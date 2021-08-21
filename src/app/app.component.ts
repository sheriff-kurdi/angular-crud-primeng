import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from './models/Product';
import { Type } from './models/Type';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{

  title = 'reactiv-forms';
  products :Array<Product> = [];


  ngOnInit(){

 
    this.products.push(new Product(1,"shirt", "desc", 150, Type.Basic));
    this.products.push(new Product(2,"t-shirt", "desc", 200, Type.Premium));
    this.products.push(new Product(3,"scirt", "desc", 120, Type.Basic));

    if(localStorage.getItem("products") == null)
    {
      localStorage.setItem("products",JSON.stringify(this.products));

    }
    this.products = JSON.parse(localStorage.getItem('products')||'{}');

  }

  

 
}
