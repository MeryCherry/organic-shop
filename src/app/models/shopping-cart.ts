import { ShoppingCartItem } from './shopping-cart-item';

export interface ShoppingCart {
    items: ShoppingCartItem[];
    key: string;
}
export class ShoppingCart {
    public items: ShoppingCartItem[] = [];

    // constructor(public key: string, public items: ShoppingCartItem[]) {}
    constructor(public key: string, public itemsMap: { [key: string]: ShoppingCartItem}) {
        let item;
// tslint:disable-next-line: forin
        for ( let productId in itemsMap) {
            item = itemsMap[productId];
            this.items.push(new ShoppingCartItem(item.product, item.quantity));
        }
    }
    public get TotalNumbersCount(): number {
        let count = 0;
        // tslint:disable-next-line: forin
        for ( let productId in this.items) {
                count += this.items[productId].quantity;
        }
        return count;
    }

    public get productIds(): string[] {
        return Object.keys(this.items);
    }

    public get totalPrice() {
        let sum = 0;
        // tslint:disable-next-line: forin
        for ( let productId in this.items) {
            sum += this.items[productId].totalPrice;
        }
        return sum;
    }
}
