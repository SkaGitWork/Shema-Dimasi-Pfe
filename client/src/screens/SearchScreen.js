import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Background from "../components/Background";

const SearchScreen = ({navigation}) => {
  return (
    
        <View style={styles.container}>
          <Text>Search Screen</Text>
        </View>

  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:'#dff4f5'
  },
});