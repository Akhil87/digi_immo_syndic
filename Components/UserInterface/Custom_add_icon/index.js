import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { Animated, Dimensions, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";

const windowWidth = Dimensions.get("window").width;
const Custom_add_icon = ({ navigation, navigatePath, isScrolling }) => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: windowWidth * 0.05,
        right: windowWidth * 0.05,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.6}
        style={{ alignItems: "center" }}
        onPress={() => navigation.navigate(navigatePath)}
      >
        <View
          style={{
            backgroundColor: "#04344c",
            padding: Dimensions.get("window").width * 0.02,
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Entypo name="plus" size={30} color="white" />
        </View>
        {!isScrolling && (
          <Animated.View style={{ opacity: isScrolling ? 0 : 1 }}>
            <Text
              style={{
                marginTop: 10,
                fontWeight: "bold",
                fontSize: 16,
                color: "rgb(95, 95, 95)",
              }}
            >
              Add Post
            </Text>
          </Animated.View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Custom_add_icon;
