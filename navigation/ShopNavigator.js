import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Colors from '../constants/Colors'
import ProductsOverviewScreen from '../screens/shop/ProductOverviewScreen'


const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Colors.primary
        }
    }
})

export default createAppContainer(ProductsNavigator)