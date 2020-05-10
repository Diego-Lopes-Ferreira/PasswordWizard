import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native';

import styles from '../../utils/styles';
import { read, storageKey } from '../../utils/api';

export default function Login() {
  const [data, set_data] = useState();
  const [name, set_name] = useState('');
  const [password, set_password] = useState('');
  
  async function loadData() {
    let rawData = await read();
    if (rawData !== null ) {
      set_data(rawData);
    }
  }

  async function reset() {
    await AsyncStorage.setItem(storageKey, '');
  }
  
  useEffect(() => {
    loadData();
    if (data !== undefined) {
      set_name(data.user.name)
      set_password(data.user.password)
    }
    
  }, [data])

  return (
    <View style={styles.screen} >
      <Text style={styles.txtG}>DashBoard</Text>
      <Text style={styles.txtWrong}>Name: {name}</Text>
      <Text style={styles.txtWrong}>Password: {password}</Text>
      <TouchableOpacity onPress={reset} >
        <Text style={styles.txtG}>ZERAR</Text>
      </TouchableOpacity>
    </View>
  );
}
