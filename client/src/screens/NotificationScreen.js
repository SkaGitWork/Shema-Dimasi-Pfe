import moment from "moment"
import React, { useEffect, useState } from "react"
import { View, Text, Button, StyleSheet, Image } from "react-native"
import Axios from "./../api/axios"

const NotificationScreen = ({ navigation }) => {
  const [fetchedDevices, setFetchedDevices] = useState([])
  useEffect(() => {
    fetchDevices()
  }, [])

  const fetchDevices = async () => {
    setFetchedDevices(
      await Axios.get("/device/notification/fetch").then((res) => {
        console.log(res.data)
        return res.data
      })
    )
  }
  return (
    <View style={styles.container}>
      {fetchedDevices.map((device, key) =>
        device.alerts.map((alert, key) => (
          <View
            style={[
              styles.element,
              {
                borderColor:
                  alert.warningType === "danger"
                    ? "#bb2704"
                    : alert.warningType === "warning"
                    ? "#a87506b3"
                    : "#285375",
              },
            ]}
          >
            {/* <Image
              style={styles.image}
              source={
                alert.warningType === "warning"
                  ? require(`../assets/warning.png`)
                  : alert.warningType === "danger"
                  ? require(`../assets/danger.png`)
                  : require(`../assets/notice.png`)
              }
            /> */}
            <View style={styles.circle}></View>
            <View style={styles.notificationTopContainer}>
              <View>
                <Text>Titre </Text>
                <Text>Description </Text>
              </View>
              {/* <Text>{device.deviceId}</Text> */}
              <Text style={{ fontWeight: "bold" }}>
                {moment().isAfter(moment(alert.time))
                  ? moment(alert.time).format("DD-MM-YYYY")
                  : moment(alert.time).format("HH-mm")}{" "}
              </Text>
            </View>
          </View>
        ))
      )}
    </View>
  )
}

export default NotificationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dff4f5",
    padding: 10,
  },
  image: {
    width: 40,
    height: 40,
  },

  element: {
    width: "100%",
    height: 60,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,

    backgroundColor: "#fff",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,

    // elevation: 21,

    marginVertical: 10,

    overflow: "hidden",
  },
  notificationTopContainer: {
    marginLeft: 25,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  circle: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: "#CACBF4",
    position: "absolute",
    left: -25,
    // backgroundColor: "#FDEF95",
  },
})
