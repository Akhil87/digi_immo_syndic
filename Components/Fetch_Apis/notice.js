import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { base_url } from "../base_url";
import { LOADER_VISIABLE } from "../Store/Actions/Action_types";

export const notices = async (navigation, dispatch) => {
  const token = await AsyncStorage.getItem("token");
  console.log(token);

  if (!token) {
    navigation.replace("LandingPage");
  }
  try {
    dispatch({
      type: LOADER_VISIABLE,
      payload: true
    });

    const res = await axios.get(`${base_url}/syndic/notice`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    // console.log(res.data);

    return res.data;
  } catch (error) {
    return error;
  } finally {
    dispatch({
      type: LOADER_VISIABLE,
      payload: false
    });
  }
};

const createNotice = async (form, navigation, dispatch) => {
  const token = await AsyncStorage.getItem("token");
  console.log(token);

  if (!token) {
    navigation.replace("LandingPage");
  }

  try {
    dispatch({
      type: LOADER_VISIABLE,
      payload: true
    });
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("contactPerson", form.contactPerson);
    formData.append("email", form.email);
    formData.append("phoneNumber", form.phoneNumber);
    // formData.append("serviceType", form.serviceType);
    // formData.append("availability", form.availability);
    // formData.append("buildingId", form.buildingId);
    // formData.append("type", form.type);
    
    const res = await axios.post(`${base_url}/syndic/uploadNotice`, form, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    // console.log(res.data);

    return res.data;
  } catch (error) {
    return error;
  } finally {
    dispatch({
      type: LOADER_VISIABLE,
      payload: false
    });
  }
};
