package com.shoppingproject;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

import expo.modules.splashscreen.singletons.SplashScreen;
import expo.modules.splashscreen.SplashScreenImageResizeMode;

public class MainActivity extends ReactActivity {
    private Bundle mInitialProps = null;
    SharedPreferences sharedpreferences;
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
      sharedpreferences = getSharedPreferences("MyPrefs", Context.MODE_PRIVATE);


      Intent intent = new Intent("com.shoppingproject");
      intent.addCategory(Intent.CATEGORY_DEFAULT);
      intent.addCategory(Intent.CATEGORY_BROWSABLE);
      Bundle bundle = new Bundle();
      bundle.putString("msg_from_browser", "Launched from Browser");
      intent.putExtras(bundle);
      Bundle parametros = getIntent().getExtras();
      if (parametros != null){
          String name = parametros.getString("content");
          mInitialProps = new Bundle();
          if (name!=null )
          {
//              mInitialProps.putString("nativeValue", name+"");
              SharedPreferences.Editor editor = sharedpreferences.edit();
              editor.putString("name", name);
              editor.commit();
              Log.d("shoppingproject-->", name);

//              WritableMap map = Arguments.createMap();
//              map.putString("nativeValue", name);
//              map.putString("key1", "Value1");
//
//              try {
//                  getReactInstanceManager().getCurrentReactContext()
//                          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//                          .emit("customEventName", map);
//
//              } catch (Exception e){
//                  Log.e("ReactNative", "Caught Exception: " + e.getMessage());
//              }
          }
              //do whatever you have to
              //...
          }
      else{
          //no extras, get over it!!
      }


      Log.d("shoppingproject-->", intent.toUri(Intent.URI_INTENT_SCHEME));
    // SplashScreen.show(...) has to be called after super.onCreate(...)
    // Below line is handled by '@expo/configure-splash-screen' command and it's discouraged to modify it manually
    SplashScreen.show(this, SplashScreenImageResizeMode.CONTAIN, ReactRootView.class, false);
  }



    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "main";
    }

    protected Bundle getLaunchOptions() {
        return mInitialProps;
    }



    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected Bundle getLaunchOptions() {
                Bundle parametros = getIntent().getExtras();
                if(parametros!=null){
                    String name = parametros.getString("content");
                    mInitialProps = new Bundle();
                    if(name!=null){
                        Bundle initialProperties = new Bundle();
                        initialProperties.putString("var_1",name);
                        return initialProperties;
                    } else {
                        return null;
                    }
                } else {
                    return null;
                }
            }
            @Override
            protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(MainActivity.this);
            }
        };
    }
}
