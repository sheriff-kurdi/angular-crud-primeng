import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { Type } from 'src/app/models/Type';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  id: number = -1;
  private sub: any;
  types = [

    { name: 'Sellect', code: '-1' },
    { name: 'Basic', code: '0' },
    { name: 'Premium', code: '1' },

  ]
  title = 'reactiv-forms';
  //  myForm: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   amount: new FormControl(''),
  //   description: new FormControl(''),
  //   id: new FormControl(''),
  //   type: new FormControl('')
  // });

  myForm: FormGroup;
  constructor(private fb: FormBuilder, private route: ActivatedRoute) {

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });

    this.products.push(new Product(1, "shirt", "desc", 150, Type.Basic));
    this.products.push(new Product(2, "t-shirt", "desc", 200, Type.Premium));
    this.products.push(new Product(3, "scirt", "desc", 120, Type.Basic));

    if (localStorage.getItem("products") == null) {
      localStorage.setItem("products", JSON.stringify(this.products));

    }
    this.products = JSON.parse(localStorage.getItem('products') || '{}');



    if (this.id != null) {
      console.log(this.products.filter(x => x.id == this.id));
      if (this.products.filter(x => x.id == this.id).length > 0) {
        this.myForm = this.fb.group({
          name: [this.products.filter(x => x.id == this.id)[0].name, Validators.required],
          amount: [this.products.filter(x => x.id == this.id)[0].amount, Validators.required],
          description: [this.products.filter(x => x.id == this.id)[0].description, Validators.required],
          id: [this.products.filter(x => x.id == this.id)[0].id, Validators.required],
          type: [this.products.filter(x => x.id == this.id)[0].type, Validators.required],
        });
      } else {
        this.myForm = this.fb.group({
          name: ['', Validators.required],
          amount: ['', Validators.required],
          description: ['', Validators.required],
          id: ['', Validators.required],
          type: ['', Validators.required],
        });
      }

    } else {
      this.myForm = this.fb.group({
        name: ['', Validators.required],
        amount: ['', Validators.required],
        description: ['', Validators.required],
        id: ['', Validators.required],
        type: ['', Validators.required],
      });
    }




  }
  products: Array<Product> = [];


  ngOnInit() {




  }

  get getControl() {
    return this.myForm.controls;
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('id', form.value.id);
    console.log('name', form.value.name);
    console.log('amount', form.value.amount);
    console.log('description', form.value.description);
    console.log('type', form.value.type);

    if (form.valid) {
      console.log("in submit");
      if (isNaN(this.id)) {
        console.log("gonna add");
        this.products.push(
          new Product(form.value.id, form.value.name, form.value.description, form.value.amount, form.value.type)
        );

        localStorage.setItem("products", JSON.stringify(this.products));
        alert("Created");
      }else{
        console.log("gonna edit");

        if (this.products.filter(x => x.id == this.id).length > 0) {

          this.products.forEach((element, index) => {
            if (element.id == this.id) {
              console.log(index);
              this.products[index].name = form.value.name;
              this.products[index].description = form.value.description;
              this.products[index].type = form.value.type;
              this.products[index].amount = form.value.amount;

            }
          });
          localStorage.setItem("products", JSON.stringify(this.products));
          console.log(this.products);
          alert("updated!");
        } else {
          alert("not found!");

        }

      }

    } else {
      alert("form not valid!")
    }

    console.log(JSON.parse(localStorage.getItem('products') || '{}'));

  }

}
