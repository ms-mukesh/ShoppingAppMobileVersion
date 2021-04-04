import React, { useEffect, useState } from 'react';
import { AsyncStorage, StyleSheet, Text, View, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { hp, isWEB } from '../../helper/themeHelper';
import { EventRegister } from 'react-native-event-listeners';

import { CommonActions } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import LoginScreen from './login';
import { setUserDetails } from '../../redux/actions/userAuth';
import { app_logo } from '../../assets/images';
import { getCustomerOrder, getMyAddresses } from '../../redux/actions/userActions';
import { getRecentItemList } from '../../redux/actions/homeScreenActions';
import {
  getDeviceToken,
  listenerForNotification,
  requestPermissionForNotification,
} from '../../helper/notificationHelper';
// import {splash_screen_icon} from "../../assets/images";

const ReactNativeSplashScreen = (props) => {
  console.log('---props--- from native', props);
  const [appIsReady, setIsAppReady] = useState(false);
  const { productId } = props.route.params;
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const preventSplashScreen = async () => {
        await SplashScreen.preventAutoHideAsync();
      };
      preventSplashScreen();
    } catch (e) {
      console.warn(e);
    }
    prepareResources();
  }, []);
  const prepareResources = async () => {
    try {
      // await performAPICalls();
      // await downloadAssets();
    } catch (e) {
      console.warn(e);
    } finally {
      await setIsAppReady(true);
      await SplashScreen.hideAsync();
      // this.setState({ appIsReady: true }, async () => {
      //     await SplashScreen.hideAsync();
      // });
    }
  };
  if (appIsReady) {
    return (
      <View style={styles.container}>
        {/*<Text>Welcome</Text>*/}
        <Image source={app_logo} style={{ height: hp(45), width: hp(45) }} />
      </View>
    );
  } else {
    if (!isWEB) {
      SplashScreen.hideAsync();

      AsyncStorage.getItem('userLoginDetail').then(async (res) => {
        const isEnable = await requestPermissionForNotification();
        if (isEnable) {
          listenerForNotification(props.navigation);
        }
        if (res) {
          // alert(JSON.stringify(res))
          if (productId !== null) {
            console.log(productId.toString().substring(1, 25));
            props.navigation.navigate('ProductDetail', {
              // productDetails: res,
              productId: productId.toString().substring(1, productId.toString().length),
              productImage: null,
              price: 0,
              productName: '',
              isFromShareLink: true,
              // productName: res?.name,
            });
          } else {
            dispatch(getCustomerOrder()).then((res) => {});
            dispatch(getMyAddresses()).then((res) => {});
            dispatch(getRecentItemList()).then((res) => {
              if (res) {
              }
            });
            props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Dashboard' }],
              })
            );
          }

          EventRegister.addEventListener('forceLogoutEvent', () => {
            AsyncStorage.removeItem('userLoginDetail');

            props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  { name: 'authentication', params: { fromPopUp: false, productId: productId } },
                ],
              })
            );
          });
          dispatch(setUserDetails(JSON.parse(res)));
        } else {
          console.log('from here---', productId);
          props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                { name: 'authentication', params: { fromPopUp: false, productId: productId } },
              ],
            })
          );
        }
      });
    }
  }
  return (
    <View style={styles.container}>
      <Image source={app_logo} style={{ height: hp(45), width: hp(45) }} />
    </View>
  );
};
export default ReactNativeSplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});
