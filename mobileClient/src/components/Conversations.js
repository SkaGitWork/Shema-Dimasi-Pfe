import React, { useContext, useEffect, useState } from "react"
import { ScrollView, Text, View } from "react-native"
import ConversationItem from "./ConversationItem"
import Axios from "./../api/axios"
import { chatContext } from "../screens/ContactScreen"

// var doctors
const Conversations = ({ children: searchBar }) => {
  const { inputSearch, searchResult, fetchedContacts } = useContext(chatContext)

  return (
    <ScrollView>
      {/* Search bar */}
      {searchBar}

      <Text style={{ textAlign: "center", fontSize: 20, marginBottom: 10 }}>
        {inputSearch ? "Ajouter des contacts" : "Vos contacts"}
      </Text>
      {(inputSearch ? searchResult : fetchedContacts).map((doctor, key) => (
        <ConversationItem
          picture="https://images.pexels.com/photos/2078265/pexels-photo-2078265.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          username={doctor}
          key={key}
        />
      ))}
    </ScrollView>
  )
}

export default Conversations
