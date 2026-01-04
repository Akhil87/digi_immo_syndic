import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import OtpInputs from "react-native-otp-textinput";

const OtpModal = ({ visible, onClose, setOtp, otp }) => {
  const { t } = useTranslation();

  const scaleValue = useRef(new Animated.Value(1)).current; // Initial scale value

  const handleVerifyOtp = () => {
    console.log("Entered OTP ->", otp.length);
    if (otp.length === 4) {
      onClose();
    }
  };

  const handleOtpChange = (enteredOtp) => {
    console.log("OTP Input Changed ->", enteredOtp);
    setOtp(enteredOtp);
  };

  const handleBackgroundPress = () => {
    Animated.sequence([
      Animated.spring(scaleValue, {
        toValue: 1.1,
        useNativeDriver: true
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true
      })
    ]).start();
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={handleBackgroundPress}>
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.modalContainer,
                { transform: [{ scale: scaleValue }] }
              ]}
            >
              <Text style={styles.header}>{t("enter_otp")}</Text>

              <OtpInputs
                handleTextChange={handleOtpChange}
                numberOfInputs={6}
                inputStyles={styles.otpInput}
              />

              <TouchableOpacity
                style={{ width: "40%", paddingVertical: 20 }}
                onPress={handleVerifyOtp}
              >
                <Text style={styles.button}>{t("confirm")}</Text>
              </TouchableOpacity>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center"
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#6200ea",
    margin: 5,
    textAlign: "center",
    fontSize: 18,
    borderRadius: 10,
    backgroundColor: "white"
  },
  button: {
    backgroundColor: "rgb(8, 143, 64)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    color: "white",
    textAlign: "center",
    width: "100%"
  },
  closeButtonText: {
    color: "#6200ea",
    fontSize: 16,
    marginTop: 10
  }
});

export default OtpModal;
