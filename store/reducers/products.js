import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/product";
import {
    CREATE_PRODUCT,
    DELETE_PRODUCT,
    UPDATE_PRODUCT,
} from "../actions/products";

const initState = {
    availProducts: PRODUCTS,
    userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

export default (state = initState, action) => {
    switch (action.type) {
        case DELETE_PRODUCT:
        return {
            ...state,
            userProducts: state.userProducts.filter(
            (product) => product.id !== action.pid
            ),
            availProducts: state.availProducts.filter(
            (product) => product.id !== action.pid
            ),
        };
        case CREATE_PRODUCT:
        const newProd = new Product(
            new Date().toString(),
            "u1",
            action.productData.title,
            action.productData.imageUrl,
            action.productData.description,
            action.productData.price
        );
        return {
            ...state,
            availProducts: state.availProducts.concat(newProd),
            userProducts: state.availProducts.concat(newProd),
        };
        case UPDATE_PRODUCT:
        const prodIndex = state.userProducts.findIndex(
            (product) => product.id === action.pid
        );
        const updatedProduct = new Product(
            action.pid,
            state.userProducts[prodIndex].ownerId,
            action.productData.title,
            state.userProducts[prodIndex].imageUrl,
            action.productData.description,
            state.userProducts[prodIndex].price
        );
        
        const updatedUserProducts = [...state.userProducts]
        updatedUserProducts[prodIndex] = updatedProduct

        const availProdIndex = state.availProducts.findIndex(
            (product) => product.id === action.pid
        );
        const updatedAvailProducts = [...state.availProducts]
        updatedAvailProducts[availProdIndex] = updatedProduct

        return {
            ...state,
            availProducts: updatedAvailProducts,
            userProducts: updatedUserProducts
        }

        default:
        return state;
    }
};
