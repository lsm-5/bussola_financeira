import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

import Details from '../pages/Details';
import Historic from '../pages/Historic';

const App = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const TabRoutes: React.FC = () => (
  <Tab.Navigator initialRouteName="Details">
    <Tab.Screen name="Details" component={Details} />
    <Tab.Screen name="Historic" component={Historic} />
  </Tab.Navigator>
);

const AppRoutes: React.FC = () => (
  <App.Navigator screenOptions={{headerShown: false}}>
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="Profile" component={Profile} />
    <App.Screen name="DetailsAndHistoric" component={TabRoutes} />
  </App.Navigator>
);

export default AppRoutes;
