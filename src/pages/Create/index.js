import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from "../../utils/styles";
import { pt, en } from "./words.json";
import { create, read } from "../../utils/api";

export default function Create({ navigation }) {
  const [words, set_lang] = useState(pt);
  const [title, set_title] = useState("");
  const [description, set_description] = useState("");
  const [login, set_login] = useState("");
  const [password, set_password] = useState("");
  const [email, set_email] = useState("");

  async function createPwd() {
    let data = {
      title: title,
      description: description,
      login: login,
      password: password,
      email: email,
    };
    console.log(data);
    await create(data);
    navigation.goBack();
  }
  async function go_back() {
    let w = words.errors.notSaved;
    Alert.alert(w.title, w.msg, [
      {
        text: w.buttonY,
        onPress: createPwd,
      },
      {
        text: w.buttonAny,
        onPress: () => navigation.goBack(),
      },
    ]);
  }
  useEffect(() => {
    async function sla() {
      let data = await read();
      set_lang(data.user.lang === "pt" ? pt : en);
    }
    sla();
  }, []);
  useEffect(() => {}, [words]);
  return (
    <View style={styles.screen}>
      <Header pwd={words.title} create={createPwd} go_back={go_back} />
      <View
        style={[
          styles.container,
          {
            paddingBottom: 20,
          },
        ]}
      >
        <ScrollView>
          <BodyInput
            type="bookmark"
            val={title}
            setVal={set_title}
            ph={words.ph.title}
          />
          <BodyInput
            type="file-text"
            val={description}
            setVal={set_description}
            ph={words.ph.description}
            multiline={true}
          />
          <BodyInput
            type="user"
            val={login}
            setVal={set_login}
            ph={words.ph.login}
            isemail={true}
          />
          <BodyInput
            type="key"
            val={password}
            setVal={set_password}
            ph={words.ph.password}
            ispwd={true}
          />
          <BodyInput
            type="mail"
            val={email}
            setVal={set_email}
            ph={words.ph.email}
            isemail={true}
          />
        </ScrollView>
      </View>
      <View
        style={{
          flex: 1,
        }}
      ></View>
    </View>
  );
}

function Header({ pwd, create, go_back }) {
  return (
    <View style={styles.header}>
      <View style={styles.slice}>
        <TouchableOpacity style={styles.hBtn} onPress={go_back}>
          <Feather name={"arrow-left"} size={26} color={"#dbdad5"} />
        </TouchableOpacity>
      </View>
      <View style={styles.slice}>
        <Text style={styles.txtHGreeting}> {pwd} </Text>
      </View>
      <View style={styles.slice}>
        <TouchableOpacity style={styles.hBtn} onPress={create}>
          <Feather name="plus" size={26} color={"#dbdad5"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function BodyInput({ setVal, isemail, ispwd, type, ph, multiline }) {
  const [isFocused, set_focus] = useState(false);
  const [newValue, set_newValue] = useState("");
  return (
    <View style={styles.sliceWPadd}>
      <Feather name={type} size={26} color="#dbdad5" />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "90%",
        }}
      >
        <TextInput
          style={isFocused ? styles.inputFocused : styles.inputBlured}
          height={multiline ? 52 : 26}
          onChangeText={(text) => {
            set_newValue(text);
            setVal(text);
          }}
          value={newValue}
          blurOnSubmit={true}
          onFocus={() => set_focus(true)}
          onBlur={() => set_focus(false)}
          keyboardType={
            ispwd ? "visible-password" : isemail ? "email-address" : "default"
          }
          placeholder={ph}
          multiline={multiline}
        />
      </View>
    </View>
  );
}
