import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import ProjectApp from './app/navigation';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import MainReducer from './app/redux/reducer';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { AsyncStorage } from 'react-native';
import * as Font from 'expo-font';
import storage from 'redux-persist/lib/storage';
import { isANDROID, isWEB } from './app/helper/themeHelper';
const PERSIST_CONFIG = {
  key: 'root',
  storage: isWEB ? storage : AsyncStorage,
};

const PERSIST_REDUCER = persistReducer(PERSIST_CONFIG, MainReducer);
const STORE = createStore(PERSIST_REDUCER, applyMiddleware(thunk));
let PERSIST_STORE = persistStore(STORE);
const App = (props) => {
  console.log('main props--', props);
  return (
    <>
      <StatusBar style="auto" />
      {isWEB ? (
        <Provider store={STORE}>
          <ProjectApp />
        </Provider>
      ) : (
        <Provider store={STORE}>
          <PersistGate loading={null} persistor={PERSIST_STORE}>
            <ProjectApp props={props} />
          </PersistGate>
        </Provider>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;
