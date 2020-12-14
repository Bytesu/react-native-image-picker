import React from 'react';
import {StatusBar} from 'react-native';


import FormApp from './form';
import My from './my';
import List from './list';
import {Login} from './page';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {IconConstant, IconCustom,PageNoScroll} from '../../src';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();
function Nav(){
  return <Tab.Navigator
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
    <Tab.Screen name="List" component={List}/>
    <Tab.Screen name="Home1" component={FormApp}/>
    <Tab.Screen name="My" component={My}/>
  </Tab.Navigator>
}
export default function App() {
  return (
    <PageNoScroll>
      <StatusBar
        // hidden={true}
        // barStyle={'light-content'} //两个参数 dark-content 和 light-content,请根据实际情况设置
        // translucent
        backgroundColor="rgba(100, 100, 100, .8)"
      />
      <NavigationContainer>

        <Stack.Navigator
          mode="modal"
        >
          <Stack.Screen name="Login"
                        options={{headerTransparent: true,}}
                        component={Login} />
          <Stack.Screen name="Home" component={Nav} />
        </Stack.Navigator>
      </NavigationContainer>
    </PageNoScroll>
  );
}

