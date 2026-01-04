import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import BackButton from "../../../Elements/BackButton";
import { Card, TextInput } from "react-native-paper";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  comments_forums,
  downvote_forums_api,
  get_all_replies,
  upvote_forums_api,
} from "../../../Fetch_Apis/Forums";
import CustomSnackbar from "../../../UserInterface/SnackBar";
import Entypo from "@expo/vector-icons/Entypo";

const Comments = ({ navigation, route }) => {
  const theme = useColorScheme();
  const post_Id = route?.params?.post_Id;
  const post_Data = route?.params?.item;

  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [message, setMessage] = useState("");

  const [text, setText] = useState("");
  const [comment, setComment] = useState(null);

  const [wishlist, setWishlist] = useState(false);

  const [loading, setLoading] = useState(false);

  const [commentReplyId, setCommentReplyId] = useState(null);
  const inputRef = useRef(null);

  const handle_replies = async () => {
    const rs = await get_all_replies(navigation, post_Id, setLoading);

    if (rs.status === 200) {
      console.log(rs.data);
      setComment(rs?.data);
    }
  };
  useEffect(() => {
    handle_replies();
  }, []);

  const handle_upvote = async (post_Id) => {
    console.log("Upvoting post ID:", post_Id);

    const rs = await upvote_forums_api(navigation, post_Id);
    console.log("Upvote API Response:", rs);

    if (!rs || !rs.data) {
      setMessage("Already Liked!");
      setSnackBarVisible(true);
      return;
    }

    setMessage("Liked!");
    setSnackBarVisible(true);

    // Update post data with API response
    setComment((prevComment) => ({
      ...prevComment,
      upvoteCount: rs.data.upvoteCount,
      downvoteCount: rs.data.downvoteCount,
      userHasUpvoted: true,
      userHasDownvoted: false,
    }));
  };

  const handle_downvote = async (post_Id) => {
    console.log("Downvoting post ID:", post_Id);

    const rs = await downvote_forums_api(navigation, post_Id);
    console.log("Downvote API Response:", rs);

    if (!rs || !rs.data) {
      setMessage("Action failed!");
      setSnackBarVisible(true);
      return;
    }

    setMessage("Disliked!");
    setSnackBarVisible(true);

    // Update post data with API response
    setComment((prevComment) => ({
      ...prevComment,
      downvoteCount: rs.data.downvoteCount,
      upvoteCount: rs.data.upvoteCount,
      userHasDownvoted: true,
      userHasUpvoted: false,
    }));
  };

  const handlePostData = async () => {
    const rs = await comments_forums(navigation, post_Id, text);
    console.log(rs);
    if (rs.status === 200) {
      await handle_replies();
      setText(null);
    }
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: theme === "dark" ? "black" : "white" }}
    >
      {/* <StatusBar barStyle="light-content" backgroundColor="transparent" /> */}
      {/* <BackButton navigation={navigation} title="Replies" /> */}
      <ScrollView contentContainerStyle={{ paddingBottom: 70 }}>
        <View
          style={{
            padding: 10,
            margin: 20,
            // backgroundColor: "rgb(248, 247, 247))",
            elevation: 0,
          }}
        >
          {/* <View style={{ paddingHorizontal: 10 }}> */}
          <View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <View style={{ position: "relative" }}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: "gray",
                    borderRadius: 25,
                    marginRight: 10,
                  }}
                />
                <View
                  style={{
                    width: 15,
                    height: 15,
                    // backgroundColor:
                    //   index % 2 === 0 ? "rgb(2, 255, 23)" : "rgb(2, 204, 255)",
                    borderRadius: 25,
                    position: "absolute",
                    bottom: 3,
                    right: 8,
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: Math.min(
                        Dimensions.get("window").width * 0.041,
                        16
                      ),
                      color: theme === "dark" ? "white" : "black",
                    }}
                  >
                    {post_Data?.user?.firstName} {post_Data?.user?.lastName}
                  </Text>
                  <Text
                    style={{
                      fontWeight: "600",
                      fontSize: Math.min(
                        Dimensions.get("window").width * 0.031,
                        12
                      ),
                      color: "rgb(165, 163, 163)",
                    }}
                  >
                    {new Date(post_Data?.createdPostAt).toLocaleDateString()},{" "}
                    {new Date(post_Data?.createdPostAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {/* 12/02/2025 */}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => setWishlist(!wishlist)}>
                  <AntDesign
                    name={wishlist ? "heart" : "hearto"}
                    size={24}
                    color="rgb(247, 50, 148)"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ flex: 1, paddingHorizontal: 10, marginTop: 15 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: Math.min(
                        Dimensions.get("window").width * 0.041,
                        16
                      ),
                      color: theme === "dark" ? "white" : "black",
                    }}
                  >
                    {post_Data?.forumTitle}
                  </Text>
                  <Text
                    style={{
                      fontWeight: "600",
                      color: "rgb(182, 182, 182)",
                    }}
                  >
                    {post_Data?.postContent}
                  </Text>
                </View>
              </View>
              {post_Data?.photo && (
                <Image
                  source={{ uri: post_Data.photo }}
                  style={{
                    width: "100%",
                    height: 400,
                    borderRadius: 10,
                    marginTop: 10,
                  }}
                  resizeMode="cover"
                />
              )}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 20,
                  borderTopColor: "rgb(219, 219, 219)",
                  borderTopWidth: 1,
                  paddingVertical: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 20,
                  }}
                >
                  <View
                    style={{
                      fontWeight: "600",
                      fontSize: Math.min(
                        Dimensions.get("window").width * 0.03,
                        12
                      ),
                      color: "rgb(80, 80, 80)",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        handle_upvote(item?.id);
                      }}
                    >
                      <AntDesign name="like2" size={24} color="black" />
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontWeight: "600",
                        fontSize: Math.min(
                          Dimensions.get("window").width * 0.03,
                          12
                        ),
                        color: "rgb(80, 80, 80)",
                      }}
                    >
                      {/* {item?.upvoteCount} */}1
                    </Text>
                  </View>
                  <View
                    style={{
                      fontWeight: "600",
                      fontSize: Math.min(
                        Dimensions.get("window").width * 0.03,
                        12
                      ),
                      color: "rgb(80, 80, 80)",
                      flexDirection: "row",
                      gap: 5,
                    }}
                  >
                    <TouchableOpacity onPress={() => handle_downvote(item?.id)}>
                      <AntDesign name="dislike2" size={24} color="black" />
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontWeight: "600",
                        fontSize: Math.min(
                          Dimensions.get("window").width * 0.03,
                          12
                        ),
                        color: "rgb(80, 80, 80)",
                      }}
                    >
                      {/* {item?.downvoteCount} */} 2
                    </Text>
                  </View>
                  <View
                    style={{
                      fontWeight: "600",
                      fontSize: Math.min(
                        Dimensions.get("window").width * 0.03,
                        12
                      ),
                      color: "rgb(80, 80, 80)",
                      flexDirection: "row",
                      gap: 5,
                    }}
                  >
                    <TouchableOpacity
                    // onPress={() => handle_downvote(item?.id)}
                    >
                      <FontAwesome name="comments-o" size={24} color="black" />
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontWeight: "600",
                        fontSize: Math.min(
                          Dimensions.get("window").width * 0.03,
                          12
                        ),
                        color: "rgb(80, 80, 80)",
                      }}
                    >
                      {/* {item?.downvoteCount} */}
                    </Text>
                  </View>
                </View>
              </View>
              <View></View>
            </View>
          </View>
          {/* </View> */}
          <Text style={{ fontWeight: "bold", color: "rgb(105, 104, 104)" }}>
            Comments
          </Text>
          {Array.isArray(comment) &&
            comment?.map((item, index) => {
              return (
                <View
                  style={{
                    marginLeft: 20,
                    marginTop: 0,
                    flexDirection: "row",
                    alignItems: item?.postContent?.length > 30 ? "" : "center",
                  }}
                  key={index}
                >
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      backgroundColor: "gray",
                      borderRadius: 25,
                      marginRight: 10,
                      marginTop: item?.postContent?.length > 30 ? 15 : 0,
                    }}
                  />
                  <View
                    style={{
                      maxWidth: "89%",
                      // backgroundColor: "rgb(231, 230, 230)",
                      padding: 10,
                      borderRadius: 10,
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      {item?.parent?.user?.firstName}{" "}
                      {item?.parent?.user?.lastName}
                    </Text>
                    <Text style={{}}>{item?.postContent}</Text>
                    {/* <TouchableOpacity
                      style={{ marginTop: 5 }}
                      onPress={() => {
                        console.log("press");

                        setCommentReplyId(item?.id);
                        setTimeout(() => {
                          inputRef.current?.focus();
                        }, 100);
                      }}
                    >
                      {/* <Entypo name="reply" size={24} color="rgb(53, 52, 52)" /> 
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "bold",
                          color: "rgb(78, 78, 78)"
                        }}
                      >
                        {" "}
                        Reply
                      </Text>
                    </TouchableOpacity> */}
                  </View>
                </View>
              );
            })}
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 20,
          left: 0,
          right: 0,
          zIndex: 100,
          elevation: 10,
        }}
      >
        <CustomSnackbar
          message={message}
          visible={snackBarVisible}
          onDismissSnackBar={() => setSnackBarVisible(false)}
        />
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 20,
          alignItems: "center",
          gap: 20,
          flex: 1,
          width: Dimensions.get("window").width,
        }}
      >
        <TextInput
          ref={inputRef}
          value={text}
          onChangeText={setText}
          style={{ width: Dimensions.get("window").width / 1.1, height: 60 }}
          mode="outlined"
          placeholder="Write a comment here ...."
          right={
            <TextInput.Icon
              icon="send"
              onPress={() => {
                commentReplyId ? "" : handlePostData();
              }}
            />
          }
        />
      </View>
    </View>
  );
};

export default Comments;
