import React, { useState, useEffect } from 'react';
import { 
  View, Text, TouchableOpacity, AsyncStorage, ScrollView, Alert, TextInput, Switch
} from 'react-native';
import { Feather } from '@expo/vector-icons'

import styles from '../../utils/styles';
import Loading from '../../utils/loading';
import { read, storageKey } from '../../utils/api';
import { en, pt } from './words.json';

export default function Config({ navigation }) {
  const [words, set_lang] = useState(pt);
  const [loading, set_loading] = useState(true);
  const [saved, set_saved] = useState(false);
  const [data, set_data] = useState();
  const [isBig, set_isBig] = useState();


  const [name, set_name] = useState('');
  const [password, set_password] = useState('');

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
    loadData()
  }, [])

  async function reset() {
    let w = words.reset.alert;
    Alert.alert(w.title, w.msg, [
      {text: w.buttonY, 
        onPress: async () => {
          await AsyncStorage.setItem(storageKey, '')
          navigation.replace('Register')
        }},
      {text: w.buttonN},
    ])
  }

  async function saveConfig() {
    if (data !== undefined) {
      if (!isBig) {
        data.user.name = name;
        data.user.password = password;
        data.user.lang = words === pt ? 'pt' : 'en';
        await AsyncStorage.setItem(storageKey, JSON.stringify(data));
        navigation.goBack()
      } else {
        let w = words.errors.textBig.alert;
        Alert.alert(w.title, w.msg, [{text: w.button}])
      }
    }
    await set_saved(true)
  }
  async function goBack() {
    if (saved) {
      let w = words.errors.saved.alert;
      let msg = w.msg + data.user.password;
      Alert.alert(w.title, msg, [{text: w.button}])
      navigation.goBack()
    } else {
      let w = words.errors.notSaved.alert;
      Alert.alert(w.title, w.msg, [
        {text: w.buttonS, onPress: async () => {
          await saveConfig()
          let w = words.errors.saved.alert;
          let msg = w.msg + data.user.password;
          Alert.alert(w.title, msg, [{text: w.button}]);
          
        }},
        {text: w.buttonY, onPress: () => navigation.goBack()},
        {text: w.buttonN}
      ])
    }
  }

  
  useEffect(() => {
    if (data !== undefined) {
      set_name(data.user.name);
      set_password(data.user.password);
    }
  }, [data])

  useEffect(() => {
    set_isBig(name.length > 10 ? true : false);
  }, [name])

  return (
    <View style={styles.screen} >
      <Loading isLoading={loading} />
      <Header
        text={words.header.text}
        saveConfig={saveConfig}
        goBack={goBack}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={[styles.svSettings, {opacity: loading ? 0.3 : 1}]}>
        <ConfigurationInput
          type='user'
          ph={words.ph.name}
          value={name}
          setVal={set_name}
        />
        <Text style={isBig ? styles.txtWrong : styles.notShowing}>{words.errors.textBig.text}</Text>
        <ConfigurationInput
          type='key'
          ph={words.ph.password}
          value={password}
          setVal={set_password}
        />
        <LangSwitch lang={words} change={() => {set_lang(words === pt ? en : pt)}} />
        <TouchableOpacity style={styles.hBtn} onPress={reset} >
          <Text style={styles.txtWarning}>{words.reset.text}</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.slice}>
      </View>
    </View>
  );
}

function Header({ text, goBack, saveConfig }) {
  return (
    <View style={styles.header} >
      <View style={styles.slice}>
        <TouchableOpacity style={styles.hBtn} onPress={goBack}>
          <Feather name='arrow-left' size={26} color={'#dbdad5'} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.slice}>
        <Text style={styles.txtHGreeting} >{text}</Text>
      </View>
      
      <View style={styles.slice}>
        <TouchableOpacity style={styles.hBtn} onPress={saveConfig}>
          <Feather name='check' size={26} color={'#dbdad5'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ConfigurationInput({ type, ph, value, setVal }) {
  const [focused, set_focused] = useState(false);
  return (
    <View style={styles.sliceSettingsLang}>
      <Feather name={type} size={32} color={'#dbdad5'} />
      <View style={{width: '90%'}}>
        <TextInput
          style={focused ? styles.inputFocused : styles.inputBlured}
          placeholder={ph}
          value={value}
          onChangeText={text => {
            setVal(text)
          }}
          onFocus={() => set_focused(true)}
          onBlur={() => set_focused(false)}
          keyboardType={type == 'key' ? 'numeric' : 'default'}
        />
      </View>
    </View>
  );
}

function LangSwitch({ change, lang }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    change();
  }

  useEffect(() => {
    setIsEnabled(lang === pt ? false : true);
  }, [lang])

  return (
    <View style={styles.sliceSettingsLang}>
      <Text style={styles.txtMnormal}>{!isEnabled ? 'Linguagem:' : 'Language:'}</Text>
      <Text style={styles.txtLangPt}>Portuguese</Text>
      <Switch
        trackColor={{ false: "#ff4466", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#dbdad5" : "#dbdad5"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Text style={styles.txtLangEn}>English</Text>
    </View>
  );
}
