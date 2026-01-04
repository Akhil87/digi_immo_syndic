import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { base_url } from "../base_url";
import {
  GET__POLLS_RESULT,
  GET_ALL_POLLS,
  LOADER_VISIABLE,
  MEETINGS,
  SINGLE_MEETINGS,
  TENANTS_ALL
} from "../Store/Actions/Action_types";

export const meetings_get = async (navigation, dispatch) => {
  const token = await AsyncStorage.getItem("token");
  console.log("meeting", token);

  if (!token) {
    navigation.replace("LandingPage");
  }
  try {
    dispatch({
      type: LOADER_VISIABLE,
      payload: true
    });
    const res = await axios.get(`${base_url}/syndic/getMeetings`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch({
      type: MEETINGS,
      payload: res?.data
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

export const single_meeting = async (navigation, dispatch, meetingId) => {
  const token = await AsyncStorage.getItem("token");
  console.log("meetingabcd", token);

  if (!token) {
    navigation.replace("LandingPage");
  }
  try {
    dispatch({
      type: LOADER_VISIABLE,
      payload: true
    });
    const res = await axios.get(`${base_url}/api/meetings/${meetingId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch({
      type: SINGLE_MEETINGS,
      payload: res?.data
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    dispatch({
      type: LOADER_VISIABLE,
      payload: false
    });
  }
};

export const Add_agenda = async (navigation, dispatch, ID, agenda) => {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    navigation.replace("LandingPage");
  }
  try {
    dispatch({
      type: LOADER_VISIABLE,
      payload: true
    });
    const formData = new FormData();
    formData.append("agenda", agenda);
    const res = await axios.post(
      `${base_url}/api/meetings/${ID}/addAgenda`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      }
    );

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

export const fetchMeetingData = async (navigation, dispatch, meetingID) => {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    navigation.replace("LandingPage");
    return;
  }

  dispatch({ type: LOADER_VISIABLE, payload: true });

  const headers = {
    Authorization: `Bearer ${token}`
  };

  try {
    const [pollsRes, agendasRes, votesRes] = await Promise.all([
      axios.get(`${base_url}/api/meetings/${meetingID}/polls`, { headers }),
      axios.get(`${base_url}/api/meetings/${meetingID}/getAgenda`, { headers }),
      axios.get(`${base_url}/api/meetings/votes/${meetingID}`, { headers })
    ]);

    // Dispatch polls data if needed
    dispatch({
      type: GET_ALL_POLLS,
      payload: pollsRes?.data
    });

    return {
      polls: pollsRes?.data,
      agendas: agendasRes?.data,
      votes: votesRes?.data
    };
  } catch (error) {
    return { error };
  } finally {
    dispatch({ type: LOADER_VISIABLE, payload: false });
  }
};

export const poll_Vote = async (navigation, dispatch, ID, selectedOption) => {
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

    const res = await axios.post(
      `${base_url}/api/meetings/${ID}/vote?option=${selectedOption}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

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

export const poll_Result = async (navigation, dispatch, ID) => {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    navigation.replace("LandingPage");
  }
  try {
    dispatch({
      type: LOADER_VISIABLE,
      payload: true
    });

    const res = await axios.get(`${base_url}/syndic/${ID}/results`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const convertToArray = Object.entries(res?.data).map(
      ([question, response]) => ({
        [question]: response
      })
    );
    dispatch({
      type: GET__POLLS_RESULT,
      payload: convertToArray
    });

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
