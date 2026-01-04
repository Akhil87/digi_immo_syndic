import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
  Alert
} from "react-native";
import PaymentMethodsModal from "../PaymentModal";
import { TextInput } from "react-native";
import { Dimension } from "../../UserInterfase/Dimensions";
import { themeColor } from "../../UserInterfase/ThemeColor";
import { Add_agenda } from "../../Fetch_Apis/meetings";
import { useDispatch } from "react-redux";

const BottomModal = ({
  navigation,
  visiable,
  item,
  setVisiable,
  title,
  meetingId,
  setAdagendaStatus
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [agenda, setAgenda] = useState("");
  const dispatch = useDispatch();

  const slideAnim = useRef(
    new Animated.Value(Dimensions.get("window").height)
  ).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visiable ? 0 : Dimensions.get("window").height,
      duration: 500,
      useNativeDriver: true
    }).start();
  }, [visiable]);

  const handleAddAgenda = async () => {
    if (!agenda) {
      // Alert.alert("Please write your `Agenda`")
      return;
    }
    const rs = await Add_agenda(navigation, dispatch, meetingId, agenda);
    console.log(rs);
    if (rs.status === 200) {
      setVisiable(false);
      setAdagendaStatus(rs.status);
      setAgenda("");
    }
  };

  return (
    visiable && (
      <TouchableWithoutFeedback
        onPress={() => {
          setVisiable(false);
          Keyboard.dismiss();
        }}
      >
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.modalContainer,
                { transform: [{ translateY: slideAnim }] }
              ]}
            >
              {title === "Agenda" ? (
                <>
                  <View>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 18,
                        marginBottom: 20
                      }}
                    >
                      Add a new Agenda
                    </Text>

                    <TextInput
                      placeholder="Enter a title of Agenda"
                      onChangeText={(text) => setAgenda(text)}
                      value={agenda}
                      style={{
                        borderWidth: 1,
                        borderColor: "gray",
                        borderRadius: 10,
                        paddingHorizontal: 15
                      }}
                    />
                  </View>

                  <View
                    style={{
                      position: "absolute",
                      bottom: 20,
                      left: 0,
                      right: 0,
                      width: Dimension.width,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        backgroundColor: agenda
                          ? themeColor
                          : "rgb(141, 140, 140)",
                        paddingVertical: 10,
                        // paddingHorizontal: 20,
                        borderRadius: 10,
                        width: Dimension.width * 0.9,
                        alignItems: "center"
                      }}
                      activeOpacity={agenda ? 0.4 : 1}
                      onPress={handleAddAgenda}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          fontSize: 16
                        }}
                      >
                        Add now
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <>
                  <Text style={styles.title}>Payment Method</Text>
                  <TouchableOpacity
                    style={styles.paymentDetails}
                    onPress={() => setModalVisible(true)}
                  >
                    <View style={styles.paymentRow}>
                      <Image
                        style={styles.paymentImage}
                        source={require("../../Assests/visa.png")}
                      />
                      <Text>**** **** **** 1324</Text>
                    </View>
                    <Image
                      style={styles.arrowIcon}
                      source={require("../../Assests/downarrow.png")}
                    />
                  </TouchableOpacity>
                  <View style={styles.summaryContainer}>
                    <Text style={styles.sectionTitle}>Payment Summary</Text>
                    {[
                      { label: "Top up", value: "Rp 100,000" },
                      { label: "Admin Fee", value: "Rp 1,000" },
                      { label: "Total", value: "Rp 101,000", isTotal: true }
                    ].map((item, index) => (
                      <View style={styles.summaryRow} key={index}>
                        <Text
                          style={[
                            styles.summaryText,
                            item.isTotal && styles.totalText
                          ]}
                        >
                          {item.label}
                        </Text>
                        <Text
                          style={[
                            styles.summaryValue,
                            item.isTotal && styles.totalValue
                          ]}
                        >
                          {item.value}
                        </Text>
                      </View>
                    ))}
                  </View>
                  <TouchableOpacity
                    style={styles.payNowButton}
                    onPress={() => {
                      navigation.navigate("Transaction", { title: "Success" });
                    }}
                  >
                    <Text style={styles.payNowText}>Pay Now</Text>
                  </TouchableOpacity>
                </>
              )}
            </Animated.View>
          </TouchableWithoutFeedback>
          <PaymentMethodsModal
            visible={isModalVisible}
            onClose={() => setModalVisible(false)}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    justifyContent: "flex-end"
  },
  modalContainer: {
    width: "100%",
    height: "50%",
    backgroundColor: "rgb(231, 231, 231)",
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    padding: 20
  },
  title: {
    fontWeight: "700",
    fontSize: 16,
    color: "rgb(87, 86, 86)"
  },
  paymentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20
  },
  paymentDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // gap: 20,
    // paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgb(187, 186, 186)",
    marginVertical: 20,
    paddingVertical: 10
  },
  paymentImage: {
    width: 60,
    height: 30
  },
  arrowIcon: {
    width: 10,
    height: 10
  },
  summaryContainer: {
    marginVertical: 0
  },
  sectionTitle: {
    fontWeight: "800",
    fontSize: 16,
    color: "rgb(87, 86, 86)"
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  summaryText: {
    color: "rgb(163, 163, 163)",
    paddingVertical: 5,
    fontWeight: "500"
  },
  summaryValue: {
    color: "rgb(119, 119, 119)",
    paddingVertical: 5,
    fontWeight: "800",
    fontSize: 16
  },
  totalText: {
    color: "#03334D",
    fontWeight: "800"
  },
  totalValue: {
    color: "#03334D"
  },
  payNowButton: {
    alignSelf: "center", // Center horizontally
    justifyContent: "center",
    marginVertical: 0,
    position: "absolute",
    bottom: 10, // Adds spacing from the bottom for better responsiveness
    width: "50%" // Make the button width responsive
  },
  payNowText: {
    backgroundColor: "#03334D",
    textAlign: "center", // Center text inside the button
    paddingVertical: 10, // Increase padding for better tap targets
    color: "rgb(233, 228, 228)",
    fontSize: 16,
    fontWeight: "500",
    borderRadius: 10,
    width: "100%" // Ensure text fills the button width
  }
});

export default BottomModal;
