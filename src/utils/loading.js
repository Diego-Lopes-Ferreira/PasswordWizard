import React, { useState, useEffect } from 'react';
import { Animated, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './styles';

export default function Loading({ isLoading }) {
  const [loading, set_loading] = useState(false);
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

  useEffect(() => {
    set_loading(isLoading)
  }, [isLoading])
  
  return (
    <View style={[{flex: 1, justifyContent: 'center', alignItems: 'center',}, loading ? {display: 'flex', position: 'absolute'}:{display: 'none'}]}>
      <Animated.View style={loadingStyle}>
        <Feather name='loader' size={40} color='#ffffff'/>
      </Animated.View>
    </View>
  );
}
