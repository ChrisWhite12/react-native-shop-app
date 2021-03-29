import { add } from "react-native-reanimated"
import { ADD_TO_CART } from "../actions/cart"
import CartItem from '../../models/cart-item'

const initState = {
    items: {},
    costTotal: 0
}

export default (state = initState, action) => {
    switch (action.type){
        case ADD_TO_CART:
            const addedProduct = action.product
            const productPrice = addedProduct.price
            const productTitle = addedProduct.title

            if(state.items[addedProduct.id]){
                const updateCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    productPrice,
                    productTitle,
                    state.items[addedProduct.id].sum + productPrice
                )
                return {
                    ...state,
                    items: {
                        ...state.items,
                        [addedProduct.id]: updateCartItem
                    },
                    costTotal: state.costTotal + productPrice
                }
            }
            else{
                const newCartItem = new CartItem(1,productPrice,productTitle,productPrice)
                return {
                    ...state,
                    items: {
                        ...state.items,
                        [addedProduct.id]: newCartItem
                    },
                    costTotal: state.costTotal + productPrice
                }
            }

        default:
            return state
    }
}
