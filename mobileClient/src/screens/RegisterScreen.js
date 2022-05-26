import React, { useState } from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Text } from "react-native-paper"
import Background from "../components/Background"
import Logo from "../components/Logo"
import Header from "../components/Header"
import Button from "../components/Button"
import TextInput from "../components/TextInput"
import BackButton from "../components/BackButton"
import { theme } from "../core/theme"
import { emailValidator } from "../helpers/emailValidator"
import { passwordValidator } from "../helpers/passwordConfirmValidator"
import { nameValidator } from "../helpers/nameValidator"
import Axios from "./../api/axios"
import { passwordConfirmValidator } from "../helpers/passwordValidator copy"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState({ value: "", error: "" })
  const [password, setPassword] = useState({ value: "", error: "" })
  const [feedback, setFeedback] = useState()
  const [passwordConfirmation, setPasswordConfirmation] = useState({
    value: "",
    error: "",
  })

  const onSignUpPressed = async () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const passwordConfirmError = passwordConfirmValidator(
      password.value,
      passwordConfirmation.value
      )
    if (emailError || passwordError || passwordConfirmError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setPasswordConfirmation({
        ...passwordConfirmation,
        error: passwordConfirmError,
      })
      return
    }

    try {
      const {data : createdUserId} =await Axios.post("/user/signUp", {
        email: email.value,
        password: password.value,
      })

      await AsyncStorage.setItem("user", JSON.stringify(createdUserId))
      navigation.reset({
        index: 0,
        routes: [{ name: "Edit" }],
      })
    } catch (error) {
      setFeedback(error.response.data)
    }
  }

  return (
    <View style={styles.container}>
      <BackButton goBack={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "StartScreen" }],
          })
        } />
      <Logo />
      {/* <Header>Create Account</Header> */}
      {/* <TextInput
        label="Username"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      /> */}
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <TextInput
        label="Password confirm"
        returnKeyType="done"
        value={passwordConfirmation.value}
        onChangeText={(text) =>
          setPasswordConfirmation({ value: text, error: "" })
        }
        error={!!passwordConfirmation.error}
        errorText={passwordConfirmation.error}
        secureTextEntry
      />
      {feedback && <Text>{feedback}</Text>}
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },

  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
})
