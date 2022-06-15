import React from "react"
import { StyleSheet } from "react-native"
import { Button as PaperButton } from "react-native-paper"
import { theme } from "../core/theme"

export default function Button({ mode, style, ...props }) {
  return (
    <PaperButton
      style={[
        styles.button,
        mode === "outlined" && { backgroundColor: theme.colors.surface },
        {},
      ]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    width: "100%",
    marginVertical: 15,
    paddingVertical: 2,
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 26,
  },
})
