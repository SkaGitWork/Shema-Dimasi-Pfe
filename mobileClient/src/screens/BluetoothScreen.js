import React, { useEffect, useRef, useState } from 'react'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import { View, StyleSheet } from 'react-native'
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import { Alert, Dimensions, Text } from 'react-native-web';
import Header from '../components/Header';
import { LineChart } from 'react-native-chart-kit';

export default function BluetoothScreen({ navigation }) {
  let counter = 0;
  const [readings, setReadings] = useState({
    data : [0],
    labels : [0]
  })
  const device = useRef();
  const readInterval = useRef();
  const [connecting, setConnecting] = useState(false);
  const [connection, setConnection] = useState();

  useEffect(() => {
    getBondedDevices();
    return () => {
      disconnect()
    }
  }, [])

  const getBondedDevices = async (unloading) => {
    setConnecting(true);
    try {
      if(device.current){
        connect()
      }
      else {
        const devices = await RNBluetoothClassic.startDiscovery();
        let esp32 = devices.find(d => d.id == "A4:CF:12:8D:18:12");
        console.log(esp32 != null)
        if(!esp32)
          Alert("Cound not find device");
        else {
          device.current = esp32;
          connect()
        }
      }
    }
    finally {
      setConnecting(false)
    }
  };

  const connect = async () => {
    if(connection) {
      disconnect();
      return;
    }
    setConnecting(true);
    try {
      const conencted = await device.current.connect();
      if (conencted) {
        setConnection(true);
        initializeRead();
      }
    } catch (error) {
      console.log(error)
    }
    finally { setConnecting(false) }
  }

  const initializeRead = () => {
    RNBluetoothClassic.onDeviceDisconnected(() => disconnect(true));
    readInterval.current = setInterval(performRead, 5000)
  }

  const performRead = async () =>  {
    try {
      let available = await device.current.available();
      if (available > 0) {
        for (let i = 0; i < available; i++) {
          let data = await device.current.read();
          const date = new Date()
          setReadings({
            data : readings.data.concat(data.substring(1)*1),
            labels : readings.labels.concat(counter+1)
          })
          counter++;
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  const disconnect = async () => {
    try {
      if(readInterval.current)
        clearInterval(readInterval.current)
      setConnection(false);
      await device.current.disconnect();
    } catch (error) {
    }
  }
  return (
    <View style={styles.container}>
      <Header>ECG Care</Header>

      <Button mode={connection ? "contained" : ""} disabled={connecting} onPress={() => getBondedDevices()}>
        {connecting ? 
          "Connecting ..." : (connection ? 'Disconnect' : 'Connect')
        }
        {}
      </Button>

        <LineChart
          data={{
            labels : readings.labels,
            datasets: [
              {data : readings.data}
            ]
          }}
          width={350} // from react-native
          height={220}
          yAxisInterval={15}
          fromZero={false}
          chartConfig={{
            backgroundColor: "#FFF",
            backgroundGradientFrom: "#FFF",
            backgroundGradientTo: "#FFF",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
    </View>
  )
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: "red",
  },
  // backgroundColor: theme.colors.surface,
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})