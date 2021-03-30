import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/shop/OrderItem'

const OrdersScreen = props => {
    const orders = useSelector(state => state.orders.orders)
    // console.log(orders)
    return (
        <FlatList 
            data={orders} 
            renderItem={itemData => {
                return (
                    <OrderItem 
                    total={itemData.item.totalAmount}
                    date={itemData.item.readableDate}
                    items={itemData.item.items}/>  
                )
        }} />
    )
}

OrdersScreen.navigationOptions = navData => {
    return {
        headerTitle: "Your Orders",
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='menu' iconName={'md-menu'} onPress={() => {
                    navData.navigation.toggleDrawer()
                }} />
            </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default OrdersScreen