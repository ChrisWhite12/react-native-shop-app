import { add } from "react-native-reanimated";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from "../../models/cart-item";
import { ADD_ORDER } from "../actions/orders";

const initState = {
    items: {},
    costTotal: 0,
};

export default (state = initState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const productPrice = addedProduct.price;
            const productTitle = addedProduct.title;

            if (state.items[addedProduct.id]) {
                const updateCartItem = new CartItem(
                state.items[addedProduct.id].quantity + 1,
                productPrice,
                productTitle,
                state.items[addedProduct.id].sum + productPrice
                );
                return {
                ...state,
                items: {
                    ...state.items,
                    [addedProduct.id]: updateCartItem,
                },
                costTotal: state.costTotal + productPrice,
                };
            } else {
                const newCartItem = new CartItem(
                1,
                productPrice,
                productTitle,
                productPrice
                );
                return {
                ...state,
                items: {
                    ...state.items,
                    [addedProduct.id]: newCartItem,
                },
                costTotal: state.costTotal + productPrice,
                };
            }
        case REMOVE_FROM_CART:
            const selCartItem = state.items[action.pid];
            const currQty = selCartItem.quantity;
            let updatedCartItems = {}

            if (currQty > 1) {
                const updateCartItem = new CartItem(
                    selCartItem.quantity - 1,
                    selCartItem.productPrice,
                    selCartItem.productTitle,
                    selCartItem.sum - selCartItem.productPrice
                );
                updatedCartItems = {...state.items, [action.pid]: updateCartItem}
            } else {
                    updatedCartItems = { ...state.items };
                    delete updatedCartItems[action.pid];
            };

            return {
                ...state,
                items: updatedCartItems,
                costTotal: state.costTotal - selCartItem.productPrice
            }
        case ADD_ORDER:
            return initState
        default:
        return state;
    }
};
