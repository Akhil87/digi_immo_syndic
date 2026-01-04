import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import BackButton from "../../../Elements/BackButton";
import { CustomTextInput } from "../../../UserInterface/customInput";
import { launchImageLibraryAsync } from "expo-image-picker";
import { Modal, Portal } from "react-native-paper";
import CustomSnackbar from "../../../UserInterface/SnackBar";
import { MaterialIcons } from "@expo/vector-icons";
import { create_ticket_api } from "../../../Fetch_Apis/help_desk";
import { Loader } from "../../../UserInterface/loader";

const New_Ticket = ({ navigation, route }) => {
  const { title, data } = route?.params;
  console.log("update data", data);

  const [imageData, setImageData] = useState(null);

  const [imageModal, setImageModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const [message, setMessage] = useState("");
  const [snackBarVisible, setSnackBarVisible] = useState(false);

  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTicketSubject(data?.ticketSubject || "");
    setTicketDescription(data?.ticketDescription || "");
  }, []);

  const createTicket = async () => {
    if (!ticketSubject || !ticketDescription) {
      Alert.alert("Alert", "Please fill all required fields");
      return;
    }
    const rs = await create_ticket_api(
      navigation,
      ticketSubject,
      ticketDescription,
      imageData,
      setLoading
    );
    if (rs.status === 200) {
      navigation.goBack();
    }
  };

  const updateTicket = async () => {
    if (!ticketSubject || !ticketDescription) {
      Alert.alert("Alert", "Please fill all required fields");
      return;
    }
    const rs = await create_ticket_api(
      navigation,
      ticketSubject,
      ticketDescription,
      imageData,
      setLoading
    );
    if (rs.status === 200) {
      navigation.goBack();
    }
  };

  const ShowModal = (image) => {
    setImageModal(true);
    setModalData(image);
  };

  const RemoveImage = (image) => {
    setImageData(imageData.filter((item) => item !== image));
  };

  const GetImageAndSet = async () => {
    if (imageData && imageData?.length != 2) {
      const limit = 2;
      await launchImageLibraryAsync({
        allowsMultipleSelection: true,
        selectionLimit: imageData ? limit - imageData?.length : 2,
        quality: 0.4
      })
        .then((data) => {
          if (!data.canceled) {
            const imgs = [];
            const imgData = imageData;
            setImageData(null);
            data.assets.map((item) => {
              imgs.push(item.uri);
            });
            imgs.push(...imgData);
            console.log(imgs);

            setImageData(imgs);
          }
          // setLoading(false);
        })
        .catch((err) => {
          console.log(err);

          // setLoading(false);
          setMessage(err.message + "Here2");
          setSnackBarVisible(true);
        });
    } else if (!imageData) {
      await launchImageLibraryAsync({
        allowsMultipleSelection: true,
        selectionLimit: 2,
        quality: 0.6
      })
        .then((data) => {
          if (data.canceled) {
            // setLoading(false);
            setMessage("Image selection cancelled.");
            setSnackBarVisible(true);
          } else {
            const imgs = [];
            data.assets.map((item) => {
              imgs.push(item.uri);
            });
            console.log(imgs);

            setImageData(imgs);
            // setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);

          // setLoading(false);
          setMessage(err.message + "Here");
          setSnackBarVisible(true);
        });
    } else if (imageData && imageData?.length == 2) {
      setMessage("You can select a maximum of 2 images.");
      setSnackBarVisible(true);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <BackButton navigation={navigation} title="New Ticket" />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={
            {
              // marginBottom: 50
              // width: Dimensions.get("window").width - 50
            }
          }
        >
          <View
            style={{
              margin: 40
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "800"
              }}
            >
              Subject
            </Text>
            <CustomTextInput
              marginTop={10}
              placeholder={"Password reset not working"}
              onChangeText={setTicketSubject}
              value={ticketSubject}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "800",
                marginTop: 20
              }}
            >
              Issue
            </Text>
            <CustomTextInput
              marginTop={10}
              placeholder={"Please help"}
              onChangeText={setTicketDescription}
              value={ticketDescription}
            />{" "}
            {/* <Text
              style={{
                fontSize: 18,
                fontWeight: "800",
                marginTop: 20
              }}
            >
              Email
            </Text>
            <CustomTextInput
              email
              marginTop={10}
              placeholder={"govlog@gmail.com"}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "800",
                marginTop: 20
              }}
            >
              Phone Number
            </Text>
            <CustomTextInput
              numerical
              marginTop={10}
              placeholder={"999-999-9999"}
            />` */}
            <Text
              style={{
                fontSize: 18,
                fontWeight: "800",
                marginTop: 20
              }}
            >
              Upload Image
            </Text>
            {imageData?.length == 2 ? null : (
              <TouchableOpacity
                style={{
                  alignSelf: "center",
                  marginTop: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  width: "70%",
                  height: 100,
                  backgroundColor: "white",
                  // borderColor: Colors.primary,
                  borderWidth: 1,
                  borderRadius: 20
                }}
                activeOpacity={0.6}
                onPress={() => {
                  GetImageAndSet();
                }}
              >
                {/* <Text style={{ color: "black" }}> +</Text> */}
                <MaterialIcons
                  name="add"
                  size={60}
                  style={{ paddingVertical: 10 }}
                />
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-around",
              alignSelf: "center",
              marginTop: 30,
              marginBottom: 100
            }}
          >
            <View style={{ width: "35%" }}>
              {imageData
                ? imageData.map((item, index) => {
                    return (
                      <View key={index}>
                        {index % 2 == 0 ? (
                          <View>
                            <TouchableOpacity
                              style={{
                                width: Dimensions.get("window").width / 3,
                                marginVertical: 10,
                                borderWidth: 1,
                                borderRadius: 10
                              }}
                              onPress={() => {
                                ShowModal(item);
                              }}
                            >
                              <Image
                                source={{ uri: item }}
                                style={{
                                  width: "100%",
                                  height: 70,
                                  borderRadius: 10
                                }}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{ alignSelf: "center" }}
                              onPress={() => {
                                RemoveImage(item);
                              }}
                            >
                              <Text style={{ color: "red" }}>Remove</Text>
                            </TouchableOpacity>
                          </View>
                        ) : null}
                      </View>
                    );
                  })
                : null}
            </View>
            <View style={{ width: "35%" }}>
              {imageData
                ? imageData.map((item, index) => {
                    return (
                      <View key={index}>
                        {index % 2 != 0 ? (
                          <View>
                            <TouchableOpacity
                              style={{
                                width: Dimensions.get("window").width / 3,
                                marginVertical: 10,
                                borderWidth: 1,
                                borderRadius: 10
                              }}
                              onPress={() => {
                                ShowModal(item);
                              }}
                            >
                              <Image
                                source={{ uri: item }}
                                style={{
                                  width: "100%",
                                  height: 70,
                                  borderRadius: 10
                                }}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{ alignSelf: "center" }}
                              onPress={() => {
                                RemoveImage(item);
                              }}
                            >
                              <Text style={{ color: "red" }}>Remove</Text>
                            </TouchableOpacity>
                          </View>
                        ) : null}
                      </View>
                    );
                  })
                : null}
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            bottom: 20,
            left: 0,
            width: Dimensions.get("window").width
          }}
        >
          {title === "Update_Ticket" ? (
            <TouchableOpacity
              style={{
                backgroundColor: "#04344c",
                // paddingVertical: 15,
                paddingHorizontal: 24,
                borderRadius: 50,
                fontWeight: "bold",
                flexDirection: "row",
                alignItems: "center",
                width: Dimensions.get("window").width - 100,
                alignItems: "center",
                justifyContent: "center"
              }}
              onPress={updateTicket}
            >
              <Text
                style={{
                  paddingVertical: 15,
                  paddingHorizontal: 24,
                  fontWeight: "bold",
                  color: "white"
                }}
              >
                Update Ticket
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor: "#04344c",
                // paddingVertical: 15,
                paddingHorizontal: 24,
                borderRadius: 50,
                fontWeight: "bold",
                flexDirection: "row",
                alignItems: "center",
                width: Dimensions.get("window").width - 100,
                alignItems: "center",
                justifyContent: "center"
              }}
              onPress={createTicket}
            >
              <Text
                style={{
                  paddingVertical: 15,
                  paddingHorizontal: 24,
                  fontWeight: "bold",
                  color: "white"
                }}
              >
                Submit
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <Portal>
          <Modal
            visible={imageModal}
            style={{
              alignItems: "center",
              justifyContent: "center"
            }}
            dismissable
            onDismiss={setImageModal}
          >
            <View
              style={{
                width: Dimensions.get("window").width - 30,
                height: Dimensions.get("window").width - 30,
                backgroundColor: "white",
                borderRadius: 20,
                padding: 10
              }}
            >
              <Image
                source={{ uri: modalData ? modalData : null }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 20
                }}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: 15,
                  top: 15,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 20,
                  width: 35,
                  height: 35,
                  backgroundColor: "darkgray"
                }}
                activeOpacity={0.6}
                onPress={() => {
                  RemoveImage(modalData);
                  setImageModal(false);
                  setModalData(null);
                }}
              >
                {/* <Text style={{ color: "red" }}>x</Text> */}
                <MaterialIcons name="close" size={20} color="red" />
              </TouchableOpacity>
            </View>
          </Modal>
        </Portal>
        <CustomSnackbar
          message={message}
          visible={snackBarVisible}
          onDismissSnackBar={() => setSnackBarVisible(false)}
        />
        <Loader visible={loading} />
      </View>
    </View>
  );
};

export default New_Ticket;
