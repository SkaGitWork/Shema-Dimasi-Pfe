import React, { useState, useEffect } from "react"
import { View } from "react-native";

import ChatHeader from "../components/messages/ChatHeader";
import ChatInput from "../components/messages/ChatInput";
import MessagesList from "../components/messages/MessagesList";
import Axios from './../api/axios';

const MessagesScreen = ({ navigation, route }) => {
	const { username, bio, picture, isBlocked, isMuted } = route.params;
	const [reply, setReply] = useState("");
	const [isLeft, setIsLeft] = useState();
	const [render, setRender] = useState(false)
	const [messages, setMessages] = useState([])
	
	// Fetch Conversation messages 
	useEffect(async () => {
     setMessages(
       await Axios.get(
         `/chat/getConversation?from=${
           global.patient || "Patient 1"
         }&to=${username}`
       ).then((res) => {
         return res.data
       })
     )
   }, [username, render])

	const swipeToReply = (message, isLeft) => {
		setReply(message.length > 50 ? message.slice(0, 50) + '...' : message);
		setIsLeft(isLeft);
	};

	const closeReply = () => {
		setReply("");
	};

	return (
    <View style={{ flex: 1 }}>
      <ChatHeader
        onPress={() => {}}
        username={username}
        picture={picture}
        onlineStatus={"Online"}
      />
      <MessagesList
        onSwipeToReply={swipeToReply}
        username={username}
        messages={messages}
      />
      <ChatInput
        reply={reply}
        setRender={setRender}
        isLeft={isLeft}
        closeReply={closeReply}
        username={username}
      />
    </View>
  )
};

export default MessagesScreen;
