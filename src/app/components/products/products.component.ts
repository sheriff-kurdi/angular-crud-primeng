import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { Type } from 'src/app/models/Type';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products :Array<Product> = [];
  Type = Type;
  constructor() { }

  ngOnInit(): void {
    this.products.push(new Product(1,"shirt", "desc", 150, Type.Basic));
    this.products.push(new Product(2,"t-shirt", "desc", 200, Type.Premium));
    this.products.push(new Product(3,"scirt", "desc", 120, Type.Basic));

    if(localStorage.getItem("products") == null)
    {
      localStorage.setItem("products",JSON.stringify(this.products));

    }
    this.products = JSON.parse(localStorage.getItem('products')||'{}');
  }

  delete(id:number)
  {
    if(this.products.filter(x => x.id == id).length > 0){

      this.products.forEach((element, index) => {
        if(element.id == id)
        { 
          this.products.splice(index,1);
        }
      });
      localStorage.setItem("products", JSON.stringify(this.products));
      console.log(this.products);
      alert("deleted!");
    }else{
      alert("not found!");

    }
  }

}
