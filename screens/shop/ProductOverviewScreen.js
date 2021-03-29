import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { ceil } from "react-native-reanimated";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";

import * as cartActions from '../../store/actions/cart'

const ProductsOverviewScreen = (props) => {
    const productData = useSelector((state) => state.products.availProducts);
    const dispatch = useDispatch()

    // const handleDetailNav = (id) => {
    //     props.navigation.navigate({routeName: 'ProductDetail', productId: id })
    // }

    // const handleCartAdd = (id) => {
    //     console.log(id)
    // }

    return (
        <View style={styles.screen}>
        <FlatList
            style={styles.flat1}
            data={productData}
            renderItem={(itemData) => (
            <ProductItem
                title={itemData.item.title}
                image={itemData.item.imageUrl}
                price={itemData.item.price}
                onPressDetail={() => {
                props.navigation.navigate("ProductDetail", {
                    productId: itemData.item.id,
                    productTitle: itemData.item.title
                });
                }}
                onPressAddCart={() => {
                    dispatch(cartActions.addToCart(itemData.item));
                }}
            />
            )}
        />
        </View>
    );
};

ProductsOverviewScreen.navigationOptions = {
    headerTitle: "All Products",
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    proText: {
        width: 200,
        height: 100,
    },
    flat1: {
        borderWidth: 1,
        width: "100%",
    },
});

export default ProductsOverviewScreen;
