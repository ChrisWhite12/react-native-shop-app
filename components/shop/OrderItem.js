import React, { useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import Colors from '../../constants/Colors'
import CartItem from './CartItem'

const OrderItem = props => {
    const [showDetails,setShowDetails] = useState(false)

    return (
        <View style={styles.item}>
            <View style={styles.orderInfo}>
                <Text>${props.total.toFixed(2)}</Text>
                <Text>{props.date}</Text>
                <Button title="Details"
                color={Colors.secondary}
                onPress={() => {
                    setShowDetails(prevState => !prevState)
                }}
                />
            </View>
            {showDetails && 
            <View>
                {props.items.map(cartItem => 
                    <CartItem 
                    key={cartItem.productId}
                    productTitle={cartItem.productTitle}
                    productPrice={cartItem.sum}
                    quantity={cartItem.quantity}
                    deleteable={false} />)}
            </View>}
            
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1,
        margin: 5,
        padding: 5
    },
    orderInfo: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
})

export default OrderItem