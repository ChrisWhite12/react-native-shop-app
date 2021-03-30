import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const CartItem = props => {
    return (
            <View style={styles.cartItem}>
                <Text>{props.productTitle}</Text>
                <Text>{props.quantity}</Text>
                <Text>{props.productPrice}</Text>
                {props.deleteable &&<TouchableOpacity onPress={props.onRemove} style={styles.delBtn}>
                    <Ionicons name='md-trash' size={20} color="#a55"/>
                </TouchableOpacity>}
            </View>
    )
}

const styles = StyleSheet.create({
    cartItem: {
        width: '100%',
        borderColor: '#333',
        borderWidth: 1,
        borderRadius: 10,
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 10
    },
    delBtn: {
        width: 50,
        height: 50,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default CartItem