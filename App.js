
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import productsReducer from './store/reducers/products'
import cartReducer from './store/reducers/cart'
import orderReducer from './store/reducers/orders'

import ShopNavivagtor from './navigation/ShopNavigator'

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: orderReducer
})

const store = createStore(rootReducer, composeWithDevTools())

export default function App() {
  return (
    <Provider store={store}>
      <ShopNavivagtor />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// import { LogBox } from "react-native";

// LogBox.ignoreLogs([
//   "Your project is accessing the following APIs from a deprecated global rather than a module import: Constants (expo-constants).",
// ]);