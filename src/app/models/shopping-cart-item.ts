import { Product } from 'src/app/models/product';

export interface ShoppingCartItem {
    product: Product;
    quantity: number;
}
