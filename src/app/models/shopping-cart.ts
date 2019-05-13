import { ShoppingCartItem } from './shopping-cart-item';

export interface ShoppingCart {
    items: ShoppingCartItem[];
    key: string;
}
export class ShoppingCart {
    constructor(public key: string, public items: ShoppingCartItem[]) {}

    public get TotalNumbersCount(): number {
        let count = 0;
        // tslint:disable-next-line: forin
        for ( let productId in this.items) {
                count += this.items[productId].quantity;
        }
        return count;
    }
}
