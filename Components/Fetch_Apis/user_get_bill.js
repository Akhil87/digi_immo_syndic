import axios from "axios";
import { base_url } from "../base_url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOADER_VISIABLE } from "../Store/Actions/Action_types";

export const user_get_bills = async (navigation) => {
  const token = await AsyncStorage.getItem("token");
  console.log(token);

  if (!token) {
    navigation.replace("LandingPage");
  }
  try {
    // const res = await axios.get(`${base_url}/api/users/getBills`, {

    const res = await axios.get(`${base_url}/api/charges`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res.data;
  } catch (error) {
    return error;
  } finally {
  }
};

export const user_pay_bills = async (navigation, billId) => {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    navigation.replace("LandingPage");
    return;
  }

  const formData = new FormData();
  formData.append("billId", billId);

  try {
    const res = await axios.post(`${base_url}/api/charges`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    });

    console.log("✅ Payment Success:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Payment Error:", error.response?.data || error.message);
  }
};

export const pay_All_bills = async (navigation, dispatch) => {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    navigation.replace("LandingPage");
    return;
  }

  try {
    dispatch({
      type: LOADER_VISIABLE,
      payload: true
    });
    const res = await axios.get(`${base_url}/api/charges/payAll`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    });

    console.log("✅ Payment Success:", res.data);
    return res;
  } catch (error) {
    console.error("❌ Payment Error:", error.response?.data || error.message);
    dispatch({
      type: LOADER_VISIABLE,
      payload: false
    });
  } finally {
  }
};
