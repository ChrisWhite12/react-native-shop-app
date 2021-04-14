import React, { useEffect, useRef } from 'react'
import ShopNavigator from './ShopNavigator'
import { NavigationActions } from 'react-navigation'

import { useSelector } from 'react-redux'

const NavigationContainer = props => {
    const isAuth = useSelector(state => !!state.auth.token)
    const navRef = useRef()

    useEffect(() => {
        if(!isAuth){
            navRef.current.dispatch(NavigationActions.navigate({
                routeName: 'Auth'
            }))
        }
    },[isAuth])

    return (
        <ShopNavigator ref={navRef} />
    )
}


export default NavigationContainer