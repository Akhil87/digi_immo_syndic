import axios from "axios";
import { base_url, update_user_api } from "../base_url";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const get_user_details = async (navigation) => {
  const rawToken = await AsyncStorage.getItem("token");
  if (!rawToken) {
    navigation.replace("LandingPage");
    return;
  }

  const token = rawToken.trim().replace(/^"(.*)"$/, "$1");

  try {
    const res = await axios.get(`${base_url}/syndic/login`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    });

    return res;
  } catch (error) {
    console.log("Error Response:", error?.response?.data);
    console.log("Status:", error?.response?.status);
    return null;
  }
};

export const update_user = async (
  phoneNumber,
  residence,
  flatNumber,
  floor,
  boxNumber,
  flatType,
  navigation
) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      navigation.replace("LandingPage");
      return; // Stop execution if there's no token
    }

    console.log("update", phoneNumber);

    // Create FormData properly
    let formData = new FormData();
    formData.append("phoneNumber", phoneNumber);
    // formData.append("residence", residence);
    formData.append("flatNumber", flatNumber);
    formData.append("floor", floor);
    formData.append("boxNumber", boxNumber);
    formData.append("flatType", flatType);

    console.log("FormData:", formData);

    const res = await axios.put(
      "https://digimmo.ddns.net/api/users/updateUser",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      }
    );

    console.log("Response:", res.data);
    return res.data;
  } catch (error) {
    console.log("Error Response:", error.response?.data || error.message);
    return error;
  }
};
