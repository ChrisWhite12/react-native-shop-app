import Order from "../../models/order"
import { ADD_ORDER } from "../actions/orders"

const initState = {
    orders: []
}

export default (state = initState, action) => {
    switch(action.type){
        case ADD_ORDER:
            const newOrder = new Order(
                new Date().toString(),
                action.orderData.items,
                action.orderData.amount,
                new Date())

            return {
                ...state,
                orders: state.orders.concat(newOrder)
            }
        default:
            return state
    }

}