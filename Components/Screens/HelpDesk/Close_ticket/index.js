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
  TextInput,
  Keyboard,
  Alert
} from "react-native";
import PaymentMethodsModal from "../../../Elements/PaymentModal";
import { update_ticket_api } from "../../../Fetch_Apis/help_desk";
import CustomAlertModal from "../../../UserInterface/custom_modal";

const Close_Ticket = ({ navigation, visiable, setVisiable, ticketDetails }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState(ticketDetails?.status || "OPEN");
  const [message, setMessage] = useState("");
  const [IsFocused, setIsfocused] = useState(false);
  const [inputHeight, setInputHeight] = useState(40);

  const [showAlertMessage, setShowAlertMessage] = useState(null);

  const [isVisible, setIsvisiable] = useState(false);

  console.log(ticketDetails);

  const slideAnim = useRef(
    new Animated.Value(Dimensions.get("window").height)
  ).current;

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visiable) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: Dimensions.get("window").height,
          duration: 500,
          useNativeDriver: true
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        })
      ]).start();
    }
  }, [visiable]);

  const handle_ticket_response = async (currentStatus) => {
    if (!message.trim()) {
      Alert.alert("Oops", "Write a message");
      return;
    }
    setStatus(currentStatus);
    const rs = await update_ticket_api(
      navigation,
      currentStatus === "CLOSED" ? currentStatus : status,
      message,
      ticketDetails.id
    );

    if (rs?.status === 200) {
      if (currentStatus === "CLOSED" || status === "CLOSED") {
        Alert.alert("Success", "Ticket closed successfully.");
      } else {
        Alert.alert("Success", "Message sent successfully.");
      }
      setMessage("");
      setVisiable(false);
    } else {
      Alert.alert("Error", "Something went wrong.");
    }
  };

  const onClose = () => {
    setIsvisiable(false);
  };

  return (
    visiable && (
      <TouchableWithoutFeedback onPress={() => setVisiable(false)}>
        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
              setIsfocused(false);
            }}
          >
            <Animated.View
              style={[
                styles.modalContainer,
                {
                  transform: [{ translateY: slideAnim }],
                  height: IsFocused ? "100%" : "60%"
                }
              ]}
            >
              <Text
                style={[
                  styles.title,
                  {
                    textAlign: "center",
                    marginVertical: 5,
                    fontWeight: "bold",
                    fontSize: 18
                  }
                ]}
              >
                Ticket Status
              </Text>

              <Text style={[styles.title, { marginTop: 5 }]}>
                Title :-{" "}
                <Text style={[styles.title, { fontWeight: "600" }]}>
                  {ticketDetails?.subject}
                </Text>
              </Text>
              <Text style={[styles.title, { marginTop: 5 }]}>
                Description :-{" "}
                <Text style={[styles.title, { fontWeight: "600" }]}>
                  {ticketDetails?.description?.length > 25
                    ? `${ticketDetails?.description?.substring(0, 25)}...`
                    : ticketDetails?.description}
                </Text>
              </Text>
              {ticketDetails?.description?.length > 25 && (
                <TouchableOpacity
                  onPress={() => {
                    setIsvisiable(true);
                    setShowAlertMessage(ticketDetails?.description);
                  }}
                >
                  <Text
                    style={[
                      styles.title,
                      {
                        textAlign: "right",
                        width: "100%",
                        color: "rgb(51, 51, 51)"
                      }
                    ]}
                  >
                    More
                  </Text>
                </TouchableOpacity>
              )}
              {ticketDetails?.response && (
                <Text style={[styles.title, { marginTop: 5 }]}>
                  Response :-{" "}
                  <Text style={[styles.title, { fontWeight: "600" }]}>
                    {ticketDetails?.response?.length > 25
                      ? `${ticketDetails?.response?.substring(0, 25)}...`
                      : ticketDetails?.response}
                  </Text>
                </Text>
              )}
              {/* <Text>{ticketDetails?.description?.length > 30 && "More"}</Text> */}
              {/* {ticketDetails?.description?.length > 30 && ( */}
              {ticketDetails?.response?.length > 25 && (
                <TouchableOpacity
                  onPress={() => {
                    setIsvisiable(true);
                    setShowAlertMessage(ticketDetails?.response);
                  }}
                >
                  <Text
                    style={[
                      styles.title,
                      {
                        textAlign: "right",
                        width: "100%",
                        color: "rgb(51, 51, 51)"
                      }
                    ]}
                  >
                    More
                  </Text>
                </TouchableOpacity>
              )}
              {/* )} */}
              <TouchableOpacity
                style={styles.paymentDetails}
                onPress={() => {
                  if (status !== "CLOSED") setModalVisible(true);
                }}
                activeOpacity={status !== "CLOSED" ? 0.6 : 1}
              >
                <View style={styles.paymentRow}>
                  <Text style={{ fontWeight: "bold" }}>🔓 {status}</Text>
                </View>
                <Image
                  style={styles.arrowIcon}
                  source={require("../../../Assests/downarrow.png")}
                />
              </TouchableOpacity>
              {status !== "CLOSED" && (
                <View style={styles.summaryContainer}>
                  <Text style={styles.sectionTitle}>Message</Text>
                  <TextInput
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Type your message..."
                    multiline
                    onContentSizeChange={(e) =>
                      setInputHeight(e.nativeEvent.contentSize.height)
                    }
                    style={[
                      styles.textArea,
                      { height: Math.max(40, inputHeight) }
                    ]}
                    onBlur={() => setIsfocused(false)}
                    onFocus={() => setIsfocused(true)}
                    re
                  />
                </View>
              )}

              {status !== "CLOSED" && (
                <View style={styles.payNowButton}>
                  <TouchableOpacity
                    style={{ marginHorizontal: 20 }}
                    onPress={() => handle_ticket_response("OPEN")}
                  >
                    <Text style={styles.payNowText}>Send Message</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ marginHorizontal: 20 }}
                    onPress={async () => {
                      // await setStatus("CLOSED");
                      await handle_ticket_response("CLOSED");
                    }}
                  >
                    <Text
                      style={[styles.payNowText, { backgroundColor: "red" }]}
                    >
                      Close Ticket
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Animated.View>
          </TouchableWithoutFeedback>

          <PaymentMethodsModal
            visible={isModalVisible}
            onClose={() => setModalVisible(false)}
            title={"help_desk"}
            setStatus={setStatus}
            status={status}
          />
          <CustomAlertModal
            isVisible={isVisible}
            onClose={onClose}
            navigation={navigation}
            content={showAlertMessage}
          />
        </Animated.View>
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
    borderBottomWidth: 1,
    borderBottomColor: "rgb(187, 186, 186)",
    marginVertical: 20,
    paddingVertical: 10
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
  payNowButton: {
    alignSelf: "center",
    justifyContent: "space-between",
    marginVertical: 0,
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    width: Dimensions.get("window").width
  },
  payNowText: {
    backgroundColor: "#03334D",
    textAlign: "center",
    padding: 10,
    color: "rgb(233, 228, 228)",
    fontSize: 16,
    fontWeight: "500",
    borderRadius: 10,
    width: "100%"
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
    marginTop: 5
  }
});

export default Close_Ticket;
