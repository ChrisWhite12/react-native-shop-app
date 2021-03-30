import React from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'

import * as cartActions from '../../store/actions/cart'
import Colors from "../../constants/Colors";

const ProductsOverviewScreen = (props) => {
    const productData = useSelector((state) => state.products.availProducts);
    const dispatch = useDispatch()

    const handleDetailPress = (id, title) => {
        props.navigation.navigate("ProductDetail", {
            productId: id,
            productTitle: title
        })
    }

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
            > 
            
                <Button color={Colors.secondary} style={styles.btn} title="Details" onPress={() => {
                    handleDetailPress(itemData.item.id, itemData.item.title)
                    }
                }/>
                <Button color={Colors.secondary} style={styles.btn} title="Add to Cart" onPress={() => {
                    dispatch(cartActions.addToCart(itemData.item))
                    }
                }/>

            </ProductItem>
            )}
        />
        </View>
    );
};

ProductsOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: "All Products",
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Cart' iconName={'md-cart'} onPress={() => {
                navData.navigation.navigate("CartList")
            }} />
        </HeaderButtons>,
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='menu' iconName={'md-menu'} onPress={() => {
                navData.navigation.toggleDrawer()
            }} />
        </HeaderButtons>
    }
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
    btn: {
        margin: 10
    }
});

export default ProductsOverviewScreen;
