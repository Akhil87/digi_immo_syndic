import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions, Linking, View } from "react-native";
import { Text } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { requestForegroundPermissionsAsync } from "expo-location";
import * as Location from "expo-location";
import stylesheet from "../../Styles";

import { useNavigation } from "@react-navigation/native"; // Add this hook for navigation
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const navigation = useNavigation();
  const Auth_reducer = useSelector((state) => state?.Auth_reducer);
  console.log("fdafadfafddafafasfaf:- ", Auth_reducer?.isLogin);

  // Function to handle location permission
  const LocationPermission = async () => {
    await requestForegroundPermissionsAsync().then((rs) => {
      if (!rs.granted) {
        alert("Please enable location permission to continue.");
        Linking.openSettings();
      } else {
        if (rs.canAskAgain) {
          Location.getForegroundPermissionsAsync();
        } else {
          console.log("Permission already granted");
        }
      }
    });
  };

  // const authCheck = async () => {
  //   const rs = await get_user_details();
  //   if (rs?.status === 200) {
  //     dispatch(login_action(true));
  //     dispatch(user_data_action(rs?.data));
  //     navigation.navigate("Login");
  //   } else {
  //     dispatch(login_action(false));
  //     navigation.navigate("LandingPage");
  //   }
  // };

  // Function to check if the user is logged in
  const checkLogin = async () => {
    const asyncStorage = await AsyncStorage.getItem("token");
    console.log("AsyncStorage Token:", Auth_reducer?.isLogin);
    // authCheck();
    // if (!asyncStorage) {
    //   navigation.replace("Onboarding");
    //   return;
    // }
    console.log(Auth_reducer?.isLoginChecked, Auth_reducer?.isLogin);

    setTimeout(() => {
      if (Auth_reducer?.isLoginChecked) {
        console.log("auth cehck",Auth_reducer?.isLoginChecked, Auth_reducer?.isLogin);
        if (Auth_reducer?.isLogin) {
          navigation.replace("Dashboard");
        } else {
          navigation.replace("Onboarding");
        }
      } else {
        navigation.replace("Onboarding");
      }
    }, 3000);
  };

  useEffect(() => {
    checkLogin();
    LocationPermission();
  }, [Auth_reducer?.isLoginChecked]);

  return (
    <SafeAreaView
      style={[
        stylesheet.container,
        { justifyContent: "space-around", paddingVertical: 20 }
      ]}
    >
      <LottieView
        source={require("../../Elements/Animations/landingPage.json")}
        style={{
          width: "100%",
          height: Dimensions.get("window").width - 20,
          height: "100%"
        }}
        loop
        autoPlay
      />
      <View style={{ alignItems: "center", gap: 20 }}>
        {/* Add other UI components here if needed */}
      </View>
    </SafeAreaView>
  );
};

export default LandingPage;
