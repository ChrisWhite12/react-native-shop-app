import React from 'react'
import { View, Text, StyleSheet, Image, Button } from 'react-native'
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler'
import Colors from '../../constants/Colors'

const ProductItem = props => {
    return (
        // <TouchableNativeFeedback onPress={props.onPressDetail}>
        <View style={styles.item}>
                <Image style={styles.proImg} source={{uri: props.image}} />
            <View style={styles.infoCont}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.price}>$ {props.price.toFixed(2)}</Text>
                <Button color={Colors.secondary} style={styles.btn} title="Details" onPress={props.onPressDetail}/>
                <Button color={Colors.secondary} style={styles.btn} title="Add to Cart"onPress={props.onPressAddCart}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        borderRadius: 10,
        borderWidth: 1,
        elevation: 5,
        height: 200,
        justifyContent: 'space-between',
        width: '90%',
        margin: 5,
        backgroundColor: 'white',
        overflow: 'hidden',
        alignSelf: 'center'
    },
    proImg:{
        width: '50%',
        height: '100%'
    },
    title: {
        fontSize: 20,
        marginVertical: 10
    },
    price: {
        fontSize: 15,
        marginVertical: 10,
        color: '#888'
    },
    btn: {
        margin: 5,
    },
    infoCont: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    }

})

export default ProductItem