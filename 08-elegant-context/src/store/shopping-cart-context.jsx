import { createContext, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

export const CartContext = createContext({
    items: [],
    onAddToCart: () => {},
    onUpdateCart: () => {}
})

function shoppingCartReducer (state, action) {

    if(action.type === 'ADD') {

        const updatedItems = [...state.items];
    
        const existingCartItemIndex = updatedItems.findIndex(
        
            (cartItem) => cartItem.id === action.payload.id
        );
        
        const existingCartItem = updatedItems[existingCartItemIndex];

        if (existingCartItem) {

            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
            };
        
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
        
            const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload.id);
        
            updatedItems.push({
                id: action.payload.id,
                name: product.title,
                price: product.price,
                quantity: 1,
            });
        }

        return {
            ...state,
            items: updatedItems,
        };
    }

    if(action.type === 'UPDATE') {

        const updatedItems = [...state.items];
        
        const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === action.payload.productId
        );

        const updatedItem = {
            ...updatedItems[updatedItemIndex],
        };

        updatedItem.quantity += action.payload.amount;

        if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
        } else {
            updatedItems[updatedItemIndex] = updatedItem;
        }

        return {
            ...state,
            items: updatedItems,
        };
    }

    return state;
}

export default function CartContextProvider({ children }) {

    const [shoppingCartState, dispatchShoppingCartAction] = useReducer(
        shoppingCartReducer,
        { items: [] }
    );
    
    function handleAddItemToCart(id) {
    
        dispatchShoppingCartAction({
            type: 'ADD',
            payload: { id }
        });
    }
    
    function handleUpdateCartItemQuantity(productId, amount) {
        
        dispatchShoppingCartAction({
            type: 'UPDATE',
            payload: { productId, amount }
        })
    }
    
    let ctxValue = {
        items: shoppingCartState.items,
        onAddToCart: handleAddItemToCart,
        onUpdateCart: handleUpdateCartItemQuantity
    }

    return <CartContext.Provider value={ctxValue}>
            {children}
        </CartContext.Provider>
    
}