import React, { useEffect, useRef, useState } from 'react'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import { View, StyleSheet } from 'react-native'
// import { BleManager } from 'react-native-ble-plx';
import BleManager from 'react-native-ble-manager';
import { NativeModules } from 'react-native-web';
import NativeEventEmitter from 'react-native/Libraries/EventEmitter/NativeEventEmitter';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule)


export default function BluetoothScreen({ navigation }) {
  let peripherals = []
  const [devices, setDevices] = useState([]);
  const [scanning, setScanning] = useState(false);
  // const bleManager = useRef(new BleManager());

  useEffect(() => {
    BleManager.start({ showAlert: true })
    bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);

    return () => {
      bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
    }
  }, [])

  const handleDiscoverPeripheral = (peripheral) => {
    // console.log(peripheral.id, peripheral.name)
    if (!peripheral.name) {
      peripheral.name = peripheral.id;
    }
    // peripherals.set(peripheral.id, peripheral);
    if(peripherals.find(d => d.id == peripheral.id))
      return
    peripherals.push({id : peripheral.id, name : peripheral.name })
    console.log(peripherals)
    setDevices(peripherals);
  }

  // const connect = (device) => {
  //   delete device._manager;
  //   console.log(device);
  //   bleManager.current.connectToDevice(device.id)
  //     .then(d => {
  //       alert('Connected to device : ', d.name);
  //       console.log(d)
  //     });
  // }

  // const scanDevices = () => {
  //   console.log('scanning');
  //   let isScanning = true;
  //   setScanning(true);
  //   bleManager.current.startDeviceScan(null,
  //     null,
  //     async (error, device) => {

  //       if (error) {
  //         console.log({ error })
  //         isScanning = false;
  //         setScanning(false)
  //         bleManager.current.stopDeviceScan();
  //       }

  //       while(true){
  //         if(device.id == 'A4:CF:12:8D:18:12'){
  //           setDevices([device])
  //           bleManager.current.stopDeviceScan()
  //           break
  //         }

  //       }
  //     });
  // }

  const scanDevices = () => {
    // Success code
    // console.log("Module initialized");
    BleManager.scan([], 10, true, {
       scanMode : 0,
       matchMode : 1
    }).then((results) => {
    //   // Success code
    //   console.log("Scan started");
    });
    
    BleManager.connect("A4:CF:12:8D:18:12")
      .then(() => console.log("Connected"))
      .catch((err) => console.log(err))
  }

  return (
    <View style={styles.container}>
      {/* <Header>ECG Care</Header> */}
      <Paragraph>
        Bluetooth Devices
      </Paragraph>
      {devices.map(device => (
        <Button key={device.id}
          mode="outlined"
          onPress={() => connect(device)}
        >
          {device.name}
        </Button>
      ))}

      <Button mode={"contained"} disabled={scanning} onPress={() => scanDevices()}>
        {scanning ? 'Scanning...' : 'Scan'}
      </Button>
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