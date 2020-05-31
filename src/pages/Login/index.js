import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

import styles from '../../utils/styles';
import { read } from '../../utils/api';
import { pt, en } from './words.json';

export default function Login({ navigation }) {
  const [data, set_data] = useState({});
  const [words, set_lang] = useState('pt')
  const [loading, set_loading] = useState(true);
  const [password, set_password] = useState('');
  const [focused, isFocused] = useState(false);

  async function loadData() {
    set_loading(true);
    let rawData = await read();
    if (rawData !== null ) {
      set_data(rawData);
      set_lang(rawData.user.lang === 'pt' ? pt : en);
    }
  }
  
  useEffect(() => {
    loadData();
  }, [navigation])

  useEffect(() => {
    if (data !== undefined) {
      set_loading(false);
    }
  }, [data])

  async function handleLogin() {
    if (password !== '' && data !== undefined) {
      if (password === data.user.password) {
        navigation.replace('Dashboard');
      } else {
        let w = words.error.alert;
        Alert.alert(w.title, w.msg, [{title: w.button, onPress: () => set_password('')}]);
      }
    }
  }

  return (
    <View style={styles.screen} >
      <Text style={[styles.txtG, {textAlign: 'center', paddingHorizontal: 10, paddingBottom: 50}]}>{words.greeting}</Text>
      <TextInput
        style={focused ? styles.inputFocused : styles.inputBlured}
        value={password}
        keyboardType='numeric'
        onFocus={() => isFocused(true)}
        onBlur={() => isFocused(false)}
        onChangeText={text => set_password(text)}
      />
      <TouchableOpacity style={styles.submit} onPress={() => handleLogin()}>
        <Text style={styles.txtG}>{words.submit}</Text>
      </TouchableOpacity>
    </View>
  );
}
