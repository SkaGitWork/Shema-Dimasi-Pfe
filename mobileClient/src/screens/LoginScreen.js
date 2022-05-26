import React, { useEffect, useState } from "react"
import { TouchableOpacity, StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import Background from "../components/Background"
import Logo from "../components/Logo"
import Header from "../components/Header"
import Button from "../components/Button"
import { theme } from "../core/theme"
import { emailValidator } from "../helpers/emailValidator"
import { passwordValidator } from "../helpers/passwordConfirmValidator"
import BackButton from "../components/BackButton"
import TextInput from "../components/TextInput"
import { loginRequest } from "./../api/requests"
import Axios from "./../api/axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: "", error: "" })
  const [password, setPassword] = useState({ value: "", error: "" })
  const [feedback, setFeedback] = useState("")

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }

    Axios.post("/authentification/login", {
      email: email.value,
      password: password.value,
    })
      .then(async (res) => {
        await AsyncStorage.setItem("user", JSON.stringify(res.data))

        navigation.reset({
          index: 0,
          routes: [{ name: "Profile" }],
        })
      })
      .catch((err) => {
        setFeedback(err.response.data)
      })
  }

  const fastLogin = async () => {
    setEmail({ value: "shemadimassi@icloud.com" })
    setPassword({ value: "1111" })
  }

  return (
    <View style={styles.container}>
      <BackButton
        goBack={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "StartScreen" }],
          })
        }
      />
      <Logo />
      {/* <Header>Login</Header> */}
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
      {/* <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ResetPasswordScreen")}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View> */}

      <Text style={{ color: "red" }}>{feedback}</Text>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <Button mode="contained" onPress={fastLogin}>
        Login Test
      </Button>
      {/* <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
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
