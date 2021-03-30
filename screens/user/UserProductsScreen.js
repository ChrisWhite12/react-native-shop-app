import React from 'react'
import { View, Text, StyleSheet, Button, Alert } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import HeaderButton from '../../components/UI/HeaderButton'
import ProductItem from '../../components/shop/ProductItem'

import Colors from '../../constants/Colors'
import * as productActions from '../../store/actions/products'

const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts)
    const dispatch = useDispatch()

    const handleEditProduct = (id) => {
        props.navigation.navigate('EditProduct', {productId: id})
    }

    const handleDelete = (id) => {
        Alert.alert('Are you sure?', 'Do you want to delete this item?', [
            {text: 'No', style: 'default'},
            {text: 'Yes', style: 'destructive', onPress:() => {
                dispatch(productActions.deleteProduct(id))
            }}
        ])
    }

    return (
        <FlatList data={userProducts} keyExtractor={item => item.id} renderItem={itemData => {
            return ( 
            <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
            >
                <Button color={Colors.secondary} style={styles.btn} title="Edit" onPress={() => {
                        handleEditProduct(itemData.item.id)
                    }
                }/>
                <Button color={Colors.secondary} style={styles.btn} title="Delete" onPress={() => {
                    handleDelete(itemData.item.id)
                }}/>
            </ProductItem> )
        }} /> 
    )
}

UserProductsScreen.navigationOptions = navData => {
    return {
        headerTitle: "Your Products",
        headerLeft: (() => <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='menu' iconName={'md-menu'} onPress={() => {
                    navData.navigation.toggleDrawer()
                }} />
            </HeaderButtons>),
        headerRight: (() => <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='add' iconName={'md-create'} onPress={() => {
                    navData.navigation.navigate('EditProduct')
                }} />
            </HeaderButtons>)
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        marginVertical: 10
    }
})

export default UserProductsScreen