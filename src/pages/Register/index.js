import React, { useState, useEffect } from 'react';
import { 
  AsyncStorage, View, Text, TextInput, TouchableOpacity
} from 'react-native';


import styles from '../../utils/styles';
import { en, pt } from './words.json';
import { storageKey, read } from '../../utils/api';
import initialData from '../../utils/initialData.json';
import Loading from '../../utils/loading';

export default function Login({ navigation }) {
  //AsyncStorage.setItem(storageKey, JSON.stringify(initialData));
  const words = en;
  const [loading, set_loading] = useState(false);
  const [name, set_name] = useState('');
  const [password, set_password] = useState('');
  const [isBig, set_isBig] = useState();
  
  async function register() {
    set_loading(true);
    console.log(name, password)
    let data = initialData;
    data.isFirstUse = false;
    data.user.name = name;
    data.user.password = password;
    console.log(data)
    await AsyncStorage.setItem(storageKey, JSON.stringify(data));
    navigation.navigate('Dashboard');
    //navigation
    /* 
    */
  }

  function handleName(txt) {
    set_isBig(name.length >= 11 ? true : false)
    set_name(txt)
  }
  return (
    <View style={styles.screen} >
      <Loading isLoading={loading} />
      <View style={[styles.registerContainer, {opacity: loading?0.3:1}]}>
          <Text style={styles.txtG}>{words.texts.name}</Text>
          <UserInput ph={words.ph.name} val={name} set_val={handleName} />
            <Text style={isBig ? styles.txtWrong : styles.notShowing}>{words.errors.textBig.text}</Text>
          <Text style={styles.txtG}>{words.texts.password}</Text>
          <UserInput ph={words.ph.password} val={password} set_val={set_password} isPassword />
          <TouchableOpacity style={styles.submit} onPress={register} >
            <Text style={styles.txtG}>{words.texts.button}</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}

function UserInput({ ph, val, set_val, isPassword }) {
  const [isFocused, set_isFocused] = useState(false);
  return (
    <TextInput
      style={ isFocused ? styles.inputFocused : styles.inputBlured}
      value={val}
      autoCapitalize='none'
      placeholder={ph}
      blurOnSubmit={true}
      autoCompleteType='username'
      keyboardType={isPassword ? 'numeric' : 'default'}
      onFocus={() => set_isFocused(true)}
      onBlur={() => set_isFocused(false)}
      blurOnSubmit={true}
      onChangeText={content => set_val(content)}
    />
  );
}

/*
async function create( pwd ) {
  let id = Math.random().toString(32).substr(2, 8);
  while (await checkId( id )) {
    id = Math.random().toString(32).substr(2, 8);
  }
  pwd.id = id;
  var data = await read();
  data.passwords.push( pwd );
  await AsyncStorage.setItem(storageKey, JSON.stringify(data))
  return true
}
*/