import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'
import styles from '../../utils/styles';

export default function Create() {
  async function createPwd() {}
  async function go_back() {}
  return (
    <View style={styles.screen} >
      <Header
        pwd={{title: 'Create'}}
        create={createPwd}
        go_back={go_back}
      />
      <Body />
      <Text style={styles.txtG}>Create</Text>
    </View>
  );
}

function Header({ pwd, create, go_back }) {
  return (
    <View style={styles.header} >
      <View style={styles.slice}>
        <TouchableOpacity style={styles.hBtn} onPress={go_back}>
          <Feather name={'arrow-left'} size={26} color={'#dbdad5'} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.slice}>
        <Text style={styles.txtHGreeting}>{pwd.title}</Text>
      </View>
      
      <View style={styles.slice}>
        <TouchableOpacity style={styles.hBtn} onPress={create}>
          <Feather name='plus' size={26} color={'#dbdad5'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}


function Body({ pwd }) {
  return (
    <View>
      <View style={styles.sliceWPadd}>
        <Feather name='user' size={26} color='#dbdad5' />
        <Text style={[styles.txtMnormal, {paddingHorizontal: 10, maxWidth: 250}]}>login</Text>
      </View>
      <View style={styles.sliceWPadd}>
        <Feather name='key' size={26} color='#dbdad5' />
        <Text style={[styles.txtMnormal, {paddingHorizontal: 10, maxWidth: 250}]}>password</Text>
      </View>
      <View style={styles.sliceWPadd}>
        <Feather name='mail' size={26} color='#dbdad5' />
        <Text style={[styles.txtMnormal, {paddingHorizontal: 10, maxWidth: 250}]}>email</Text>
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
        <Text style={styles.txtPgrey}>{desc}</Text>
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