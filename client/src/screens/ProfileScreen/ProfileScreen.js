import React, { useEffect, useState } from "react"
import { View, Text, Button, StyleSheet, Modal } from "react-native"
import ChangePasswordModal from "./ChangePasswordModal"
import Axios from "./../../api/axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

const ProfileScreen = ({ navigation }) => {
  const [fetchedUserData, setFetchedUserData] = useState()
  const [user, setUser] = useState()

  useEffect(async () => {
    setUser(JSON.parse(await AsyncStorage.getItem("user")))
  }, [])

  useEffect(async () => {
    user && setFetchedUserData(await Axios.get(`/user/fetch/${user.id}`))
  }, [user])

  const fetchUserData = async () => {}

  return (
    <View style={styles.container}>
      <Text style={styles.InfoText}>Nom d'utilisateur : {user?.username} </Text>

      <View style={styles.thresholdContainer}>
        <Text style={styles.InfoText}>
          Date d'anniversaire : {user?.birthday}{" "}
        </Text>
        <Text style={styles.InfoText}>
          Numéro de téléphone : {user?.phone}{" "}
        </Text>
        <Text style={styles.InfoText}>Adresse : {user?.address} </Text>
        <Text style={styles.InfoText}>Cité : {user?.city} </Text>
        <Text style={styles.InfoText}>CIN : {user?.cin} </Text>
      </View>

      <ChangePasswordModal user={user} />
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  InfoText: {
    margin: 10,
    textAlign: "center",
  },

  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#dff4f5",
  },
})
