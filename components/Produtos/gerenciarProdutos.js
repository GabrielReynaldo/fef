import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Separator, Keyboard, FlatList, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-paper';
import firebase from '../../services/connectionFirebase';
import Listagem from '../Listar/listagem';

export default function GerenciarProdutos() {
    const [nome, setNome] = useState('');
    const [marca, setMarca] = useState('');
    const [valor, setValor] = useState('');
    const [cor, setCor] = useState('');
    const [key, setKey] = useState('');
    const [carros, setCarros] =useState([]);//array dos dados cadastraodos
    const [loading, setLoading] =useState(true);
    const inputRef = useRef(null)

    //metodo para verificar se é inserção ou alteração
    async function verificarInsertUpdate() {
        //editar dados
        if (nome !== '' & marca !== '' & valor !== '' & cor !== '' & key !== '') {
            firebase.database().ref('carros').child(key).update({
                nome: nome, marca: marca, valor: valor, cor: cor
            })
            Keyboard.dismiss();
            alert('Carro Editado!');
            limparDados();
            setKey('');
            return;
        }
        //cadastrar dados
        let carros = await firebase.database().ref('carros');
        let chave = carros.push().key;

        carros.child(chave).set({
            nome: nome,
            marca: marca,
            valor: valor,
            cor: cor
        });

        alert('Carro Cadastrado!');
        limparDados();
    }

    //metodo para apagar os dados digitados
    function limparDados() {
        setNome(''); setMarca(''); setValor(''); setCor('');
    }
    //metodo para deletar
    function handleDelete(key) {
        firebase.database().ref('carros').child(key).remove()
          .then(() => {
            const findCarros = carros.filter(item => item.key !== key)
            setCarros(findCarros)
          })
      }
    
      function handleEdit(data) {
          setKey(data.key),
          setNome(data.nome),
          setMarca(data.marca),
          setValor(data.valor),
          setCor(data.cor)
      }
      useEffect(() => {

        async function dados() {
    
          await firebase.database().ref('carros').on('value', (snapshot) => {
            setCarros([]);
    
            snapshot.forEach((chilItem) => {
              let data = {
                key: chilItem.key,
                nome: chilItem.val().nome,
                marca: chilItem.val().marca,
                valor: chilItem.val().valor,
                cor: chilItem.val().cor,
              };
              //atualiza o flatlist de acorsdo com os novos dados
              setCarros(oldArray => [...oldArray, data].reverse());
            })
            setLoading(false);
          })
        }
        dados();
      }, []);

    const Separator = () => {
        return <View style={styles.separator} />;
    }
    return (
        <View style={styles.container}>
            <Separator />
            <TextInput
                placeholder='Nome Produto'
                maxLength={40}
                style={styles.input}
                underlineColorAndroid="transparent"
                onChangeText={(texto) => setNome(texto)}
                value={nome}
                ref={inputRef}
            />
            <Separator />

            <TextInput
                placeholder='Marca'
                style={styles.input}
                underlineColorAndroid="transparent"
                onChangeText={(texto) => setMarca(texto)}
                value={marca}
                ref={inputRef}
            />
            <Separator />

            <TextInput
                placeholder='0,00'
                style={styles.input}
                underlineColorAndroid="transparent"
                onChangeText={(texto) => setValor(texto)}
                value={valor}
                ref={inputRef}
            />
            <Separator />

            <TextInput
                placeholder='Cor'
                style={styles.input}
                underlineColorAndroid="transparent"
                onChangeText={(texto) => setCor(texto)}
                value={cor}
                ref={inputRef}
            />
            <Separator />
            <TouchableOpacity onPress={verificarInsertUpdate}
                style={styles.button}
                activeOpacity={0.5}>
                <View style={styles.buttonIconSeparatorStyle} />
                <Text style={styles.buttonTextStyle}>
                    Enviar
                </Text>
            </TouchableOpacity>
            <View>
                <Text style={styles.listar}>Listagem de Carros</Text>
            </View>

            {loading ?
                (
                    <ActivityIndicator color="#121212" size={45} />
                ) :
                (
                    <FlatList
                        keyExtractor={item => item.key}
                        data={carros}
                        renderItem={({ item }) => (
                            <Listagem data={item} deleteItem={handleDelete}
                                editItem={handleEdit} />
                        )}
                    />
                )
            }
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfcfc'
    },

    texto: {
        fontSize: 15,
        color: 'red',

    },

    input: {
        borderWidth: 1,
        borderColor: 'black',
        height: 30,
        fontSize: 15,
        borderRadius: 10,
        margin: 5,

    },

    icon: {
        position: 'absolute',
        right: 10,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#485a96',
        borderWidth: 0.5,
        borderColor: '#fff',
        height: 40,
        borderRadius: 5,
        margin: 5,
    },
    buttonImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
    },
    buttonTextStyle: {
        color: '#fff',
        marginBottom: 4,
        margin: 'auto',
        fontSize: 20
    },
    buttonIconSeparatorStyle: {
        backgroundColor: '#fff',
        width: 1,
        height: 40,
    },
    listar: {
        fontSize: 20,
        textAlign: 'center'
    },
    View: {

    },
    separator: {
        marginVertical: 10,

    }

});