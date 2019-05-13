import { Product } from 'src/app/models/product';

export class ShoppingCartItem {

    constructor( public product: Product, public  quantity: number) {}

    public get totalPrice() {
        return this.product.price * this.quantity;
    }
}
