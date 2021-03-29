import React from 'react'
import { View, Text, StyleSheet, ScrollView, Button, Image }from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Colors from '../../constants/Colors'
import * as cartActions from '../../store/actions/cart'

const ProductDetailsScreen = props => {
    const productId = props.navigation.getParam('productId')
    const selProduct = useSelector(state => state.products.availProducts.find(item => item.id === productId))
    const dispatch = useDispatch()

    return (
        <ScrollView>
            <View style={styles.detailView}>
                <Image style={styles.proImg} source={{uri: selProduct.imageUrl}} />
                <Text style={styles.title}>{selProduct.title}</Text>
                <Text style={styles.price}>{selProduct.price}</Text>
                <View style={styles.btnCont}>
                    <Button color={Colors.secondary} title="Add to Cart" onPress={() => {
                        dispatch(cartActions.addToCart(selProduct));
                    }} />
                </View>
                <Text>{selProduct.description}</Text>
            </View>
        </ScrollView>
    )
}

ProductDetailsScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    }
}

const styles = StyleSheet.create({
    proImg:{
        width: '100%',
        height: 200
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
    btnCont: {
        // width: '60%',
        marginVertical: 10,
        alignItems: 'center'
    },
    detailView: {
        padding: 15
    }
})

export default ProductDetailsScreen