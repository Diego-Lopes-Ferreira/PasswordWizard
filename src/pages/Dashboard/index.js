import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons'

import styles from '../../utils/styles';
import Loading from '../../utils/loading';
import { read, storageKey } from '../../utils/api';
import { en, pt } from './words.json';


export default function Login({ navigation }) {
  const words = pt;
  const [loading, set_loading] = useState(true);
  const [data, set_data] = useState();
  const [name, set_name] = useState('');
  const [password, set_password] = useState('');
  
  async function loadData() {
    set_loading(true)
    let rawData = await read();
    if (rawData !== null ) {
      set_data(rawData);
    }
    set_loading(false)
  }
  useEffect(() => {
    loadData()
  }, [])

  async function reset() {
    await AsyncStorage.setItem(storageKey, '');
  }

  
  useEffect(() => {
    if (data !== undefined) {
      set_name(data.user.name)
      set_password(data.user.password)
    }
  }, [data])

  return (
    <View style={styles.screen} >
      <Loading isLoading={loading} />
      <Header 
        gotoCreate={() => navigation.navigate('Create')} 
        gotoConfig={() => navigation.navigate('Config')}
        saveAndExit={() => {
          set_loading(true);
          setTimeout(() => {
            set_loading(false)
          }, 2000)}} 
        locked={loading} 
        username={data? data.user.name : ''}
        greeting={words.header.greeting}
      />
      <ScrollView style={[styles.scrollview, {opacity: loading ? 0.3 : 1}]} >

        <Text style={styles.txtG}>DashBoard</Text>
        <Text style={styles.txtWrong}>Name: {name}</Text>
        <Text style={styles.txtWrong}>Password: {password}</Text>
      </ScrollView>
      <TouchableOpacity onPress={reset} >
        <Text style={styles.txtG}>ZERAR</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Loading')} >
        <Text style={styles.txtG}>Loading</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={loadData} >
        <Text style={styles.txtG}>sla</Text>
      </TouchableOpacity>
    </View>
  );
}


function Header({ username, greeting, locked, saveAndExit, gotoConfig, gotoCreate }) {
  return (
    <View style={styles.header} >
      <View style={styles.slice}>
        <TouchableOpacity style={styles.hBtn} onPress={saveAndExit}>
          <Feather name={locked ? 'lock' : 'unlock'} size={26} color={'#ffffff'} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.slice}>
        <Text style={styles.txtHGreeting} >{greeting}</Text>
        <Text style={styles.txtHUsername} >{username}</Text>
      </View>
      
      <View style={styles.slice}>
        <TouchableOpacity style={styles.hBtn} onPress={gotoCreate}>
          <Feather name='plus' size={26} color={'#ffffff'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.hBtn} onPress={gotoConfig}>
          <Feather name='settings' size={26} color={'#ffffff'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
