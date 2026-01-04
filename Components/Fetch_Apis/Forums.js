import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  base_url,
  comment_forums,
  create__forums,
  downvote_forums,
  forums_Api_all,
  replies_forums,
  upvote_forums,
} from "../base_url";

export const forums_Api = async (navigation) => {
  const token = await AsyncStorage.getItem("token");
  if (!token) {
    navigation.replace("LandingPage");
  }
  try {
    const res = await axios.get(forums_Api_all, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (error) {
    console.log(error.response);

    return error;
  } finally {
  }
};

export const upvote_forums_api = async (navigation, id) => {
  const token = await AsyncStorage.getItem("token");
  if (!token) {
    navigation.replace("LandingPage");
  }
  try {
    const res = await axios.get(
      upvote_forums + `?Id=${id}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    // console.log("error :", error.response.data);
    return error;
  }
};

export const downvote_forums_api = async (navigation, id) => {
  const token = await AsyncStorage.getItem("token");
  if (!token) {
    navigation.replace("LandingPage");
  }
  try {
    const res = await axios.get(
      downvote_forums + `?Id=${id}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    return error;
  }
};

export const get_all_replies = async (navigation, id) => {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    navigation.replace("LandingPage");
  }
  try {
    const res = await axios.get(
      replies_forums + `/${id}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    return error;
  }
};

export const comments_forums = async (navigation, id, text) => {
  const token = await AsyncStorage.getItem("token");
  console.log(id, text);

  if (!token) {
    navigation.replace("LandingPage");
  }
  const formdata = new FormData();
  formdata.append("postContent", text);
  formdata.append("parentId", id);
  try {
    const res = await axios.post(comment_forums, formdata, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const create_forum_api = async (navigation, title, content, file) => {
  const token = await AsyncStorage.getItem("token");
  if (!token) {
    navigation.replace("LandingPage");
    return;
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("postContent", content);

  if (file?.uri) {
    formData.append("file", {
      uri: file.uri,
      name: file.name || "upload.jpg",
      type: file.type || "image/jpeg",
    });
  }

  try {
    const res = await axios.post(create__forums, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return res;
  } catch (error) {
    console.error(
      "Error creating forum:",
      error.response?.data || error.message
    );
    return error;
  }
};
