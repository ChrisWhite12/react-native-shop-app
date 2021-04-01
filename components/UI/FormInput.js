import React, { useEffect, useReducer } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'

const INPUT_CHANGE = 'INPUT_CHANGE'
const INPUT_BLUR = 'INPUT_BLUR'

const inputReducer = (state,action) => {
    switch (action.type){
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            }
        case INPUT_BLUR:
            return {
                ...state,
                touched: true
            }

        default:
            return state
        }
    }
    
    const FormInput = props => {
        const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '',
        isValid: props.initialValid,
        touched: false
    })
    
    useEffect(() => {
        if (inputState.touched){
            onInputChange(id, inputState.value, inputState.isValid)
        }
    },[inputState, onInputChange, id])
    
    const handleTextChange = text => {
        // console.log(text)
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (props.required && text.trim().length === 0) {
            isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
            isValid = false;
        }
        if (props.min != null && +text < props.min) {
            isValid = false;
        }
        if (props.max != null && +text > props.max) {
            isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
            isValid = false;
        }
        dispatch({type: INPUT_CHANGE, value: text, isValid: isValid})
    }

    const handleLostFocus = () => {
        dispatch({type: INPUT_BLUR})
    }

    const {onInputChange, id} = props



    return (
        <View style={styles.formField}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput
                {...props}
                style={styles.input}
                value={inputState.value}
                onChangeText={handleTextChange}
                onBlur={handleLostFocus}
            />
            {!inputState.isValid && inputState.touched && (
                <View style={styles.errorCont}>
                    <Text style={styles.errorText}>{props.errorText}</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        margin: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: "#aaa",
    },
    label: {
        margin: 10,
    },
    formField: {
        width: "100%",
    },
    errorCont: {
        marginVertical: 5
    },
    errorText: {
        color: 'red'
    }

})

export default FormInput