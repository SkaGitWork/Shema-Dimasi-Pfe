import React, { useState, useEffect, useContext } from "react"
import { View, StyleSheet, TextInput } from "react-native"
import { FontAwesome5 } from "@expo/vector-icons"
import { theme } from "../theme"
import Axios from "../../api/axios"

import { useSelector, useDispatch } from "react-redux"
import { SEARCH_INPUT } from "./../../constants/actionTypes"
import { fetchDoctors } from "./../../redux/actions/chatAction"
import { chatContext } from "../../screens/ContactScreen"

var DbDoctorContactsLowercase
const SearchInput = () => {
  // const chatDoctors = useSelector((state) => state.chat.chatDoctors)
  // const dispatch = useDispatch()
  //  useEffect(() => {
  //    dispatch(fetchDoctors())
  //  }, [inputSearch])

  const {
    inputSearch,
    setInputSearch,
    setSearchResult,
    UnknownDoctor,
  } = useContext(chatContext)


  // set Search Result
  const handleSearch = () => {
    setSearchResult([])

    if (!inputSearch) {
      return 
    }
    UnknownDoctor.map((doctor, key) => {
      let doctorLowercase = doctor.toLowerCase()
      if (doctorLowercase.search(inputSearch.toLowerCase()) > -1)
        setSearchResult((searchResult) => [...searchResult, doctor])
    })
  }

  useEffect(() => {
    if (!inputSearch) {
      setSearchResult([])
    }
    const timer = setTimeout(() => {
      handleSearch()
    }, 1000)

    return () => clearTimeout(timer)
  }, [inputSearch])

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <FontAwesome5
          name="search"
          size={20}
          color={theme.colors.searchIcon}
        ></FontAwesome5>
        <TextInput
          onChangeText={(text) => setInputSearch(text)}
          style={styles.input}
          placeholder="Search"
          maxLength={20}
          value={inputSearch}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  row: {
    backgroundColor: theme.colors.searchBackground,
    flexDirection: "row",
    borderRadius: 10,
    height: 45,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  input: {
    paddingHorizontal: 30,
    fontSize: 15,
    height: 45,
    flex: 1,
    color: theme.colors.searchText,
  },
})

export default SearchInput
