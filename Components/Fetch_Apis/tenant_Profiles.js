import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { base_url } from "../base_url";
import {
  LOADER_VISIABLE,
  TENANTS_ALL,
  TENANTS_DETAILS
} from "../Store/Actions/Action_types";

export const tenants = async (navigation, dispatch) => {
  const token = await AsyncStorage.getItem("token");
  if (!token) {
    navigation.replace("LandingPage");
  }
  try {
    const res = await axios.get(`${base_url}/api/tenants/all`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch({
      type: TENANTS_ALL,
      payload: res?.data
    });
    return res.data;
  } catch (error) {
    return error;
  } finally {
  }
};

export const tenants_approve = async (navigation, id, dispatch) => {
  const token = await AsyncStorage.getItem("token");

  console.log("test");
  if (!token) {
    navigation.replace("LandingPage");
  }
  try {
    dispatch({
      type: LOADER_VISIABLE,
      payload: true
    });
    const res = await axios.get(`${base_url}/api/tenants/approve/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    dispatch({
      type: TENANTS_DETAILS,
      payload: res?.data
    });
    dispatch({
      type: LOADER_VISIABLE,
      payload: false
    });

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

export const tenants_delete = async (navigation, id, dispatch) => {
  try {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      navigation.replace("LandingPage");
      return;
    }

    dispatch({
      type: LOADER_VISIABLE,
      payload: true
    });

    const res = await axios.delete(`${base_url}/api/tenants/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log("Deleted tenant:", res);

    navigation.goBack();
    return res.data;
  } catch (error) {
    console.error("error", error);
    console.error("Error deleting tenant:", error?.response || error.message);
    return error?.response?.data || error.message;
  } finally {
    dispatch({
      type: LOADER_VISIABLE,
      payload: false
    });
  }
};
