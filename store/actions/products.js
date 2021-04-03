import Product from "../../models/product"

export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const SET_PRODUCTS = 'SET_PRODUCTS'

export const fetchProducts = () => {
    return async dispatch => {
        const response = await fetch('https://shpo-app-default-rtdb.firebaseio.com/products.json')
        const resData = await response.json()
        const resOut = []

        if(!response.ok){
            throw new Error('Response not OK')
        }

        for (const key in resData){
            resOut.push(new Product(key, 'u1', resData[key].title, resData[key].imageUrl, resData[key].description, resData[key].price))
        }
        console.log(resData)
        dispatch({type: SET_PRODUCTS, products: resOut})
    }
}

export const deleteProduct = productId => {
    return async dispatch => {
        const response = await fetch(`https://shpo-app-default-rtdb.firebaseio.com/products/${productId}.json`, {
            method: 'DELETE'
        })

        if(!response.ok){
            throw new Error('Response not OK')
        }

        dispatch({ type: DELETE_PRODUCT, pid: productId })
    } 
}

export const createProduct = (title, description, price, imageUrl) => {
    return async dispatch => {
        const response = await fetch('https://shpo-app-default-rtdb.firebaseio.com/products.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, description, imageUrl, price})
        })
        const resData = await response.json()

        if(!response.ok){
            throw new Error('Response not OK')
        }

        console.log(resData)

        dispatch({
            type: CREATE_PRODUCT,
            productData: {
                id: resData.name,
                title,
                description,
                price,
                imageUrl
            }
        })
    }
}

export const updateProduct = (id, title, description, imageUrl) => {
    return async dispatch => {
        const response = await fetch(`https://shpo-app-default-rtdb.firebaseio.com/products/${id}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, description, imageUrl})
        })

        if(!response.ok){
            throw new Error('Response not OK')
        }

        dispatch({ 
            type: UPDATE_PRODUCT,
            pid: id,
            productData: {
                title,
                description,
                imageUrl
            }
        })
    }
}