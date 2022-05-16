
import React from 'react'
import { DrawerItem } from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function LogoutScreen({navigation}) {
    const Logout = () => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'StartScreen' }],
        })
      };

  return (
        <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                   onPress={Logout}
                
                    label="Logout"
                />

  )
}