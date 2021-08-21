import { Type } from './Type';


export class Product {

    id:number;
    name:string;
    description:string;
    amount:number;
    type:Type;

    constructor(id:number, name: string, description:string, amount:number, type:Type) {
        this.name = name;
        this.amount = amount;
        this.description = description;
        this.id = id;
        this.type = type;
      }

}