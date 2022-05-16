import React, { useState, useEffect } from "react"
import { View, StyleSheet } from "react-native"
import SearchInput from "../components/common/SearchInput"
import Conversations from "../components/Conversations"

import store from "../redux/store"
// import { Provider } from "react-redux"
import { createContext } from "react"
import Axios from "../api/axios"

export const chatContext = createContext(null)
const ConversationsScreen = () => {
  const [inputSearch, setInputSearch] = useState("")

  const [searchResult, setSearchResult] = useState([])
  const [fetchedContacts, setFetchedContacts] = useState([])
  const [fetchedDoctors, setFetchedDoctors] = useState([])
  const [UnknownDoctor, setUnknownDoctor] = useState([])

  useEffect(async () => {
    setFetchedContacts(
      await Axios.get(
        `/user/getDoctorContacts?username=${global.patient}`
      ).then((res) => {
        return res.data
      })
    )

    setFetchedDoctors(
      await Axios.get("/user/getDoctors").then((res) => {
        return res.data
      })
    )
  }, [])

  useEffect(() => {
    setUnknownDoctor(fetchedDoctors.filter((n) => !fetchedContacts.includes(n)))
  }, [fetchedContacts, fetchedDoctors])

  const handleDelete = (username) => {
    Axios.delete("/user/delete/doctorFromContacts", {
      data: { username: global.patient, doctor: username },
    })
      .then((res) => {
        setFetchedContacts(fetchedContacts.filter((item) => item !== username))
        setUnknownDoctor([...UnknownDoctor, username])
      })
      .catch((err) => {
        console.log(err.response.data)
      })
  }

  const handleAddToContact = (username) => {
    Axios.post("/user/addDoctorToContact", {
      username: global.patient || "Patient 1",
      doctor: username,
    })
      .then((res) => {
        setInputSearch("")

        setUnknownDoctor(UnknownDoctor.filter((item) => item !== username))
        setFetchedContacts([...fetchedContacts, username])
      })
      .catch((err) => {
        console.log(err.response.data)
      })
  }

  return (
    <View style={styles.container}>
      {/* <Provider store={store}> */}
      <chatContext.Provider
        value={{
          handleDelete,
          UnknownDoctor,
          fetchedDoctors,
          fetchedContacts,
          inputSearch,
          setInputSearch,
          searchResult,
          setSearchResult,
          handleAddToContact,
        }}
      >
        <Conversations>
          <SearchInput />
        </Conversations>
      </chatContext.Provider>

      {/* </Provider> */}
    </View>
  )
}

export default ConversationsScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dff4f5",
  },
})
