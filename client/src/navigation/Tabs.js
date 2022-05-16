import "react-native-gesture-handler"
import React from "react"
import { View } from "react-native"
import "react-native-gesture-handler"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { FontAwesome5 } from "@expo/vector-icons"
import HomeScreen from "../screens/HomeScreen"
import SearchScreen from "../screens/SearchScreen"
import EtatScreen from "../screens/EtatScreen"
import NotificationScreen from "../screens/NotificationScreen"
import ConversationsScreen from "../screens/ContactScreen"
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen"
import { createStackNavigator } from "@react-navigation/stack"
import Icon from "react-native-vector-icons/Ionicons"
import EditScreen from "./../screens/EditScreen"
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

global.patient = "Patient"

const Tabs = () => (
  <Tab.Navigator
    initialRouteName="Profile"
    tabBarOptions={{
      showLabel: false,
      style: {
        display: "flex",
        backgroundColor: "white",
        position: "absolute",
        bottom: 25,
        marginHorizontal: 20,
        height: 60,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowOffset: {
          width: 10,
          height: 10,
        },
        paddingHorizontal: 20,
      },
    }}
  >
    <Tab.Screen
      name={"Profile"}
      component={HomeStackScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <View
            style={{
              position: "absolute",
              top: 20,
            }}
          >
            <FontAwesome5
              name="home"
              size={20}
              color={focused ? "#047086" : "grey"}
            ></FontAwesome5>
          </View>
        ),
      }}
      listeners={({ navigation, route }) => ({
        tabPress: (e) => {},
      })}
    />

<Tab.Screen
      name={"Edit"}
      component={EditScreenStack}
      options={{
        tabBarIcon: ({ focused }) => (
          <View
            style={{
              position: "absolute",
              top: 20,
            }}
          >
            <FontAwesome5
              name="edit"
              size={20}
              color={focused ? "#047086" : "grey"}
            ></FontAwesome5>
          </View>
        ),
      }}
      listeners={({ navigation, route }) => ({
        tabPress: (e) => {},
      })}
    />

  </Tab.Navigator>
)
export default Tabs

const HomeStackScreen = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#4bccc7",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <Stack.Screen
      name="Profile"
      component={HomeScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#4bccc7"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </Stack.Navigator>
)


const EditScreenStack = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#4bccc7",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <Stack.Screen
      name="Edit"
      component={EditScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#4bccc7"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </Stack.Navigator>
)
