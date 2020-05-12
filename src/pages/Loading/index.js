import React, { useEffect, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import styles from '../../utils/styles';

export default function Loading() {
  //const [load, set_load] = useState();
  //useEffect(() => {set_load(true)}, [])

  const spinValue = new Animated.Value(0);
  Animated.loop(
    Animated.timing(spinValue, {
    toValue: 1,
    duration: 2000,
    useNativeDriver: true
  })).start()
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })
  const loadingStyle = {
    justifyContent: 'center', 
    alignItems: 'center', 
    transform: [{rotate: spin}]
  }

  return (
    <View style={styles.screen} >
      <Animated.View style={loadingStyle}>
        <Feather name='loader' size={40} color='#ffffff'/>
      </Animated.View>
      <View style={{width: '100%', top: 100}}>
        <Text style={styles.txtTitle} >Loading</Text>
      </View>
    </View>
  );
}
