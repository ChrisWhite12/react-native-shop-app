import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/Colors'

import * as authActions from '../store/actions/auth'
import { useDispatch } from 'react-redux';

const StartupScreen = props => {
    const dispatch = useDispatch()

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData')
            if(!userData){
                props.navigation.navigate('Auth')
                return
            }
            const transData = JSON.parse(userData)
            const {token, userId, expDate} = transData

            const savedExpDate = new Date(expDate)
            
            if(savedExpDate <= new Date() || !token || !userId){
                props.navigation.navigate('Auth')
                return
            }

            const expTime = savedExpDate.getTime() - new Date().getTime()

            props.navigation.navigate('Shop')
            dispatch(authActions.authenticate(userId, token, expTime))
        }

        tryLogin()
    },[])

    return (
        <View style={styles.screen}>
            <ActivityIndicator size="large" color={Colors.primary} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default StartupScreen