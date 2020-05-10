import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import styles from '../../utils/styles';

export default function Create() {
  const [data, set_data] = useState();
  const [name, set_name] = useState('');
  async function loadData() {
    let rawData = await read();
    if (rawData !== null ) {
      set_data(rawData);
    }
  }

  useEffect(() => {
    loadData();
    if (data !== undefined) {
      set_name(data.user.name);
    }
  }, [data])

  return (
    <View style={styles.screen} >
      <Text style={styles.txtG}>Loogin</Text>
      <Text style={styles.txtWrong}>{name}</Text>
    </View>
  );
}
