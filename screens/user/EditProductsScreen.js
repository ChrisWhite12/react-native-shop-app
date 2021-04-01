import React, { useCallback, useEffect, useState, useReducer } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    Alert,
    KeyboardAvoidingView,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../components/UI/FormInput";

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
        let updatedFormValid = true
        for (const key in updatedValid){
            updatedFormValid = updatedFormValid && updatedValid[key]
        }
        return {
            formIsValid: updatedFormValid,
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
    const editedProduct = useSelector(state =>
        state.products.userProducts.find(prod => prod.id === prodId)
    );
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
                productActions.updateProduct(
                    prodId, 
                    formState.inputValues.title, 
                    formState.inputValues.description, 
                    formState.inputValues.imageUrl
                )
            );
        } else {
            dispatch(
                productActions.createProduct(
                    formState.inputValues.title, 
                    formState.inputValues.description, 
                    +formState.inputValues.price, 
                    formState.inputValues.imageUrl
                )
            );
        }
        props.navigation.goBack();
    }, [dispatch, prodId, formState]);

    const handleInputChange = useCallback(( inputIdentity, inputValue, inputValid ) => {
        formDispatch({
            type: FORM_UPDATE,
            value: inputValue,
            isValid: inputValid,
            input: inputIdentity
        })
    },[formDispatch])

    useEffect(() => {
        props.navigation.setParams({ submit: handleSubmit });
    }, [handleSubmit])

    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior='padding' keyboardVerticalOffset={150}>
            <ScrollView>
            <View style={styles.form}>
                <FormInput
                    id='title'
                    label="Title"
                    errorText="Enter valid title"
                    returnKeyType="next"
                    autoCapitalize="sentences"
                    initialValue={editedProduct ? editedProduct.title : ''}
                    initialValid={!!editedProduct}
                    required
                    onInputChange={handleInputChange}
                />
                {editedProduct ? null : (
                    <FormInput
                        id='price'
                        label="Price"
                        errorText="Enter valid price"
                        keyboardType="decimal-pad"
                        returnKeyType="next"
                        required
                        min={0.01}
                        onInputChange={handleInputChange}
                    />
                )}
                <FormInput
                    id='description'
                    label="Description"
                    errorText="Enter valid description"
                    returnKeyType="next"
                    autoCapitalize="sentences"
                    multiline
                    numberofLInes={3}
                    initialValue={editedProduct ? editedProduct.description : ''}
                    initialValid={!!editedProduct}
                    required
                    minLength={5}
                    onInputChange={handleInputChange}
                />
                <FormInput
                    id='imageUrl'
                    label="Image Url"
                    errorText="Enter valid url"
                    returnKeyType="done"
                    autoCapitalize="sentences"
                    initialValue={editedProduct ? editedProduct.imageUrl : ''}
                    initialValid={!!editedProduct}
                    required
                    minLength={5}
                    onInputChange={handleInputChange}
                />
            </View>
            </ScrollView>
        </KeyboardAvoidingView>
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
    form: {
        width: "100%",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
    },
});

export default EditProductsScreen;
