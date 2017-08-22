/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage, Alert
} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import AuthScreen from './screens/AuthScreen'
import WelcomeScreen from './screens/WelcomeScreen'
import MapScreen from './screens/MapScreen'
import DeckScreen from './screens/DeckScreen'
import SettingScreen from './screens/SettingScreen'
import ReviewScreen from './screens/ReviewScreen'

import {Provider} from 'react-redux'
import store from './store/index'


export default class ReactNavigation extends Component {

  render() {

    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen : AuthScreen },
      main: {
        screen: TabNavigator({
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review: {
            screen: StackNavigator({
              review: { screen: ReviewScreen },
              settings: { screen: SettingScreen}
            })
          }
        },
        {
          
          tabBarOptions: {
            labelStyle: { fontSize: 12 },
            showIcon: true
          },
          swipeEnabled: false,
          animationEnabled: false,
          
        }
      )
      }
    },
    {
      navigationOptions : {
        tabBarVisible: false
      },
      lazy: true
    });


    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('ReactNavigation', () => ReactNavigation);
