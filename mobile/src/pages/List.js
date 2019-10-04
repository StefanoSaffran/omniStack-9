import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { SafeAreaView, AsyncStorage, ScrollView, Image, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png'

const List = ({ navigation }) => {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user')
      .then(user_id => {
        const socket = socketio('http://192.168.0.185:3003', {
          query: { user_id }
        })

        socket.on('booking_response', booking => {
          console.log(booking);
          Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`)
        })
      })

  }, []);

  useEffect(() => {
    AsyncStorage.getItem('techs')
      .then(returnedTechs => {
        const techsArray = returnedTechs.split(',').map(tech => tech.trim());
        setTechs(techsArray);
      });
  }, [])

  const handleLogout = () => {
    AsyncStorage.getAllKeys()
      .then(keys => AsyncStorage.multiRemove(keys))
      .then(() => navigation.navigate('Login'))
  }

  const rows = techs.map(tech => (
    <SpotList key={tech} tech={tech} />
  ))

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <ScrollView>
        {rows}
      </ScrollView>
      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  logo: {
    height: 44,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10
  },

  button: {
    height: 42,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2
  },

  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default List