import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/Login/login';
import Cadastro from '../pages/Cadastro/cadastro';
import Home from '../pages/Home/home';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
