import React from "react"
import { View, StyleSheet } from "react-native"
import { Avatar, Title, Caption, Drawer } from "react-native-paper"
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer"

import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import AsyncStorage from "@react-native-async-storage/async-storage"

var currentUser
export function DrawerContent(props) {
  const getCurrentUser = async () => {
    currentUser = JSON.parse(await AsyncStorage.getItem("user"))
}

getCurrentUser()

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: "https://api.adorable.io/avatars/50/abott@adorable.png",
                }}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>
                  {currentUser?.name || "User"}{" "}
                </Title>
                <Caption style={styles.caption}>
                  {currentUser?.email || "@UserName"}
                </Caption>
              </View>
            </View>
          </View>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="account" color={color} size={size} />
          )}
          onPress={() => {
            props.navigation.navigate("Profile")
          }}
          label="Profile"
        />
      </Drawer.Section>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="account-edit" color={color} size={size} />
          )}
          onPress={() => {
            props.navigation.navigate("Edit")
          }}
          label="Edit"
        />
      </Drawer.Section>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          onPress={() => {
            props.navigation.navigate("LoginScreen")
          }}
          label="Logout"
        />
      </Drawer.Section>
    </View>
  )
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
})
