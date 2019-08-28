import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../entities/product.entity';
import { ProductService } from '../../services/product.service';
import { Item } from '../../entities/item.entity';


@Component({
	templateUrl: 'index.component.html'
})

export class ProductComponent implements OnInit {

    private products: Product[];
    private quantity: number = 0;
	private total: number = 0;
	constructor(
        private productService: ProductService,
        private activatedRoute: ActivatedRoute,
	) { }

	async ngOnInit() {
        this.products = await this.productService.findAll();
        this.updateCart();
        this.loadCart();        
    }
    loadCart(): void {
		if(localStorage.getItem('cart')){
			let cart = JSON.parse(localStorage.getItem('cart'));
			for (var i = 0; i < cart.length; i++) {
				let item = JSON.parse(cart[i]);			
				this.total += item.product.price * item.quantity;
				this.quantity += item.quantity;
			}
		}
    }
    updateCart() {
		this.activatedRoute.params.subscribe(params => {
			var id = params['id'];
			if (id) {
				var item: Item = {
					product: this.productService.find(id),
					quantity: 1
				};
				if (localStorage.getItem('cart') == null) {
					let cart: any = [];
					cart.push(JSON.stringify(item));
					localStorage.setItem('cart', JSON.stringify(cart));
				} else {
					let cart: any = JSON.parse(localStorage.getItem('cart'));
					let index: number = -1;
					for (var i = 0; i < cart.length; i++) {
						let item: Item = JSON.parse(cart[i]);
						if (item.product.id == id) {
							index = i;
							break;
						}
					}
					if (index == -1) {
						cart.push(JSON.stringify(item));
						localStorage.setItem('cart', JSON.stringify(cart));
					} else {
						let item: Item = JSON.parse(cart[index]);
						item.quantity += 1;
						cart[index] = JSON.stringify(item);
						localStorage.setItem("cart", JSON.stringify(cart));
					}
				}
				
			} 
		});
	}
}