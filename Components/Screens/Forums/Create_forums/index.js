import React, { useState } from "react";
import {
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator
} from "react-native";
import Custom_Create_post from "../../../UserInterface/Create_post";
import { create_forum_api } from "../../../Fetch_Apis/Forums";

const Create_Forums = ({ navigation }) => {
  const [imageData, setImageData] = useState(null);
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreatePost = async () => {
    if (!ticketSubject || !ticketDescription) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);

    let formattedFile = null;

    if (imageData && imageData.length > 0) {
      formattedFile = {
        uri: imageData[0], // Assuming only one image is allowed
        name: "upload.jpg",
        type: "image/jpeg"
      };
    }

    const response = await create_forum_api(
      navigation,
      ticketSubject,
      ticketDescription,
      formattedFile
    );

    setLoading(false);

    if (response?.status === 200) {
      Alert.alert("Success", "Post created successfully!", [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);
    } else {
      Alert.alert("Error", "Failed to create post");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          textAlign: "center",
          paddingVertical: 20,
          fontSize: 20,
          fontWeight: "bold",
          backgroundColor: "#04344c",
          color: "white"
        }}
      >
        Create Post
      </Text>

      <Custom_Create_post
        setImageData={setImageData}
        setTicketSubject={setTicketSubject}
        setTicketDescription={setTicketDescription}
        imageData={imageData}
        navigation={navigation}
        ticketSubject={ticketSubject}
        ticketDescription={ticketDescription}
      />

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
        <TouchableOpacity
          style={{
            backgroundColor: "#04344c",
            paddingHorizontal: 24,
            borderRadius: 50,
            flexDirection: "row",
            alignItems: "center",
            width: Dimensions.get("window").width - 100,
            justifyContent: "center"
          }}
          onPress={handleCreatePost}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator style={{ paddingVertical: 15 }} color="white" />
          ) : (
            <Text
              style={{
                paddingVertical: 15,
                fontWeight: "bold",
                color: "white"
              }}
            >
              Create Post
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Create_Forums;
