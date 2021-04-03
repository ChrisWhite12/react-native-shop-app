import Order from "../../models/order"

export const ADD_ORDER = 'ADD_ORDER'
export const SET_ORDERS = 'SET_ORDERS'

export const addOrder = (cartItems, totalAmount) => {
    return async dispatch => {
        const date = new Date()
        const response = await fetch('https://shpo-app-default-rtdb.firebaseio.com/orders/u1.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cartItems,
                totalAmount,
                date: date.toISOString()
            })
        })
        const resData = await response.json()

        if(!response.ok){
            throw new Error('Response not OK')
        }

        dispatch({
            type: ADD_ORDER,
            orderData: {id: resData.name, items: cartItems, amount: totalAmount, date: date}
        })
        
    }
}

export const fetchOrders = () => {
    return async dispatch => {
        const response = await fetch('https://shpo-app-default-rtdb.firebaseio.com/orders/u1.json')
        const resData = await response.json()
        const resOut = []

        if(!response.ok){
            throw new Error('Response not OK')
        }

        for (const key in resData){
            resOut.push(new Order(key, resData[key].cartItems, resData[key].totalAmount, new Date(resData[key].date)))
        }
        console.log(resData)
        dispatch({type: SET_ORDERS, orders: resOut})
    }
}