import React, {useState, useCallback, useReducer, useEffect} from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Button,
    ActivityIndicator,
    Alert,
} from "react-native";

import {LinearGradient} from 'expo-linear-gradient'
import { useDispatch } from 'react-redux'

import FormInput from "../../components/UI/FormInput";
import Colors from "../../constants/Colors";
import * as authActions from '../../store/actions/auth'

import { PROJECT_API_KEY } from 'react-native-dotenv'

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


const AuthScreen = (props) => {
    const [isSignup, setIsSignup] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    const dispatch = useDispatch();

    const [ formState, formDispatch ] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        }, 
        inputValid: {
            email: false,
            password: false
        }, 
        formIsValid: false,
    })

    const handleInputChange = useCallback(( inputIdentity, inputValue, inputValid ) => {
        formDispatch({
            type: FORM_UPDATE,
            value: inputValue,
            isValid: inputValid,
            input: inputIdentity
        })
    },[formDispatch])


    const handleSignup = async () => {
        setError(null)
        setIsLoading(true)
        try{
            await dispatch(authActions.signup(formState.inputValues.email, formState.inputValues.password))
            //TODO clear fields, password confirm
            setIsSignup(false)
        }
        catch (err){
            console.log('error: ', err)
            setError(err.message)
        }
        setIsLoading(false)
    }

    const handleLogin = async () => {
        setError(null)
        setIsLoading(true)
        try{
            await dispatch(authActions.login(formState.inputValues.email, formState.inputValues.password))
            props.navigation.navigate('Shop')
        }
        catch (err){
            setError(err.message)
            setIsLoading(false)
        }
        
    }

    useEffect(() => {
        if(error) {
            Alert.alert('An error has occured', error, [{text: 'Okay'}])
        }
    },[error])

    return (
        <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={50}
        style={styles.screen}
        >
            <LinearGradient colors={['#ffaaaa','#ffcccc']} style={styles.gradient}>
                <View style={styles.authCont}>
                    <ScrollView>
                        
                        <FormInput 
                            id='email'
                            label='Email'
                            keyboardType='email-address'
                            required
                            email
                            autoCapitalize='none'
                            errorText='Enter valid email'
                            onInputChange={handleInputChange}
                            initialValue=''
                        />
                        <FormInput 
                            id='password'
                            label='Password'
                            keyboardType='default'
                            secureTextEntry
                            required
                            minLength={5}
                            autoCapitalize='none'
                            errorText='Enter valid password'
                            onInputChange={handleInputChange}
                            initialValue=''
                        />
                        { isLoading ? 
                        <ActivityIndicator size="large" />
                        :
                        <View style={styles.btnCont}>
                            <Button title={isSignup ? 'Sign Up' :'Login'} color={Colors.primary} onPress={() => {
                                if(isSignup){
                                    handleSignup()
                                }
                                else{
                                    handleLogin()
                                }
                            }} />
                            <Button title={isSignup ? 'Login':'Register'} color={Colors.secondary} onPress={() => {
                                setIsSignup(prevState => !prevState)
                            }} />
                        </View>}
                    </ScrollView>
                    <Text>{PROJECT_API_KEY}</Text>
                </View>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

AuthScreen.navigationOptions = {
    headerTitle: 'Login'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    authCont: {
        width: '80%',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'white'
    },
    btnCont: {
        marginVertical: 10,
        height: 100,
        justifyContent: "space-between"
    },
    gradient: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
    }
});

export default AuthScreen;
