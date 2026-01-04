import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  StatusBar,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  ScrollView
} from "react-native";
import { Card } from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";
import BackButton from "../../Elements/BackButton";
import {
  downvote_forums_api,
  forums_Api,
  upvote_forums_api
} from "../../Fetch_Apis/Forums";
import CustomSnackbar from "../../UserInterface/SnackBar";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Custom_add_icon from "../../UserInterface/Custom_add_icon";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

// UI enhancements for a Reddit-like experience
const Forums = ({ navigation }) => {
  const theme = useColorScheme();
  const [wishlist, setWishlist] = useState(false);

  const [forums, setForums] = useState(null);

  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [message, setMessage] = useState("");

  const [fullScreenImage, setFullScreenImage] = useState(null);
  const [isImageModalVisible, setImageModalVisible] = useState(false);

  const [toggle, setToggle] = useState(false);

  const handle_Forums_api = async () => {
    try {
      const rs = await forums_Api(navigation);
      if (rs?.data) {
        const updatedForums = rs.data.map((post) => ({
          ...post,
          userHasUpvoted: post.userReaction === "upvote",
          userHasDownvoted: post.userReaction === "downvote"
        }));
        setForums(updatedForums);
      } else {
        setForums([]);
      }
    } catch (error) {
      console.error("Error fetching forums:", error);
    }
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    console.log(toggle);
    if (isFocused || toggle) {
      handle_Forums_api();
    }
  }, [isFocused, toggle]);

  const handle_upvote = async (id) => {
    console.log("Upvoting post ID:", id);

    const rs = await upvote_forums_api(navigation, id);
    console.log("Upvote API Response:", rs?.data);

    if (!rs || !rs.data) {
      setMessage("Already Liked!");
      setSnackBarVisible(true);
      return;
    }

    setMessage("Liked!");
    setSnackBarVisible(true);
    setToggle((prev) => !prev);

    setForums((prevForums) =>
      prevForums.map((post) =>
        post.id === id
          ? {
              ...post,
              upvoteCount: rs.data.upvoteCount,
              downvoteCount: rs.data.downvoteCount,
              userHasUpvoted: true,
              userHasDownvoted: false
            }
          : post
      )
    );
  };

  const handle_downvote = async (id) => {
    console.log("Downvoting post ID:", id);

    const rs = await downvote_forums_api(navigation, id);
    console.log("Downvote API Response:", rs);

    if (!rs || !rs.data) {
      setMessage("Action failed!");
      setSnackBarVisible(true);
      return;
    }

    setMessage("Disliked!");
    setSnackBarVisible(true);
    setToggle((prev) => !prev);

    setForums((prevForums) =>
      prevForums.map((post) =>
        post.id === id
          ? {
              ...post,
              downvoteCount: rs.data.downvoteCount,
              upvoteCount: rs.data.upvoteCount,
              userHasDownvoted: true,
              userHasUpvoted: false
            }
          : post
      )
    );
  };

  const scrollOffset = useRef(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const isScrollingDown = currentOffset > scrollOffset.current;

    // Animate text fade-out when scrolling down
    Animated.timing(fadeAnim, {
      toValue: isScrollingDown ? 0 : 1, // 0 = hide, 1 = show
      duration: 300, // Duration of animation
      useNativeDriver: true
    }).start();

    scrollOffset.current = currentOffset;
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: theme === "dark" ? "black" : "rgb(252, 248, 248)" }}
    >
      {/* <StatusBar barStyle="light-content" backgroundColor="transparent" /> */}
      <BackButton navigation={navigation} title="Forums" />

      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingVertical: 20 }}
      >
        {Array.isArray(forums) &&
          forums?.map((item, index) => {
            return (
              // <Card
              //   style={{
              //     marginTop: 10,
              //     padding: 15,
              //     marginHorizontal: 10,
              //     backgroundColor: theme === "dark" ? "rgb(28, 28, 28)" : "rgb(248, 247, 247)",
              //     borderRadius: 8
              //   }}
              //   key={index}
              // >
              <TouchableOpacity
                style={{
                  marginTop: 0,
                  padding: 15,
                  paddingHorizontal: 20,
                  // backgroundColor:
                  //   theme === "dark" ? "rgb(28, 28, 28)" : "rgb(248, 247, 247)",
                  borderRadius: 8,
                  borderColor: "rgb(216, 216, 216)",
                  borderBottomWidth: 1
                }}
                key={index}
                onPress={() => {
                  navigation.navigate("Comments", {
                    post_Id: item?.id,
                    item: item
                  });
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: "gray",
                      borderRadius: 25,
                      marginRight: 10,
                      marginLeft: -5
                    }}
                  >
                    <Image
                      source={{ uri: item?.user?.profilePicture }}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 25
                      }}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 16,
                        color: theme === "dark" ? "white" : "black"
                      }}
                    >
                      {item?.user?.firstName}
                    </Text>
                    <Text
                      style={{
                        fontWeight: "600",
                        fontSize: 12,
                        color: "rgb(165, 163, 163)"
                      }}
                    >
                      {new Date(item?.createdPostAt).toLocaleDateString()},{" "}
                      {new Date(item?.createdPostAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </Text>
                  </View>
                  {/* <TouchableOpacity onPress={() => setWishlist(!wishlist)}>
                    <AntDesign
                      name={wishlist ? "heart" : "hearto"}
                      size={24}
                      color="rgb(247, 50, 148)"
                    />
                  </TouchableOpacity> */}
                </View>

                <View style={{ marginTop: 10 }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 16,
                      color: theme === "dark" ? "white" : "black"
                    }}
                  >
                    {item?.forumTitle}
                  </Text>
                  <Text
                    style={{
                      fontWeight: "600",
                      color: theme === "dark" ? "white" : "rgb(100, 100, 100)"
                    }}
                  >
                    {item?.postContent}
                  </Text>
                </View>

                {item?.photo && (
                  <TouchableOpacity
                    onPress={() => {
                      setFullScreenImage(item?.photo);
                      setImageModalVisible(true);
                    }}
                    style={{
                      width: "100%",
                      height: 200,
                      marginTop: 20
                    }}
                  >
                    <Image
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 10
                      }}
                      source={{ uri: item?.photo }}
                    />
                  </TouchableOpacity>
                )}

                {/* <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 10,
                    // borderTopColor: "rgb(219, 219, 219)",
                    // borderTopWidth: 1,
                    paddingVertical: 10
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      gap: 15
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 15,
                        alignItems: "center",
                        // borderWidth: 0.5,
                        borderColor: "rgb(180, 180, 180)",
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 50
                      }}
                    >
                      <TouchableOpacity onPress={() => handle_upvote(item?.id)}>
                        <AntDesign
                          name={item.userHasUpvoted ? "like1" : "like2"}
                          size={24}
                          color={
                            item.userHasUpvoted ? "blue" : "rgb(104, 103, 103)"
                          }
                        />
                      </TouchableOpacity>

                      <Text
                        style={{
                          fontWeight: "600",
                          fontSize: 12,
                          color: "rgb(80, 80, 80)"
                        }}
                      >
                        {item?.upvoteCount}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 5,
                        alignItems: "center"
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => handle_downvote(item?.id)}
                      >
                        <AntDesign
                          name={item.userHasDownvoted ? "dislike1" : "dislike2"}
                          size={24}
                          color={
                            item.userHasDownvoted ? "red" : "rgb(104, 103, 103)"
                          }
                        />
                      </TouchableOpacity>

                      <Text
                        style={{
                          fontWeight: "600",
                          fontSize: 12,
                          color: "rgb(80, 80, 80)"
                        }}
                      >
                        {item?.downvoteCount}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 5,
                        alignItems: "center"
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("Comments", {
                            post_Id: item?.id,
                            item: item
                          });
                        }}
                      >
                        <FontAwesome
                          name="comments-o"
                          size={24}
                          color="rgb(104, 103, 103)"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View> */}
              </TouchableOpacity>
              // </Card>
            );
          })}
      </ScrollView>

      {/* Full-Screen Image Modal */}
      {fullScreenImage && (
        <Modal
          visible={isImageModalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setImageModalVisible(false)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.7)"
            }}
          >
            <Image
              style={{ width: "90%", height: "90%" }}
              source={{ uri: fullScreenImage }}
            />
            <TouchableOpacity
              onPress={() => setImageModalVisible(false)}
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                padding: 10,
                borderRadius: 50
              }}
            >
              <AntDesign name="closecircle" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </Modal>
      )}

      <CustomSnackbar
        visible={snackBarVisible}
        message={message}
        onDismiss={() => setSnackBarVisible(false)}
      />
      {/* <Custom_add_icon
        navigation={navigation}
        navigatePath={"Create_Forums"}
        fadeAnim={fadeAnim}
      /> */}
    </View>
  );
};

export default Forums;
