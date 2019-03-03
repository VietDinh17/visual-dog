import React from 'react';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../screens/CameraScreen';

const RootStack = createStackNavigator({
  Home: HomeScreen,
  Camera: CameraScreen,
},{
  initialRouteName: 'Home'
});


export default RootStack;
