import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import TextInput from "../components/TextInput"
import Button from "../components/Button"
import { Checkbox, RadioButton } from "react-native-paper"
import DatePicker from "react-native-datepicker"
// import DatePicker from "react-native-date-picker"
// import DateTimePicker from "@react-native-community/datetimepicker"
import moment from "moment"
import Axios from "../api/axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

const EditScreen = ({ navigation }) => {
  const [feedback, setFeedback] = useState()
  const [formData, setFormData] = useState({})
  console.log(formData)

  useEffect(async () => {
    const currentUser = JSON.parse(await AsyncStorage.getItem("user"))

    const { data: userData } = await Axios.post(`/custom`, {
      scheme: "user",
      method: "get",
      filters: { _id: currentUser._id },
    })

    setFormData({
      name: userData.name || "",
      gender: userData.gender || "",
      birthday: userData.birthday || "",
      weight: userData.weight || "",
      height: userData.height || "",
      smoker: userData.smoker || false,
      drinker: userData.drinker || false,
      sportive: userData.sportive || false,
      cholesterol: userData.cholesterol || false,
      glucose: userData.glucose || false,
    })
  }, [])

  const submit = async () => {
    const currentUser = JSON.parse(await AsyncStorage.getItem("user"))

    Axios.patch("/user/sendInformations", { ...formData, id: currentUser._id })
      .then((res) => {
        setFeedback(res.data)

        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "Profile" }],
          })
        }, 1000)
      })
      .catch((err) => {
        setFeedback(err.response.data)
      })
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={{ height: 40 }}
        label="Name"
        returnKeyType="next"
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
      />

      {radioButtons()}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 5,
        }}
      >
        <Text>Birthday : </Text>
        {datePicker()}
      </View>

      {textInput({ keyboardType: "numeric", label: "Height", value: "height" })}
      {textInput({ keyboardType: "numeric", label: "Weight", value: "weight" })}

      {checkBox({ text: "Smoker ?", value: "smoker" })}
      {checkBox({ text: "Drinker ?", value: "drinker" })}
      {checkBox({ text: "Sportive ?", value: "sportive" })}
      {checkBox({ text: "Cholesterol ?", value: "cholesterol" })}
      {checkBox({ text: "Glucose ?", value: "glucose" })}

      <Text style={{ textAlign: "center" }}>{feedback} </Text>

      <Button mode="contained" onPress={submit}>
        Submit
      </Button>
    </View>
  )

  function radioButtons() {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text>Man</Text>
        <RadioButton
          value="man"
          status={formData.gender === "Man" ? "checked" : "unchecked"}
          onPress={() => setFormData({ ...formData, gender: "Man" })}
        />
        <Text>Woman</Text>
        <RadioButton
          value="woman"
          status={formData.gender === "Woman" ? "checked" : "unchecked"}
          onPress={() => setFormData({ ...formData, gender: "Woman" })}
        />
      </View>
    )
  }

  function textInput({ keyboardType, label, value }) {
    return (
      <TextInput
        style={{ height: 40 }}
        keyboardType={keyboardType}
        label={label}
        value={formData[value]}
        returnKeyType="next"
        onChangeText={(text) => {
          setFormData({ ...formData, [value]: text })
        }}
      />
    )
  }

  function checkBox({ text, value }) {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text> {text} </Text>

        <Checkbox
          status={formData[value] ? "checked" : "unchecked"}
          onPress={() =>
            setFormData({ ...formData, [value]: !formData[value] })
          }
        />
      </View>
    )
  }

  function datePicker() {
    return (
      <DatePicker
        style={{ flex: 1 }}
        date={formData.birthday} //initial date from state
        mode="date" //The enum of date, datetime and time
        placeholder="Birthday"
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: "absolute",
            left: 0,
            top: 4,
            // height: '80%',
          },
          dateInput: {
            marginLeft: 36,
          },
          dateText: {
            color: "black",
          },
          dateInput: {
            backgroundColor: "white",
            borderColor: "#00000080",
          },
        }}
        onDateChange={(date) => {
          setFormData({ ...formData, birthday: date })
        }}
      />
    )
  }
}

export default EditScreen

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

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
