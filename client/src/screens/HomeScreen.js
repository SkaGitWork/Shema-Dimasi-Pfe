import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import TextInput from "./../components/TextInput"
import Button from "./../components/Button"
import { Avatar, Checkbox, Chip, DataTable, RadioButton } from "react-native-paper"
import DatePicker from "react-native-datepicker"
// import DatePicker from "react-native-date-picker"
// import DateTimePicker from "@react-native-community/datetimepicker"
import moment from "moment"
import Axios from "./../api/axios"
import { globalStyles } from "../core/globalStyles"

const HomeScreen = () => {
  const [fetchedUserData, setFetchedUserData] = useState({
    name: "Ska",
    birthday: "12/12/2000",
    weight: "1.9kg",
    height: "19m",
    smoker: false,
    drinker: false,
    sportive: false,
    cholesterol: false,
    glucose: false,
    gender: "woman",
  })
  useEffect(() => {
    // setFetchedUserData((await Axios.get(`/user/getInformations`)).data)
  }, [])

  return (
    <View style={styles.container}>
      <View  style={globalStyles.profileFlex1}>
        <Avatar.Icon size={50} icon="account" />
        <Text  style={globalStyles.profileText1}>{fetchedUserData.name}</Text>
      </View>
      <View  style={globalStyles.profileFlex1}>
        <Avatar.Icon size={50} icon="gender-male-female" />
        <Text  style={globalStyles.profileText1}>{fetchedUserData.gender === "man" ? "Man" : "Woman"}</Text>
      </View>
      <View  style={globalStyles.profileFlex1}>
        <Avatar.Icon size={50} icon="cake" />
        <Text  style={globalStyles.profileText1}>{fetchedUserData.birthday}</Text>
      </View>
      <View  style={globalStyles.profileFlex1}>
        <Avatar.Icon size={50} icon="weight" />
        <Text  style={globalStyles.profileText1}>{fetchedUserData.weight}</Text>
      </View>
      <View  style={globalStyles.profileFlex1}>
        <Avatar.Icon size={50} icon="human-male-height" />
        <Text  style={globalStyles.profileText1}>{fetchedUserData.height}</Text>
      </View>
      <View  style={globalStyles.profileFlex1}>
        <Avatar.Icon size={50} icon="smoking-off" />
        <Text  style={globalStyles.profileText1}>{fetchedUserData.smoker ? "Smoker" : "Non-smoker"}</Text>
      </View>
      <View  style={globalStyles.profileFlex1}>
        <Avatar.Icon size={50} icon="glass-flute" />
        <Text  style={globalStyles.profileText1}>{fetchedUserData.drinker ? "Drinker" : "Non-Drinker"}</Text>
      </View>
      <View  style={globalStyles.profileFlex1}>
        <Avatar.Icon size={50} icon="basketball" />
        <Text  style={globalStyles.profileText1}>{fetchedUserData.sportive ? "Sportive" : "Non-Sportive"}</Text>
      </View>
      <View  style={globalStyles.profileFlex1}>
        <Avatar.Icon size={50} icon="cube-outline" />
        <Text  style={globalStyles.profileText1}>{fetchedUserData.glucose ? "Glucose" : "No Glucose"}</Text>
      </View>
      <View  style={globalStyles.profileFlex1}>
        <Avatar.Icon size={50} icon="shaker-outline" />
        <Text  style={globalStyles.profileText1}>{fetchedUserData.cholesterol ? "Cholesterol" : "No Cholesterol"}</Text>
      </View>

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
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
    // alignItems: "center",
    // justifyContent: "center",
  },
})
