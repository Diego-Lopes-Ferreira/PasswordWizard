import React from 'react';
import { Text, View } from 'react-native';

import styles from '../../utils/styles';
import LoadingIcon from '../../utils/loading';

export default function Loading() {
  return (
    <View style={styles.screen} >
      <View style={{width: '100%', top: 100}}>
        <Text style={styles.txtTitle} >Loading</Text>
      </View>
      <LoadingIcon isLoading={true} />
    </View>
  );
}
