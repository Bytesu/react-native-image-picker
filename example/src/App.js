import React from 'react';


import FormApp from './form';
import My from './my';
import List from './list';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {IconConstant, IconCustom} from '../../src';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            return <IconCustom name={IconConstant.MENU} color={'tomato'}/>;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={FormApp}/>
        <Tab.Screen name="List" component={List}/>
        <Tab.Screen name="My" component={My}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

