import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput, Alert } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch, useSelector } from 'react-redux'

import HeaderButton from '../../components/UI/HeaderButton'

import * as productActions from '../../store/actions/products'

const EditProductsScreen = props => {
    const prodId = props.navigation.getParam('productId')

    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId))


    const [title, setTitle] = useState(editedProduct ? editedProduct.title :'')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState(editedProduct ? editedProduct.description :'')
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : 'https://placekitten.com/g/300/300')

    const dispatch = useDispatch()

    const handleSubmit = useCallback(() => {
        if(editedProduct){
            dispatch(productActions.updateProduct(prodId,title,description,imageUrl))
        } 
        else{
            dispatch(productActions.createProduct(title,description,price,imageUrl))
        }
        props.navigation.goBack()
    }, [dispatch, prodId, title, description, price])

    useEffect(() => {
        props.navigation.setParams({'submit': handleSubmit})
    },[handleSubmit])

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formField}>
                    <Text style={styles.label} >Title</Text>
                    <TextInput style={styles.input} value={title} onChangeText={text => setTitle(text)}/>
                </View>
                {editedProduct ? null : 
                <View style={styles.formField}>
                    <Text style={styles.label} >Price</Text>
                    <TextInput style={styles.input} value={price} keyboardType='number-pad' onChangeText={text => setPrice(text)}/>
                </View>}
                <View style={styles.formField}>
                    <Text style={styles.label} >Description</Text>
                    <TextInput style={styles.input} value={description} onChangeText={text => setDescription(text)}/>
                </View>
            </View>
        </ScrollView>
    )
}

EditProductsScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit')
    return {
        headerTitle: navData.navigation.getParam('productId') ? "Edit Product" : "Add Product",
        headerRight: (() => <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='add' iconName={'md-checkmark'} onPress={ submitFn } />
            </HeaderButtons>)
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        margin: 10,
        paddingVertical: 5,
        borderWidth: 2,
        borderColor: '#aaa'
    },
    label: {
        margin: 10
    },
    formField: {
        width: '100%'
    },
    form: {
        width: '100%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10
    }
})

export default EditProductsScreen