import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Colors from '../constants/Colors'

import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen'
import ProductsOverviewScreen from '../screens/shop/ProductOverviewScreen'


const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailsScreen
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Colors.primary
        }
    }
})

export default createAppContainer(ProductsNavigator)