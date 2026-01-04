import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  base_url,
  create_ticket,
  get_all_ticket,
  update_ticket
} from "../base_url";

export const create_ticket_api = async (
  navigation,
  ticketSubject,
  ticketDescription,
  imageData,
  setLoading
) => {
  const token = await AsyncStorage.getItem("token");
  console.log(imageData);

  if (!token) {
    navigation.replace("LandingPage");
  }

  const formData = new FormData();
  formData.append("ticketSubject", ticketSubject);
  formData.append("ticketDescription", ticketDescription);
  imageData?.forEach((uri, index) => {
    formData.append("photo[]", {
      uri: uri,
      name: `image_${index}.jpg`, // Ensure a proper file name
      type: "image/jpeg" // Ensure correct MIME type
    });
  });
  setLoading(true);
  try {
    const res = await axios.post(create_ticket, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    });

    return res;
  } catch (error) {
    console.log(error);

    return error;
  } finally {
    setLoading(false);
  }
};

export const get_ticket_api = async (navigation, setLoading) => {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    navigation.replace("LandingPage");
  }

  // setLoading(true);
  try {
    const res = await axios.get(get_all_ticket, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    // setLoading(false);
    return res;
  } catch (error) {
    // setLoading(false);
    return error;
  } finally {
  }
};

export const update_ticket_api = async (
  navigation,
  ticketStatus,
  ticketResponse,
  ticketId
  // setLoading
) => {
  const token = await AsyncStorage.getItem("token");
  console.log(ticketStatus, ticketResponse, ticketId);

  if (!token) {
    navigation.replace("LandingPage");
  }

  const formData = new FormData();
  formData.append("ticketStatus", ticketStatus);
  formData.append("ticketResponse", ticketResponse);
  formData.append("id", ticketId);

  // setLoading(true);
  try {
    const res = await axios.post(update_ticket, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    });

    return res;
  } catch (error) {
    console.log(error);

    return error;
  } finally {
    // setLoading(false);
  }
};
