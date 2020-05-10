import React, { useState, useEffect } from 'react';
import { 
  AsyncStorage, View, Text, TextInput, TouchableOpacity, Alert
} from 'react-native';


import styles from '../../utils/styles';
import { pt } from './words.json';
import { storageKey } from '../../utils/api';
import initialData from '../../utils/initialData.json';
import Loading from '../../utils/loading';

export default function Login({ navigation }) {
  const words = pt;
  const [loading, set_loading] = useState(false);
  const [name, set_name] = useState('');
  const [password, set_password] = useState('');
  const [isBig, set_isBig] = useState();
  
  async function saveData() {
    set_loading(true);
    //console.log(name, password);
    //console.log('Aquiiii');
    let data = initialData;
    data.isFirstUse = false;
    data.user.name = name;
    data.user.password = password;
    //console.log(data)
    await AsyncStorage.setItem(storageKey, JSON.stringify(data));
    navigation.replace('Dashboard');
    set_loading(false);
  }

  async function register() {
    if (!isBig) {
      if (name.length > 0) {
        if (password.length > 0) {
          saveData();
        } else {
          console.log(password.length)
          let w = words.errors.noPassword;
          Alert.alert(w.title, w.msg, [{text: w.button}]);
          return
        }
      } else {
        console.log(name.length)
        let w = words.errors.noName;
        Alert.alert(w.title, w.msg, [{text: w.button}]);
        return
      }
    } else {
      let w = words.errors.textBig.alert;
      Alert.alert(w.title, w.msg, [{text: w.button}]);
      return
    }
  }

  useEffect(() => {
    set_isBig(name.length > 10 ? true : false);
  }, [name])
  return (
    <View style={styles.screen} >
      <Loading isLoading={loading} />
      <View style={[styles.registerContainer, {opacity: loading?0.3:1}]}>
          <Text style={styles.txtG}>{words.texts.name}</Text>
          <UserInput ph={words.ph.name} val={name} set_val={set_name} />
          
          <Text style={isBig ? styles.txtWrong : styles.notShowing}>{words.errors.textBig.text}</Text>
          
          <Text style={styles.txtG}>{words.texts.password}</Text>
          <UserInput ph={words.ph.password} val={password} set_val={set_password} isPassword />
          
          <TouchableOpacity style={styles.submit} onPress={register} >
            <Text style={styles.txtG}>{words.texts.button}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submit} onPress={() => console.log(name.length, password.length)} >
            <Text style={styles.txtG}>Testar</Text>
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
