import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { launchImageLibraryAsync } from "expo-image-picker";
import { Modal, Portal } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import BackButton from "../../Elements/BackButton";
import { CustomTextInput } from "../customInput";
import CustomSnackbar from "../SnackBar";
import { Loader } from "../loader";

const windowWidth = Dimensions.get("window").width;
const Custom_Create_post = ({
  navigation,
  ticketSubject,
  setTicketSubject,
  ticketDescription,
  setTicketDescription,
  imageData,
  setImageData,
}) => {
  const [imageModal, setImageModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [message, setMessage] = useState("");
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  // Full-Screen Image States

  const ShowModal = (image) => {
    setImageModal(true);
    setModalData(image);
  };

  const RemoveImage = (image) => {
    setImageData(imageData.filter((item) => item !== image));
  };

  const GetImageAndSet = async () => {
    if (imageData && imageData.length >= 1) {
      setMessage("You can select only one image.");
      setSnackBarVisible(true);
      return;
    }

    await launchImageLibraryAsync({
      allowsMultipleSelection: false, // No multiple selection
      selectionLimit: 1,
      quality: 0.6,
    })
      .then((data) => {
        if (!data.canceled) {
          setImageData([data.assets[0].uri]); // Only one image
        }
      })
      .catch((err) => {
        setMessage(err.message);
        setSnackBarVisible(true);
      });
  };

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ margin: 40 }}>
          <Text style={{ fontSize: 18, fontWeight: "800" }}>Title</Text>
          <CustomTextInput
            marginTop={10}
            placeholder="Write an Engaging Title Here..."
            onChangeText={setTicketSubject}
            value={ticketSubject}
          />
          <Text style={{ fontSize: 18, fontWeight: "800", marginTop: 20 }}>
            Content
          </Text>
          <CustomTextInput
            marginTop={10}
            placeholder="Start writing your content here..."
            onChangeText={setTicketDescription}
            value={ticketDescription}
          />
          {imageData && imageData.length > 0 ? null : (
            <>
              <Text
                style={{
                  fontSize: Math.min(windowWidth * 0.05, 18),
                  fontWeight: "800",
                  marginTop: 20,
                }}
              >
                Upload Image
              </Text>
              <TouchableOpacity
                style={{
                  alignSelf: "center",
                  marginTop: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  width: "70%",
                  height: 100,
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderRadius: 20,
                }}
                activeOpacity={0.6}
                onPress={GetImageAndSet}
              >
                <MaterialIcons
                  name="add"
                  size={60}
                  style={{ paddingVertical: 10 }}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            marginTop: 4,
            marginBottom: 100,
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
                              borderRadius: 10,
                            }}
                            onPress={() => {
                              ShowModal(item);
                            }}
                          >
                            <Image
                              source={{ uri: item }}
                              style={{
                                width: "100%",
                                height: Dimensions.get("window").width * 0.2,
                                borderRadius: 10,
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
                              borderRadius: 10,
                            }}
                            onPress={() => {
                              ShowModal(item);
                            }}
                          >
                            <Image
                              source={{ uri: item }}
                              style={{
                                width: "100%",
                                height: Dimensions.get("window").width * 0.2,
                                borderRadius: 10,
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

      <Portal>
        <Modal
          visible={imageModal}
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
          dismissable
          onDismiss={setImageModal}
        >
          <View
            style={{
              width: Dimensions.get("window").width - 30,
              height: Dimensions.get("window").width - 30,
              backgroundColor: "rgb(255,255,255)",
              borderRadius: 20,
              padding: 10,
            }}
          >
            <Image
              source={{ uri: modalData ? modalData : null }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 20,
              }}
              resizeMode="contain"
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
                backgroundColor: "darkgray",
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
      {/* <Loader visible={loading} /> */}
    </View>
  );
};

export default Custom_Create_post;
