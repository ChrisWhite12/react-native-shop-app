import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import CartItem from "../../components/shop/CartItem";
import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";
import * as orderActions from "../../store/actions/orders";

const CartScreen = (props) => {
    const dispatch = useDispatch();
    const cartTotal = useSelector((state) => state.cart.costTotal);
    const cartItems = useSelector((state) => {
        const outputCartItems = [];
        for (const key in state.cart.items) {
        outputCartItems.push({
            productId: key,
            productTitle: state.cart.items[key].productTitle,
            productPrice: state.cart.items[key].productPrice,
            quantity: state.cart.items[key].quantity,
            sum: state.cart.items[key].sum,
        });
        }
        return outputCartItems.sort((a, b) => (a.productId > b.productId ? 1 : -1));
    });

    return (
        <View style={styles.screen}>
        <View style={styles.cartLabels}>
            <Text>Item</Text>
            <Text>Qty</Text>
            <Text>Price</Text>
            <Text>Delete</Text>
        </View>
        <View style={styles.flatCont}>
            <FlatList
            data={cartItems}
            keyExtractor={(item) => item.productId}
            renderItem={(itemEl) => {
                return (
                <CartItem
                    productTitle={itemEl.item.productTitle}
                    productPrice={itemEl.item.productPrice}
                    quantity={itemEl.item.quantity}
                    deleteable={true}
                    onRemove={() => {
                    dispatch(cartActions.removeFromCart(itemEl.item.productId));
                    }}
                />
                );
            }}
            />
        </View>
        <View style={styles.summaryCont}>
            <Text style={styles.totalText}>
            Total: $<Text>{Math.round(cartTotal.toFixed(2)* 100) / 100}</Text>          
            </Text>
            <Button
            title="Order Now"
            color={Colors.secondary}
            disabled={cartItems.length === 0}
            onPress={() => {
                dispatch(orderActions.addOrder(cartItems, cartTotal))
            }}
            />
        </View>
        </View>
    );
};

CartScreen.navigationOptions = {
    headerTitle: 'Your Cart'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    flatCont: {
        height: "60%",
        width: "90%",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        padding: 10,
    },
    summaryCont: {
        width: "90%",
        height: "30%",
    },
    totalText: {
        fontSize: 25,
        marginVertical: 20,
    },
    cartLabels: {
        width: "70%",
        height: "10%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});

export default CartScreen;
