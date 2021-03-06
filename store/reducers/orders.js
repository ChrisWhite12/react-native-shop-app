import Order from "../../models/order"
import { ADD_ORDER, SET_ORDERS } from "../actions/orders"

const initState = {
    orders: []
}

export default (state = initState, action) => {
    switch(action.type){
        case ADD_ORDER:
            const newOrder = new Order(
                action.orderData.id,
                action.orderData.items,
                action.orderData.amount,
                action.orderData.date)

            return {
                ...state,
                orders: state.orders.concat(newOrder)
            }
        case SET_ORDERS:
            return {
                ...state,
                orders: action.orders
            }
        default:
            return state
    }

}