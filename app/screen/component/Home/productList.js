import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { GoBackHeader, GradientBackground, Loading } from '../../common';
import { hp, wp, normalize, color } from '../../../helper/themeHelper';


const ProductListScreen = (props) => {
  const isLoading = useSelector((state) => state.appDefaultSettingReducer.isLoading);
  const { data } = props.route.params;
  const moveToProductDetailPage = (productId = 0, image = null, price = 0, name = '') => {
    // console.log("data--", {
    //   // productDetails: res,
    //   productId: productId,
    //   productImage: image,
    //   price: price,
    //   productName: name,
    //   isFromShareLink : false
    //   // productName: res?.name,
    // })
    //
    // alert(JSON.stringify({
    //   // productDetails: res,
    //   productId: productId,
    //   productImage: image,
    //   price: price,
    //   productName: name,
    //   isFromShareLink : false
    //   // productName: res?.name,
    // }))
    props.navigation.navigate('ProductDetail', {
      // productDetails: res,
      productId: productId,
      productImage: image,
      price: price,
      productName: name,
      isFromShareLink : false
      // productName: res?.name,
    });
  };

  const renderProductList = ({ item, index }) => {
    return (
      <View key={index + 'DEJ'} style={[style.mainView]}>
        <TouchableOpacity
          // activeOpacity={0.8}
          onPress={() => {
            moveToProductDetailPage(item?.product, item?.image, item?.price, item?.name);
          }}
        >
          <Image resizeMode={'contain'} style={style.productImage} source={{ uri: item?.image }} />
        </TouchableOpacity>
        <Text
          numberOfLines={1}
          style={[style.bottomTextStyle, { width: wp(30), textAlign: 'center' }]}
        >
          {item?.price}
        </Text>
      </View>
    );
  };
  return (
    <GradientBackground>
      {isLoading && <Loading isLoading={isLoading} />}
      <GoBackHeader title={'Product'} onMenuPress={() => props.navigation.goBack()} />
      <FlatList
        numColumns={2}
        horizontal={false}
        data={data}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}
        renderItem={renderProductList}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={{ height: hp(2) }} />
    </GradientBackground>
  );
};
const style = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: hp(2),
    marginLeft: wp(3),
    paddingTop: hp(1),
    paddingLeft: wp(2),
    paddingRight: wp(2),
    paddingBottom: hp(1),
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: color.white,
    // backgroundColor: 'red',
    borderRadius: hp(2),
  },
  productImage: {
    height: hp(25),
    width: wp(38),
    borderRadius: hp(2),

    // borderRadius:hp(1),
    // alignSelf:'center'
  },

  titleTextStyle: {
    fontSize: normalize(14),
    fontWeight: '700',
    color: color.themeBtnColor,
  },
  bottomTextStyle: {
    marginTop: hp(1),
    fontSize: normalize(12),
    fontWeight: '700',
    color: color.themeBtnColor,
  },
});

export default ProductListScreen;
