import PRODUCTS from '../../data/dummy-data'

const initState = {
    availProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
}

export default (state = initState , action) => {
    return state
}