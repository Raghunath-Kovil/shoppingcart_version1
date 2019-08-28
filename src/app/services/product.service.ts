import { Injectable } from '@angular/core';

import { Product } from '../entities/product.entity';

import { HttpClient } from "@angular/common/http";

@Injectable()
export class ProductService {

    private products: Product[];

    //constructor(private http: HttpClient) {}


    constructor() {
        this.products = [
            { id: 'p01', name: 'name 1', price: 100, photo: 'thumb1.gif' },
            { id: 'p02', name: 'name 2', price: 200, photo: 'thumb2.gif' },
            { id: 'p03', name: 'name 3', price: 300, photo: 'thumb3.gif' },
            { id: 'p04', name: 'name 4', price: 400, photo: 'thumb4.gif' },
            { id: 'p05', name: 'name 5', price: 500, photo: 'thumb3.gif' }
        ];
    }
    

    findAll(){
        return this.products;
        /*this.http.get<{message: string,products: Product[]}>('http://localhost:3000/api/products')
        .subscribe( (postData) => {
            this.products = postData.products;

        });*/
    }

    find(id: string): Product {
        return this.products[this.getSelectedIndex(id)];
    }

    private getSelectedIndex(id: string) {
        for (var i = 0; i < this.products.length; i++) {
            if (this.products[i].id == id) {
                return i;
            }
        }
        return -1;
    }

}