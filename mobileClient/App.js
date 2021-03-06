import "react-native-gesture-handler"
import React, { useEffect, useState } from "react"
import { Provider } from "react-native-paper"
import { NavigationContainer } from "@react-navigation/native"
import { theme } from "./src/core/theme"
import StartScreen from "./src/screens/StartScreen"
import LoginScreen from "./src/screens/LoginScreen"
import RegisterScreen from "./src/screens/RegisterScreen"
import ResetPasswordScreen from "./src/screens/ResetPasswordScreen"
import Tabs from "./src/navigation/Tabs"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { DrawerContent } from "./src/navigation/DrawerContent"
import { createStackNavigator } from "@react-navigation/stack"
import HomeScreen from './src/screens/HomeScreen';
import EditScreen from './src/screens/EditScreen';
import BluetoothScreen from "./src/screens/BluetoothScreen"

const Drawer = createDrawerNavigator()

export default function App() {

  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Drawer.Navigator

          initialRouteName="StartScreen"
          // screenOptions={{
          // }}
          screenOptions={{
            headerShown: true,

            headerStyle: {
              backgroundColor: "#4bccc7",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
          drawerContent={(props) => <DrawerContent {...props} />}
        >
          <Drawer.Screen options={{ headerShown: false }} name="StartScreen" component={StartScreen} />
          <Drawer.Screen options={{ headerShown: false }} name="BluetoothScreen" component={BluetoothScreen} />
          <Drawer.Screen options={{ headerShown: false }} name="LoginScreen" component={LoginScreen} />
          <Drawer.Screen options={{ headerShown: false }} name="RegisterScreen" component={RegisterScreen} />
          <Drawer.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
          <Drawer.Screen name="Tabs" component={Tabs} />

          <Drawer.Screen name="Profile" component={HomeScreen} />
          <Drawer.Screen name="Edit" component={EditScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
