import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import Modal from "react-native-modal";
import { Portal } from "react-native-paper";

const PaymentMethodsModal = ({
  visible,
  onClose,
  title,
  setStatus,
  status
}) => {
  useEffect(() => {
    if (visible) {
      StatusBar.setHidden(true);
    } else {
      StatusBar.setHidden(false);
    }
  }, [visible]);
  return (
    <Portal>
      <Modal
        isVisible={visible}
        onBackdropPress={onClose}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        backdropColor="transparent"
        style={{ margin: 0 }}
        statusBarTranslucent={true}
        backdropOpacity={0.5}
        backdropColor="black"
      >
        {title === "help_desk" ? (
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              marginHorizontal: 20
            }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 15 }}
            >
              Select Status
            </Text>

            <TouchableOpacity
              style={[
                styles.paymentButton,
                { backgroundColor: status === "OPEN" ? "gray" : "#f5f5f5" }
              ]}
              onPress={() => {
                setStatus("OPEN");
                onClose();
              }}
            >
              <Text
                style={[
                  styles.paymentText,
                  { color: status === "OPEN" ? "white" : "black" }
                ]}
              >
                🔓 Open
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.paymentButton,
                {
                  backgroundColor: status === "CLOSED" ? "gray" : "#f5f5f5",
                  color: status === "CLOSED" ? "white" : "black"
                }
              ]}
              onPress={() => {
                setStatus("CLOSED");
                onClose();
              }}
            >
              <Text
                style={[
                  styles.paymentText,
                  { color: status === "Close" ? "white" : "black" }
                ]}
              >
                🔒 Close
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 15 }}
            >
              Select Payment Method
            </Text>

            <TouchableOpacity style={styles.paymentButton}>
              <Text style={styles.paymentText}>💳 Credit / Debit Card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentButton}>
              <Text style={styles.paymentText}>📲 UPI / Mobile Wallet</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentButton}>
              <Text style={styles.paymentText}>💵 Cash on Delivery</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={{ color: "white", textAlign: "center" }}>Close</Text>
            </TouchableOpacity>
          </View>
        )}
      </Modal>
    </Portal>
  );
};

const styles = {
  paymentButton: {
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    marginBottom: 10
  },
  paymentText: {
    fontSize: 16
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "black",
    padding: 12,
    borderRadius: 5
  }
};

export default PaymentMethodsModal;
