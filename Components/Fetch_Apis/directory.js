import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { base_url } from "../base_url";
import { LOADER_VISIABLE } from "../Store/Actions/Action_types";

export const directory = async (navigation, dispatch) => {
  const token = await AsyncStorage.getItem("token");
  console.log("Directory data");

  if (!token) {
    navigation.replace("LandingPage");
  }
  try {
    dispatch({
      type: LOADER_VISIABLE,
      payload: true
    });
    const res = await axios.get(`${base_url}/syndic/vendors`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("Directory data", res.data);

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

export const Create_Directory_api = async (form, navigation, dispatch) => {
  const token = await AsyncStorage.getItem("token");
  console.log("Create Directory data");

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
    formData.append("serviceType", form.serviceType);
    formData.append("availability", form.availability);
    formData.append("buildingId", form.buildingId);
    formData.append("type", form.type);
    formData.append("phoneNumber", form.phoneNumber);

    const res = await axios.post(`${base_url}/syndic/addDirectory`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    });
    console.log("Create Directory data", res.data);

    return res;
  } catch (error) {
    return error;
  } finally {
    dispatch({
      type: LOADER_VISIABLE,
      payload: false
    });
  }
};

export const update_Directory_api = async (form, navigation, dispatch) => {
  const token = await AsyncStorage.getItem("token");
  console.log("Create Directory data", form);

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

    const res = await axios.put(
      `${base_url}/syndic/updateDirectory/${form.id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      }
    );
    console.log("update Directory data response", res.data);

    return res;
  } catch (error) {
    console.log(error?.response);

    return error;
  } finally {
    dispatch({
      type: LOADER_VISIABLE,
      payload: false
    });
  }
};
