import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import styles from '../../utils/styles';

export default function Login() {
  const [data, set_data] = useState();
  async function loadData() {
    let rawData = await read();
    if (rawData !== null ) {
      set_data(rawData);
    }
  }
  
  useEffect(() => {loadData();}, [navigation])

  useEffect(() => {
    
  }, [data])

  return (
    <View style={styles.screen} >
      <Text style={styles.txtG}>Login</Text>
    </View>
  );
}
