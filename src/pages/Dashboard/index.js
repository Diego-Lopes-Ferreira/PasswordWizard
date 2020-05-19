import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, AsyncStorage, Animated, FlatList, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons'

import styles from '../../utils/styles';
import Loading from '../../utils/loading';
import { read, delelteById, storageKey } from '../../utils/api';
import { en, pt } from './words.json';


export default function Dashboard({ navigation }) {
  const [words, set_lang] =  useState(pt);
  const [loading, set_loading] = useState(true);
  const [data, set_data] = useState();
  const [name, set_name] = useState('');
  
  async function loadData() {
    set_loading(true)
    let rawData = await read();
    if (rawData !== null ) {
      set_data(rawData);
      set_lang(rawData.user.lang === 'pt' ? pt : en);
    }
    set_loading(false)
  }

  useEffect(() => {
    const listen = navigation.addListener('focus', () => {
      loadData()
    })
  }, [navigation])

  useEffect(() => {
    if (data !== undefined) {
      set_name(data.user.name)
    }
  }, [data])

  function delItem(id) {
    let w = words.delItem;
    Alert.alert(w.title, w.msg, [
      {text: w.buttonY, onPress: async () => {
        await delelteById(id)
        loadData();
      }},
      {text: w.buttonN},
    ]);
  }

  async function saveAndExit() {
    set_loading(true);
    await setTimeout(async () => {
      await AsyncStorage.setItem(storageKey, JSON.stringify(data));
    }, 500);
    navigation.replace('Login')
  }

  return (
    <View style={styles.screen} >
      <Loading isLoading={loading} />
      <Header 
        gotoCreate={() => navigation.navigate('Create')} 
        gotoConfig={() => navigation.navigate('Config')}
        saveAndExit={saveAndExit} 
        locked={loading} 
        username={data? data.user.name : ''}
        greeting={words.header.greeting}
      />
      <FlatList
        style={[styles.scrollview, {opacity: loading ? 0.3 : 1}]}
        data={data ? data.passwords : []}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <Container 
              pwd={item} 
              delItem={() => delItem(item.id)} 
              gotoEdit={() => navigation.navigate('Edit', {id: item.id})} />
            )
          }}
      />

      <View style={styles.slice}>
        <TouchableOpacity onPress={loadData} >
          <Text style={styles.txtPgrey}>{words.refresh}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


function Header({ username, greeting, locked, saveAndExit, gotoConfig, gotoCreate }) {
  return (
    <View style={styles.header} >
      <View style={styles.slice}>
        <TouchableOpacity style={styles.hBtn} onPress={saveAndExit}>
          <Feather name={locked ? 'lock' : 'unlock'} size={26} color={'#dbdad5'} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.slice}>
        <Text style={styles.txtHGreeting} >{greeting}</Text>
        <Text style={styles.txtHUsername} >{username}</Text>
      </View>
      
      <View style={styles.slice}>
        <TouchableOpacity style={styles.hBtn} onPress={gotoCreate}>
          <Feather name='plus' size={26} color={'#dbdad5'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.hBtn} onPress={gotoConfig}>
          <Feather name='settings' size={26} color={'#dbdad5'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Container({ pwd, delItem, gotoEdit }) {
  
  const [opened, set_opened] = useState(false);

  function TopBar({ title, isOpen, openClose, edit, delItem }) {

    const input = new Animated.Value(isOpen ? 0 : 1);

    useEffect(() => {
      Animated.timing(input, {
        toValue: isOpen ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }).start()
    }, [isOpen])

    const output = input.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    })

    const rotateStyle = {transform: [{rotate: output}]}

    return (
      <View style={styles.sliceOutside}>
        <Text style={[styles.txtMnormal, {maxWidth: 200}]}>{title}</Text>
        <View style={styles.slice}>
          <TouchableOpacity style={styles.hBtn} onPress={delItem}>
            <Feather name='trash-2' size={26} color='#ff4466' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.hBtn} onPress={edit}>
            <Feather name='edit' size={26} color='#dbdad5' />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.hBtn, rotateStyle]} onPress={openClose}>
            <Feather name='chevron-down' size={26} color='#dbdad5' />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  function Description({ desc }) {
    return (
      <View>
        <Text style={[styles.txtPgrey, {maxWidth: '100%'}]}>{desc}</Text>
      </View>
    );
  }
  function ShowHide({ isOpen, login, password, email }) {
    const opacityOut = new Animated.Value(isOpen ? 0 : 1);
    useEffect(() => {
      Animated.timing(opacityOut, {
        toValue: isOpen ? 1 : 0,
        duration: 400,
        useNativeDriver: true,
      }).start()
    }, [isOpen])
    //, opacity: opacityOut
    return (
      <Animated.View style={isOpen ? {display: 'flex', opacity: opacityOut} : {display: 'none'}}>
        <View style={styles.sliceWPadd}>
          <Feather name='user' size={26} color='#dbdad5' />
          <Text style={[styles.txtMnormal, {paddingHorizontal: 10, maxWidth: 250}]}>{login}</Text>
        </View>
        <View style={styles.sliceWPadd}>
          <Feather name='key' size={26} color='#dbdad5' />
          <Text style={[styles.txtMnormal, {paddingHorizontal: 10, maxWidth: 250}]}>{password}</Text>
        </View>
        <View style={styles.sliceWPadd}>
          <Feather name='mail' size={26} color='#dbdad5' />
          <Text style={[styles.txtMnormal, {paddingHorizontal: 10, maxWidth: 250}]}>{email}</Text>
        </View>
      </Animated.View>
    );
  }
  /* colors={['#0f021b', '#fc1e27']}
  start={{x: 0, y: 1}}
  end={{x: 1, y: 0}}
  style={styles.container} */
  return (
    <View
      style={styles.container}
    >

      <TopBar
        title={pwd.title}
        isOpen={opened}
        openClose={() => set_opened(!opened)}
        edit={gotoEdit}
        delItem={delItem}
        />
      <Description
        desc={pwd.description}
        />
      <ShowHide
        isOpen={opened}
        login={pwd.login}
        password={pwd.password}
        email={pwd.email}
        />
    </View>
  );
}
