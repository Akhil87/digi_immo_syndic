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
import { themeColor } from "../../UserInterfase/ThemeColor";

const CustomAlertModal = ({ isVisible, onClose, navigation, content }) => {
  const { colors } = useTheme();
  // useEffect(() => {
  //   if (isVisible) {
  //     StatusBar.setHidden(true);
  //   }
  // }, [isVisible]);
  return (
    <Modal isVisible={isVisible} animationIn="zoomIn" animationOut="zoomOut">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <View style={styles.modalContainer}>
        <Text style={styles.modalText}>
          {content
            ? content
            : "Your request has been sent to the admin. When they accept this request, please log in."}
        </Text>
        {content === "Are you sure ?" ? (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: themeColor }]}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Pay now</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        )}
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
    marginBottom: 15,
    color: "#333",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14
  }
});

export default CustomAlertModal;
