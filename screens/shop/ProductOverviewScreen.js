import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { ceil } from 'react-native-reanimated'
import { useSelector } from 'react-redux'

const ProductsOverviewScreen = props => {
    const productData = useSelector(state => state.products.availProducts)

    return (
        <View style={styles.screen}>
            <Text>pro - {productData[0].title}</Text>
            <FlatList style={styles.flat1} data={productData} renderItem={(itemData) => 
                <Text style={styles.proText}>{itemData.item.title}</Text>
            }/>
        </View>
    )
}

ProductsOverviewScreen.navigationOptions ={
    headerTitle: 'All Products'
}

const styles = StyleSheet.create({
    screen: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    proText:{
        width: 200,
        height: 100
    },
    flat1: {
        borderWidth: 1,
        width: '95%',
    }
})

export default ProductsOverviewScreen