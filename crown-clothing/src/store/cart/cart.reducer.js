import { CART_ACTION_TYPES } from "./cart.types";

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
    latestPriceUpdate: 0
};

export const cartReducer = (state = INITIAL_STATE, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                cartItems: action.payload
            };
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        case CART_ACTION_TYPES.SET_CART_COUNT:
            return {
                ...state,
                cartCount: payload
            }
        case CART_ACTION_TYPES.SET_CART_TOTAL:
            return {
                ...state,
                cartTotal: payload
            }
        case CART_ACTION_TYPES.ADD_ITEM:
            return {
                ...state,
                cartItems: action.payload
            };
        case CART_ACTION_TYPES.REMOVE_ITEM:
            return {
                ...state,
                cartItems: payload
            }
        case CART_ACTION_TYPES.CLEAR_CART_ITEMS:
            return {
                ...state,
                cartItems: []
            }
        case CART_ACTION_TYPES.REMOVE_ALL_OF_PRODUCT_FROM_CART:
            return {
                ...state,
                cartItems: payload
            }

        case CART_ACTION_TYPES.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                isCartOpen: !state.isCartOpen
            }
        case CART_ACTION_TYPES.UPDATE_PRICES:
            const updatedCartItems = state.cartItems.map(cartItem => {
                // Assuming the action.payload is an object with item IDs as keys and their updated prices as values
                const updatedPrice = payload[cartItem.id];
                if (updatedPrice !== undefined) {
                return { ...cartItem, price: updatedPrice };
                }
                return cartItem;
            });
        
            return {
                ...state,
                cartItems: updatedCartItems,
            };
        default:
            return state;
    }
}