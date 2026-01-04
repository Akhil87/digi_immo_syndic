import AsyncStorage from "@react-native-async-storage/async-storage";
import { base_url } from "../base_url";
import { LOADER_VISIABLE } from "../Store/Actions/Action_types";
import axios from "axios";

export const buildings = async (navigation, dispatch) => {
  const token = await AsyncStorage.getItem("token");
  console.log("buildings data");

  if (!token) {
    navigation.replace("LandingPage");
  }
  try {
    dispatch({
      type: LOADER_VISIABLE,
      payload: true
    });
    const res = await axios.get(`${base_url}/syndic/buildings`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res.data;
  } catch (error) {
    console.log("Error Response:", error);
    return error;
  } finally {
    dispatch({
      type: LOADER_VISIABLE,
      payload: false
    });
  }
};
