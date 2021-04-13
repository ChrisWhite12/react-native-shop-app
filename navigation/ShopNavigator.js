import React from 'react'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'


import Colors from '../constants/Colors'

import CartScreen from '../screens/shop/CartScreen'
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen'
import ProductsOverviewScreen from '../screens/shop/ProductOverviewScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import UserProductsScreen from '../screens/user/UserProductsScreen'


import { Ionicons } from '@expo/vector-icons'
import EditProductsScreen from '../screens/user/EditProductsScreen'
import AuthScreen from '../screens/user/AuthScreen'

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Colors.primary
    }
}

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailsScreen,
    CartList: CartScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons name='md-cart'
            size={23}
            color={drawerConfig.tintColor} />
        )
    },
    defaultNavigationOptions: defaultNavOptions
})

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons name='md-list'
            size={23}
            color={drawerConfig.tintColor} />
        )
    },
    defaultNavigationOptions: defaultNavOptions
})


const AdminNavigator = createStackNavigator({
    UserProducts: UserProductsScreen,
    EditProduct: EditProductsScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons name='md-create'
            size={23}
            color={drawerConfig.tintColor} />
        )
    },
    defaultNavigationOptions: defaultNavOptions
})

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
},{
    defaultNavigationOptions: defaultNavOptions
}
)

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
})

const MainNavigator = createSwitchNavigator({
    Auth: AuthNavigator,
    Shop: ShopNavigator
})



export default createAppContainer(MainNavigator)