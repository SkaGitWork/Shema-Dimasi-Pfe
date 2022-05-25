import React, { useEffect, useState } from "react"
import { ScrollView, View, Text, StyleSheet } from "react-native"
import TextInput from "./../components/TextInput"
import Button from "./../components/Button"
import {
  Avatar,
  Checkbox,
  Chip,
  DataTable,
  RadioButton,
} from "react-native-paper"
import DatePicker from "react-native-datepicker"
// import DatePicker from "react-native-date-picker"
// import DateTimePicker from "@react-native-community/datetimepicker"
import moment from "moment"
import Axios from "./../api/axios"
import { globalStyles } from "../core/globalStyles"
import ModalEcg from "./component/ModalEcg"
import AsyncStorage from "@react-native-async-storage/async-storage"

const HomeScreen = ({ navigation }) => {
  const [fetchedUserData, setFetchedUserData] = useState({})

  useEffect(async () => {
    const currentUser = JSON.parse(await AsyncStorage.getItem("user"))
    console.log(currentUser)

    const { data: userData } = await Axios.post(`/custom`, {
      scheme: "user",
      method: "get",
      filters: { _id: currentUser._id },
    })

    setFetchedUserData({
      name: userData.name || "Please choose a name.",
      gender:
        userData.gender || "Please choose a gender.",
      birthday: userData.birthday || "Please choose a birthday.",
      weight: userData.weight || "Please choose a weight.",
      height: userData.height || "Please choose a height.",
      smoker: false,
      drinker: false,
      sportive: false,
      cholesterol: false,
      glucose: false,
    })
  }, [])

  return (
    <ScrollView style={styles.container}>
      <View style={{ padding: 10 }}>
        <View style={globalStyles.profileFlex1}>
          <Avatar.Icon size={50} icon="account" />
          <Text style={globalStyles.profileText1}>{fetchedUserData.name}</Text>
        </View>
        <View style={globalStyles.profileFlex1}>
          <Avatar.Icon size={50} icon="gender-male-female" />
          <Text style={globalStyles.profileText1}>
            {fetchedUserData.gender }
          </Text>
        </View>
        <View style={globalStyles.profileFlex1}>
          <Avatar.Icon size={50} icon="cake" />
          <Text style={globalStyles.profileText1}>
            {fetchedUserData.birthday}
          </Text>
        </View>
        <View style={globalStyles.profileFlex1}>
          <Avatar.Icon size={50} icon="weight" />
          <Text style={globalStyles.profileText1}>
            {fetchedUserData.weight}
          </Text>
        </View>
        <View style={globalStyles.profileFlex1}>
          <Avatar.Icon size={50} icon="human-male-height" />
          <Text style={globalStyles.profileText1}>
            {fetchedUserData.height}
          </Text>
        </View>
        <View style={globalStyles.profileFlex1}>
          <Avatar.Icon size={50} icon="smoking-off" />
          <Text style={globalStyles.profileText1}>
            {fetchedUserData.smoker ? "Smoker" : "Non-smoker"}
          </Text>
        </View>
        <View style={globalStyles.profileFlex1}>
          <Avatar.Icon size={50} icon="glass-flute" />
          <Text style={globalStyles.profileText1}>
            {fetchedUserData.drinker ? "Drinker" : "Non-Drinker"}
          </Text>
        </View>
        <View style={globalStyles.profileFlex1}>
          <Avatar.Icon size={50} icon="basketball" />
          <Text style={globalStyles.profileText1}>
            {fetchedUserData.sportive ? "Sportive" : "Non-Sportive"}
          </Text>
        </View>
        <View style={globalStyles.profileFlex1}>
          <Avatar.Icon size={50} icon="cube-outline" />
          <Text style={globalStyles.profileText1}>
            {fetchedUserData.glucose ? "Glucose" : "No Glucose"}
          </Text>
        </View>
        <View style={globalStyles.profileFlex1}>
          <Avatar.Icon size={50} icon="shaker-outline" />
          <Text style={globalStyles.profileText1}>
            {fetchedUserData.cholesterol ? "Cholesterol" : "No Cholesterol"}
          </Text>
        </View>
      </View>

      <ModalEcg />

      {/* <Chip  style={{marginVertical: 10}} textStyle={{fontSize: 20}} icon="rename-box">{fetchedUserData.name} </Chip>
      <Chip icon="gender-male-female">
        {fetchedUserData.gender === "man" ? "Man" : "Woman"}{" "}
      </Chip>
      <Chip icon="cake">{fetchedUserData.birthday} </Chip>
      <Chip icon="weight">{fetchedUserData.weight} </Chip>
      <Chip icon="human-male-height">{fetchedUserData.height} </Chip>
      <Chip icon="smoking-off">
        {fetchedUserData.smoker ? "Smoker" : "Non-smoker"}{" "}
      </Chip>
      <Chip icon="glass-flute">
        {fetchedUserData.drinker ? "Drinker" : "Non-Drinker"}{" "}
      </Chip>
      <Chip icon="basketball">
        {fetchedUserData.sportive ? "Sportive" : "Non-Sportive"}{" "}
      </Chip>
      <Chip icon="cube-outline">
        {fetchedUserData.glucose ? "Glucose" : "Non-Glucose"}{" "}
      </Chip>
      <Chip icon="shaker-outline">
        {fetchedUserData.cholesterol ? "Cholesterol" : "Non-Cholesterol"}{" "}
      </Chip> */}

      {/* <Button mode="contained" onPress={submit}>
        Submit
      </Button> */}
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // height: 500,
    // paddingBottom: 50,
    // width: "100%",
    // maxWidth: 340,
    // alignSelf: "center",
    // alignItems: "center",
    // justifyContent: "center",
  },
})
