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
const EditScreen = () => {
  const [checked, setChecked] = React.useState("first")
  const [modifyToggle, setModifyToggle] = useState(false)
  // const [date, setDate] = useState('09-10-2020');

  const [formData, setFormData] = useState({
    name : "",
    birthday : "",
    weight : "",
    height : "",
    gender: "man",
    smoker: false,
    drinker: false,
    sportive: false,
    cholesterol: false,
    glucose: false,
  })

  const submit = () => {
    return
    Axios.post("user/sendInformations")
      .then((res) => {
        console.log(res.data)
        return res.data
      })
      .catch((err) => {
        console.log(err.response.data)
      })
  }
  useEffect(() => {
    console.log(formData)
  }, [formData])

  const [date, setDate] = useState(moment().format("YYYY-MM-DD"))

  return (
    <View style={styles.container}>

      <TextInput style={{ height: 40 }} label="Name" returnKeyType="next" />

      {radioButtons()}
      <View style={{ flexDirection: "row", alignItems: "center", marginVertical : 5 }}>
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

      <Button mode="contained" onPress={submit}>
        Submit
      </Button>
    </View>
  )

  function radioButtons() {
    return <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text>Man</Text>
      <RadioButton
        value="man"
        status={formData.gender === "man" ? "checked" : "unchecked"}
        onPress={() => setFormData({ ...formData, gender: "man" })} />
      <Text>Woman</Text>
      <RadioButton
        value="woman"
        status={formData.gender === "woman" ? "checked" : "unchecked"}
        onPress={() => setFormData({ ...formData, gender: "woman" })} />
    </View>
  }

  function textInput({ keyboardType, label, value }) {
    return (
      <TextInput
        style={{ height: 40 }}
        keyboardType={keyboardType}
        label={label}
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
        style={{ flex:1 }}
        date={date} //initial date from state
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
            color: 'black',
            
          },
          dateInput: {
            backgroundColor: 'white',
            borderColor: '#00000080'
            
          }
        }}
        onDateChange={(date) => {
          setDate(date)
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
