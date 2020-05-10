// React
import React, { useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Pages
import Loading from './src/pages/Loading';

import Register from './src/pages/Register';

import Login from './src/pages/Login';
import Dashboard from './src/pages/Dashboard';
import Create from './src/pages/Create';
import Edit from './src/pages/Edit';

// Aplication
import { read, storageKey } from './src/utils/api';
import initialData from './src/utils/initialData.json';

const Stack = createStackNavigator();


export default function App() {
  const [firstUse, set_firstUse] = useState();
  const [loading, set_loading] = useState(true);
  
  async function open() {
    try {
      let { isFirstUse } = await read();
      console.log(isFirstUse)
      await set_firstUse(isFirstUse);
      set_loading(false);
      console.log('First use: try');
    } catch (err) {
      await set_firstUse(initialData.isFirstUse);
      console.log('First use: catch');
      //console.log(firstUse);
      //initialData.isFirstUse = false;
      //await AsyncStorage.setItem(storageKey, JSON.stringify(initialData));
      set_loading(false);
    }
    console.log(firstUse);
  }
  useEffect(() => {
    open();
  }, [])

  if (loading) {
    return <Loading />;
  } else {
    return (
      <NavigationContainer >
        <Stack.Navigator initialRouteName={firstUse?'Register':'Dashboard'} headerMode='none' >
          <Stack.Screen name='Register' component={Register} />
          <Stack.Screen name='Dashboard' component={Dashboard} />
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Create' component={Create} />
          <Stack.Screen name='Edit' component={Edit} />
        </Stack.Navigator>  
    </NavigationContainer>
    );
}}


function Root() {
  return (
    <Stack.Navigator initialRouteName='Dashboard' headerMode='none' >
    </Stack.Navigator>
  );
}
