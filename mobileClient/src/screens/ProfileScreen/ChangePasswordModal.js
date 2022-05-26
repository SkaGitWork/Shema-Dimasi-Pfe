import React, { useState, useEffect } from "react"
import Axios from "./../../api/axios"
import {
  Alert,
  // Button,
  Modal,
  StyleSheet,
  Text,
  // TextInput,
  Pressable,
  View,
} from "react-native"
import { TextInput, Button } from "react-native-paper"

const ChangePasswordModal = ({ user }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [InitialPassword, setInitialPassword] = useState("")
  const [NewPassword, setNewPassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")
  const [ErrorMessage, setErrorMessage] = useState("")

  const [loading, setLoading] = useState(false)

  function submit() {
    if (NewPassword.length < 4) {
      setErrorMessage("Le mot de passe doit contenir plus de 4 caractère")
    } else if (NewPassword != ConfirmPassword) {
      setErrorMessage("Confirmer votre nouveau mot de passe")
    } else setErrorMessage("")

    if (ErrorMessage == "") {
      if (true) {
        setLoading(true)
        Axios.patch(`/user/modifyUser/${user.id}`, {
          initialPassword: InitialPassword,
          password: NewPassword,
        }).then(
          (response) => {
            console.log(response)
            setErrorMessage(response.data)
          },
          (error) => {
            setErrorMessage(error.response.data)
          }
        )
      }
      setLoading(false)
    }
  }

  function changePassword() {}

  return (
    <>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible)
          }}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Changer votre mot de passe</Text>

            {inputs()}

            {/*// ! ------------------------- ERROR MESSAGE ---------------------------- */}

            <Text style={{ textAlign: "center", margin: 5, color: "red" }}>
              {ErrorMessage}
            </Text>

            {/*// ! ---------------------------- BUTTONS ------------------------------- */}
            <Button
              style={{ marginVertical: 10 }}
              icon="send"
              loading={loading}
              mode="contained"
              onPress={submit}
            >
              Confirmer
            </Button>

            <Button mode="contained" onPress={() => setModalVisible(false)}>
              Annuler
            </Button>
          </View>
        </Modal>
      </View>
      {/* Change Password */}
      <View style={{ margin: 25 }}>
        <Button
          title="Changer de mot de passe"
          onPress={() => {
            changePassword()
            setModalVisible(true)
          }}
        />

        <Button
          icon="account-edit"
          mode="contained"
          onPress={() => {
            changePassword()
            setModalVisible(true)
          }}
        >
          Changer de mot de passe
        </Button>
      </View>
    </>
  )

  function inputs() {
    return (
      <>
        <TextInput
          style={{ height: 40 }}
          mode="outlined"
          label="Mot de passe initial"
          value={InitialPassword}
          onChangeText={setInitialPassword}
        />
        <TextInput
          style={{ height: 40, marginVertical: 10 }}
          mode="outlined"
          label="Nouveau mot de passe"
          value={NewPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          style={{ height: 40 }}
          mode="outlined"
          label="Confirmer"
          value={ConfirmPassword}
          onChangeText={setConfirmPassword}
        />
      </>
    )
  }
}

const styles = StyleSheet.create({
  button: { marginBottom: 10 },
  centeredView: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  modalView: {
    margin: 20,
    marginTop: 100,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // elevation: 5,
  },

  button2: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    padding: 10,
    borderRadius: 4,
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
})

export default ChangePasswordModal
