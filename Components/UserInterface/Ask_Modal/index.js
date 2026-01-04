import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar
} from "react-native";
import Modal from "react-native-modal";
import { useTheme } from "react-native-paper";

const Ask_modal = ({ isVisible, onClose, navigation, email, phonenumber }) => {
  const { colors } = useTheme();

  useEffect(() => {
    if (isVisible) {
      StatusBar.setHidden(true);
    }
  }, [isVisible]);

  return (
    <Modal isVisible={isVisible} animationIn="zoomIn" animationOut="zoomOut">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <View style={styles.modalContainer}>
        <Text style={styles.modalText}>
          Would you like to continue with phone number or email?
        </Text>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate("PhoneLogin")}
        >
          <Text style={styles.buttonText}>Continue with Phone Number</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: colors.secondary, marginTop: 10 }
          ]}
          onPress={() => navigation.navigate("EmailLogin")}
        >
          <Text style={styles.buttonText}>Continue with Email</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.closeButton, { borderColor: colors.primary }]}
          onPress={onClose}
        >
          <Text style={[styles.buttonText, { color: colors.primary }]}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center"
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#333"
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "100%",
    alignItems: "center"
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    marginTop: 10
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  }
});

export default Ask_modal;
