import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Button, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'

import * as cartActions from '../../store/actions/cart'
import * as productActions from '../../store/actions/products'
import Colors from "../../constants/Colors";

const ProductsOverviewScreen = (props) => {
    const productData = useSelector((state) => state.products.availProducts);
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [error, setError] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        const productsSub = props.navigation.addListener('willFocus', loadProducts)
        
        return () => {
            productsSub.remove()
        }
    },[loadProducts])

    const loadProducts = useCallback(async() => {
        setRefreshing(true)
        dispatch(productActions.fetchProducts())
        .catch(err => {
            console.log(err)
            setError(err.message)
        })
        setRefreshing(false)
    },[dispatch, setError, setLoading])

    useEffect(() => {
        setLoading(true)
        loadProducts()
        .then(() => {
            setLoading(false)
        })
    },[dispatch,loadProducts])


    const handleDetailPress = (id, title) => {
        props.navigation.navigate("ProductDetail", {
            productId: id,
            productTitle: title
        })
    }

    if (error){
        return (
            <View style={styles.screen}>
                <Text>Error</Text>
            </View>
        )
    }

    if (loading === true){
        return (
            <View style={styles.screen}>
                <ActivityIndicator size='large' color={Colors.primary}/>
            </View>
        )
    }

    if(loading === false && productData.length === 0){
        <View style={styles.screen}>
            <Text>No Products</Text>
        </View>
    }

    return (
        <View style={styles.screen}>
        <FlatList
            onRefresh={loadProducts}
            refreshing={refreshing}
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
