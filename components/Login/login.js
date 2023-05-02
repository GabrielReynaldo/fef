import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image, TouchableOpacity, Text, Separator } from "react-native";
import { Card, TextInput } from "react-native-paper";
import firebase from '../../services/connectionFirebase'

export default function Login({ changeStatus }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('login');

  const Separator = () => {
    return <View style={styles.separator} />;
  };

  function handleLogin() {
    if (type === 'login') {
      // Aqui fazemos o login

      const user = firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
          changeStatus(user.user.uid)

        })
        .catch((err) => {
          console.log(err);
          alert('Email ou senha não cadastrados!');
          return;
        })

    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image
        source={require("../../assets/car.jpg")}
        style={{ width: 370, height: 300 }}

      ></Image>
      <Separator />

      <Card style={{ width: 300 }}>
        <TextInput
          placeholder="Seu Email"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </Card >

      <Separator/>

      <Card style={{ width: 300 }}>
        <TextInput
          placeholder="Sua senha"
          style={styles.input}
          value={password}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
      </Card>

      <Separator />

      <TouchableOpacity
        style={[styles.handleLogin, { backgroundColor: type === 'login' ? '#3ea6f2' : '#141414', }]}
        onPress={handleLogin}
      >
        <Text style={styles.loginText}>
          {type === 'login' ? 'Realizar Login' : 'Cadastrar Novo Usuário'}

        </Text>
      </TouchableOpacity>

      <Separator />
      
      <TouchableOpacity onPress={() => setType(type => type === 'login' ? 'cadastrar' : 'login')} >
        <Text style={{ textAlign: 'center', color: 'white' }}>
          {type === 'login' ? 'Criar uma conta' : 'Já possuo uma conta'}
        </Text>
      </TouchableOpacity>


      <View style={{ marginTop: 0 }}>

      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center"
  },

  title: {
    fontSize: 28,
    textAlign: "center",
    fontFamily: "arial",
    fontWeight: "bold",
    marginTop: 30,
    color: "black",
  },

  separator: {
    marginVertical: 10,


  },

  Card: {
    fontSize: 35,
    textAlign: "center",
    marginTop: 30,
    alignItems: "center"
  },
  handleLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 0.5,
    width: 300
  },
  loginText: {
    color: '#FFF',
    fontSize: 20,
  },
  imput: {
    borderRadius: 5,
    borderWidth: 0.5,
  }



});
