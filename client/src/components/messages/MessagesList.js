import React, { useState,useEffect, useRef } from "react";
import { ScrollView } from "react-native";

import Message from "./Message";

import { theme } from "../theme";
import Axios from './../../api/axios';

const MessagesList = ({ onSwipeToReply, username, messages }) => {

	const scrollView = useRef()
	
	// Scroll Down
 useEffect(async () => {
   scrollView.current.scrollToEnd({ animated: true })
 }, [messages])
	
  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.white, flex: 1 }}
      ref={(ref) => (scrollView.current = ref)}
    >
      {messages.map((message, index) => (
        <Message
          key={index}
          time={message.createdAt?.substring(11, 16)}
          isLeft={message.from !== global.patient || "Patient 1"}
          message={message.text}
          onSwipe={onSwipeToReply}
        />
      ))}
    </ScrollView>
  )
}
export default MessagesList
