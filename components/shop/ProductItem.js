import React from 'react'
import { View, Text, StyleSheet, Image, Button } from 'react-native'
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler'
import Colors from '../../constants/Colors'

const ProductItem = props => {
    return (
        <View style={styles.item}>
                <Image style={styles.proImg} source={{uri: props.image}} />
            <View style={styles.infoCont}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.price}>$ {props.price}</Text>
                <View style={styles.btnCont}>
                    {props.children}
                </View>
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
        fontSize: 15,
        marginVertical: 5
    },
    price: {
        fontSize: 10,
        marginVertical: 5,
        color: '#888'
    },
    infoCont: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    btnCont: {
        flex: 1,
        justifyContent: 'space-around'
    }

})

export default ProductItem