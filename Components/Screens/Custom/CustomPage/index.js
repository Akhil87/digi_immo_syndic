import React, { useEffect, useRef } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  useColorScheme,
  Animated
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;

const CustomPage = ({ item, navigation }) => {
  const theme = useColorScheme();
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true
        }),
        Animated.timing(rotateAnim, {
          toValue: -1,
          duration: 100,
          useNativeDriver: true
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true
        })
      ])
    ).start();
  }, []);

  return (
    <TouchableOpacity
      style={styles.content}
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate("Open_PDF", {
          url: item?.url,
          description: item?.description
        });
      }}
    >
      <Animated.View
        style={[
          styles.iconContainer,
          {
            // backgroundColor: theme === "dark" ? "#2c2c2e" : "#f0f0f0",
            transform: [
              {
                rotate: rotateAnim.interpolate({
                  inputRange: [-1, 0, 1],
                  outputRange: ["-10deg", "0deg", "10deg"]
                })
              }
            ]
          }
        ]}
      >
        <MaterialIcons
          name="notifications-active"
          size={32}
          color={theme === "dark" ? "#fff" : "#04344c"}
        />
      </Animated.View>
      <View style={{ flex: 1 }}>
        <Text
          style={[styles.title, { color: theme === "dark" ? "#FFF" : "#111" }]}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {item?.title}
        </Text>
        <Text
          style={[
            styles.description,
            { color: theme === "dark" ? "#AAA" : "#555" }
          ]}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {item?.description ? item.description : "No description available"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 8,
    paddingHorizontal: windowWidth * 0.04
  },
  iconContainer: {
    width: Math.min(windowWidth * 0.18, 70),
    height: Math.min(windowWidth * 0.18, 70),
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontWeight: "600",
    fontSize: Math.min(windowWidth * 0.045, 18),
    marginBottom: 4
  },
  description: {
    fontWeight: "400",
    fontSize: Math.min(windowWidth * 0.04, 15)
  }
});

export default CustomPage;
