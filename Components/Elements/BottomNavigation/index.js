import React, { useState, useEffect } from "react";
import {
  Animated,
  Appearance,
  Dimensions,
  Easing,
  Image,
  TouchableOpacity,
  View
} from "react-native";
import { Card } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Stagger } from "@animatereactnative/stagger";
import { themeColor } from "../../UserInterfase/ThemeColor";

const BottomNavigator = ({ visibleTitle, handleTabPress }) => {
  const [visible, setVisible] = useState(visibleTitle);
  const [page, setPage] = useState("Home");

  const windowWidth = Dimensions.get("window").width;
  const iconSize = Math.min(windowWidth * 0.07, 40);

  useEffect(() => {
    handleTabPress(page);
  }, [page]);

  const [themeState, setThemeState] = useState(Appearance.getColorScheme());
  const animatedPosition = useState(new Animated.Value(0))[0];

  const animateNavbar = () => {
    Animated.timing(animatedPosition, {
      toValue: visibleTitle ? 0 : -115,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false
    }).start();
  };

  useEffect(() => {
    animateNavbar();
  }, [visibleTitle]);

  useEffect(() => {
    Appearance.addChangeListener(() => {
      setThemeState(Appearance.getColorScheme());
    });
  }, []);

  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Animated.View
        style={{
          bottom: animatedPosition
        }}
      >
        <Card
          style={{
            backgroundColor: themeState === "dark" ? "#414141" : themeColor,
            width: windowWidth - 40,
            height: 70,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 0.5,
            borderColor: themeState === "dark" ? "white" : "black"
          }}
        >
          <Stagger
            enabled={false}
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              width: "90%",
              height: "100%",
              alignSelf: "center"
            }}
          >
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                borderTopColor: themeState === "dark" ? "white" : "black",
                borderTopWidth: page == "Home" ? 3 : 0,
                height: "100%",
                width: "20%"
              }}
              onPress={() => setPage("Home")}
            >
              <Feather name="home" size={iconSize} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: "20%",
                borderTopColor: themeState === "dark" ? "white" : "green",
                borderTopWidth: page == "Deposit" ? 3 : 0
              }}
              onPress={() => setPage("Deposit")}
            >
              <Image
                style={{
                  height: iconSize,
                  width: iconSize,
                  tintColor: "black"
                }}
                source={require("../../Assests/icon2.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: "20%",
                borderTopColor: themeState === "dark" ? "white" : "red",
                borderTopWidth: page == "Withdraw" ? 3 : 0
              }}
              onPress={() => setPage("Withdraw")}
            >
              <Image
                style={{
                  height: iconSize,
                  width: iconSize,
                  tintColor: "black"
                }}
                source={require("../../Assests/icon3.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: "20%",
                borderTopColor: themeState === "dark" ? "white" : "black",
                borderTopWidth: page == "ProfilePage" ? 3 : 0
              }}
              onPress={() => setPage("ProfilePage")}
            >
              <FontAwesome6
                name="user"
                size={iconSize}
                color="black"
                type="regular"
              />
            </TouchableOpacity>
          </Stagger>
        </Card>
      </Animated.View>
    </View>
  );
};

export default BottomNavigator;
