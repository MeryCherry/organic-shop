import { Product } from 'shared/models/product';

export class ShoppingCartItem {

    key: string;
    title: string;
    price: number;
    category: string;
    imageUrl: string;
    quantity: number;

    // init can be object that looks like a shopping cart item
    constructor(init?: Partial<ShoppingCartItem>) {
    // mapping properties from passed object in constructor
        Object.assign(this, init);
    }

    public get totalPrice() {
        return this.price * this.quantity;
    }
}
