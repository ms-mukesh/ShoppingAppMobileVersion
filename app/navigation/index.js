import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Text } from 'react-native';
import 'react-native-gesture-handler';

import authentication from '../navigation/authentication';
import Dashboard from '../navigation/drawer/index';
import CartDetail from '../screen/component/cart/cartDetail';
import CartDetailShopWise from '../screen/component/cart/subCartDetails';
import PlaceDirectOrderScreen from '../screen/component/order/placeDirectOrder';
import PlaceOrder from '../screen/component/order/placeOrder';
import ProductListisng from '../screen/component/Home/productList';
import ProductDetail from '../screen/component/Home/productDetail';
import SplashScreen from '../screen/authentication/splashscreen';

import FilterScreen from '../screen/component/filter/filterPage';
import ShopOwnerRequestScreen from '../screen/component/shops/shopOwnerRequest';
import ShopList from '../screen/component/shops/shopList';
import ShopDetails from '../screen/component/shops/shopDetail';
const Stack = createStackNavigator();
const shopLinking = {
  prefixes: ['http://gabby-acoustics.surge.sh/', 'shoppingproject://'],
};

const App = (props) => {
  console.log('---props from app--', props.props.var_1);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="SplashScreen"
          initialParams={{ productId: props.props.var_1 ?? null }}
          component={SplashScreen}
        />
        <Stack.Screen name="authentication" component={authentication} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="CartDetail" component={CartDetail} />
        <Stack.Screen name="PlaceDirectOrderScreen" component={PlaceDirectOrderScreen} />
        <Stack.Screen name="PlaceOrder" component={PlaceOrder} />
        <Stack.Screen name="ProductListisng" component={ProductListisng} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="CartDetailShopWise" component={CartDetailShopWise} />
        <Stack.Screen name="FilterScreen" component={FilterScreen} />
        <Stack.Screen name="ShopOwnerRequestScreen" component={ShopOwnerRequestScreen} />
        <Stack.Screen
          name="ShopList"
          component={ShopList}
          initialParams={{ fromPopUp: props?.route?.params?.fromPopUp }}
        />
        <Stack.Screen name="ShopDetails" component={ShopDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
