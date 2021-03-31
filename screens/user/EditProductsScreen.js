import React, { useCallback, useEffect, useState, useReducer } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    Alert,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";

import HeaderButton from "../../components/UI/HeaderButton";

import * as productActions from "../../store/actions/products";


const FORM_UPDATE = 'FORM_UPDATE'
const formReducer = (state, action) => {
    if(action.type === FORM_UPDATE){
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const updatedValid = {
            ...state.inputValid,
            [action.input]: action.isValid
        }
        let formIsValid = true
        for (const key in updatedValid){
            formIsValid = formIsValid && updatedValid[key]
        }
        return {
            formIsValid,
            inputValid:  updatedValid,
            inputValues: updatedValues
        }
    }
    else{
        return state
    }
}


const EditProductsScreen = (props) => {
    const prodId = props.navigation.getParam("productId");
    const dispatch = useDispatch();

    const [ formState, formDispatch ] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : "",
            imageUrl: editedProduct ? editedProduct.imageUrl : "",
            description: editedProduct ? editedProduct.description : "",
            price: ''
        }, 
        inputValid: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false
        }, 
        formIsValid: editedProduct ? true : false,
    })

    const handleSubmit = useCallback(() => {
        if(!formState.formIsValid){
            Alert.alert('Wrong input', 'Enter valid information', [{text: 'OK'}])
            return
        }

        if (editedProduct) {
            dispatch(
                productActions.updateProduct(prodId, formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl)
            );
        } else {
            dispatch(
                productActions.createProduct(formState.inputValues.title, formState.inputValues.description, +formState.inputValues.price, formState.inputValues.imageUrl)
            );
        }
        props.navigation.goBack();
        


    }, [dispatch, prodId, formState]);

    const handleTextChange = ( inputIdentify, text ) => {
        let isValid = false
        if(text.trim().length === 0){
            isValid = true
        }
        formDispatch({type: FORM_UPDATE, value: text, isValid: isValid, inputTrig: title})
        setTitle(text)
    }

    useEffect(() => {
        props.navigation.setParams({ submit: handleSubmit });
    }, [handleSubmit]);

    return (
        <ScrollView>
        <View style={styles.form}>
            <View style={styles.formField}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.input}
                    value={formState.inputValues.title}
                    autoCapitalize="sentences"
                    autoCorrect={true}
                    onChangeText={() => {
                        handleTextChange('title')
                    }}
                    returnKeyType = 'next'
                />
                {!formState.inputValues.titleValid && <Text>Enter valid title</Text>}
            </View>
            {editedProduct ? null : (
            <View style={styles.formField}>
                <Text style={styles.label}>Price</Text>
                <TextInput
                style={styles.input}
                value={formState.inputValues.price}
                keyboardType="decimal-pad"
                onChangeText={() => {
                    handleTextChange('price')
                }}
                returnKeyType = 'next'
                />
            </View>
            )}
            <View style={styles.formField}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={styles.input}
                    value={formState.inputValues.description}
                    autoCapitalize="sentences"
                    autoCorrect={true}
                    onChangeText={() => {
                        handleTextChange('description')
                    }}
                    returnKeyType = 'done'
                />
            </View>
        </View>
        </ScrollView>
    );
};

EditProductsScreen.navigationOptions = (navData) => {
    const submitFn = navData.navigation.getParam("submit");
    return {
        headerTitle: navData.navigation.getParam("productId")
        ? "Edit Product"
        : "Add Product",
        headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="add" iconName={"md-checkmark"} onPress={submitFn} />
        </HeaderButtons>
        ),
    };
    };

    const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        margin: 10,
        paddingVertical: 5,
        borderWidth: 2,
        borderColor: "#aaa",
    },
    label: {
        margin: 10,
    },
    formField: {
        width: "100%",
    },
    form: {
        width: "100%",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
    },
});

export default EditProductsScreen;
