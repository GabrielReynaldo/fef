
import React from 'react';
import { StyleSheet, Text, View, Image, Button,Separator } from 'react-native';

const Separator = () => {
  return <View style={styles.separator} />;
}

class TelaPrincipal extends React.Component {
    render(){
      return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')}
        style={{ width: 420, height: 300 }}>
      </Image>
      <Text style={styles.title}>Loja gabigode</Text>
      <View style={{ marginTop: 70 , fontSize:10}}>

        <Button style={{}}
          
          onPress={() =>this.props.navigation.navigate('Login')}
          title="ENTRAR"
          color="red"
        />

        <Separator />

        <Button
          onPress={''}
          title="AJUDA"
          color="red"
        />

      </View>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    fontFamily: 'algerian',
    fontWeight: 'bold',
    marginTop: 30,
    color: 'red'
  },
  separator: {
    marginVertical: 20,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth
  }

});
export default TelaPrincipal;