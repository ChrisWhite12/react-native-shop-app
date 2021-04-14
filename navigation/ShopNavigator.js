import React from 'react'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer'


import Colors from '../constants/Colors'

import CartScreen from '../screens/shop/CartScreen'
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen'
import ProductsOverviewScreen from '../screens/shop/ProductOverviewScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import UserProductsScreen from '../screens/user/UserProductsScreen'


import { Ionicons } from '@expo/vector-icons'
import EditProductsScreen from '../screens/user/EditProductsScreen'
import AuthScreen from '../screens/user/AuthScreen'
import StartupScreen from '../screens/StartupScreen'
import { Button, SafeAreaView, View } from 'react-native'

import * as authActions from '../store/actions/auth'

import { useDispatch } from 'react-redux'

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
}, {
    contentComponent: props => {
        const dispatch = useDispatch()
        return <View style={{flex: 1, marginTop: 50}}>
            <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                <DrawerNavigatorItems {...props} />
                <Button title='Logout' color={Colors.secondary} onPress={() => {
                    authActions.logout()
                    // props.navigation.navigate('Auth')
                }}/>
            </SafeAreaView>
        </View>
    }
})

const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNavigator,
    Shop: ShopNavigator
})



export default createAppContainer(MainNavigator)