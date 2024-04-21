import { IProduct } from "@/components/ProductListItem";
import { PizzaSize } from "@/types";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { randomUUID } from 'expo-crypto'


export interface ICartItem {
    id: string;
    product: IProduct;
    product_id: number;
    size: PizzaSize;
    quantity: number;
}

interface ICart {
    items: ICartItem[];
    addItem: (product: IProduct, size: ICartItem['size']) => void;
    updateQuantity: (itemId: string, amount: -1 | 1) => void;
    total: number;
}

export const CartContext = createContext<ICart>({
    items: [],
    addItem: () => { },
    updateQuantity: () => { },
    total: 0,
});

const CartProvider = ({ children }: PropsWithChildren) => {
    const [items, setItems] = useState<ICartItem[]>([]);

    const addItem = (product: IProduct, size: ICartItem['size']) => {
        // if already in cart, increment quantity
        const existingItem = items.find(item => item.product === product && item.size === size);
        if (existingItem) {
            updateQuantity(existingItem.id, 1);
            return;
        }

        const newCartItem: ICartItem = {
            id: randomUUID(),
            product: product,
            size: size,
            product_id: product.id,
            quantity: 1,
        }

        setItems([newCartItem, ...items]);
    }

    // update quantity 
    const updateQuantity = (itemId: string, amount: -1 | 1) => {
        const updatedItems = items.map((item) =>
            item.id !== itemId ? item : {
                ...item, quantity: item.quantity + amount
            }
        ).filter((item) => item.quantity > 0);

        setItems(updatedItems);
    };

    const total = items.reduce((sum, item) => (sum += item.product.price * item.quantity), 0);

    return (
        <CartContext.Provider
            value={{ items: items, addItem, updateQuantity, total}}
        >
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;

export const useCart = () => useContext(CartContext);