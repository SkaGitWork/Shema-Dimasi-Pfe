import React, { useEffect } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import {View, StyleSheet} from 'react-native'


export default function StartScreen({ navigation }) {

  return (
    <View  style={styles.container}>
      <Logo />
      {/* <Header>ECG Care</Header> */}
      <Paragraph>
        Welcome!
      </Paragraph>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Login
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Sign Up
      </Button>
    </View>
  )
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: "red",
  },
  // backgroundColor: theme.colors.surface,
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})