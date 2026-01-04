import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  BackHandler,
  Alert,
  useColorScheme
} from "react-native";
import { Card } from "react-native-paper";
import BottomNavigator from "../../Elements/BottomNavigation";
import ProfilePage from "./ProfilePage";
import Home from "./Home";
import Header from "../../Elements/Header";
import { Stagger } from "@animatereactnative/stagger";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import AntDesign from "@expo/vector-icons/AntDesign";
import { get_user_details } from "../../Fetch_Apis/get_user_details";
import { useSelector } from "react-redux";

const Dashboard = ({ navigation }) => {
  const [page, setPage] = useState("Home");
  const navigator = useNavigation();

  const [visibleTitle, setVisibleTitle] = useState(true);
  const [editProfile, setEditProfile] = useState(false);

  const [userUpdate, setUserUpdate] = useState(null);

  const theme = useColorScheme();
  const { t } = useTranslation();

  
  

  useEffect(() => {
    navigator.addListener("state", (event) => {
      const routes = event.data.state.routes;
      const currentIndex = event.data.state.index;
      const currentRouteName = routes[currentIndex].name;

      if (currentRouteName == "Dashboard" && page === "Home") {
        // setFabVisible(true);
        setVisibleTitle(true);
      } else {
        // setFabVisible(false);
        setVisibleTitle(false);
      }
    });
  }, []);

  useEffect(() => {
    if (editProfile) {
      setVisibleTitle(false);
    } else {
      setVisibleTitle(true);
    }

    if (page !== "ProfilePage") {
      setEditProfile(false);
      setUserUpdate(null);
    }
  }, [page, editProfile]);

  const renderPage = () => {
    switch (page) {
      case "Home":
        return <Home navigation={navigation} />;
      case "ProfilePage":
        return (
          <ProfilePage
            navigation={navigation}
            setEditProfile={setEditProfile}
            editProfile={editProfile}
            setUserUpdate={setUserUpdate}
          />
        );
      default:
        return <Home navigation={navigation} />;
    }
  };

  useEffect(() => {
    const backAction = () => {
      const canGoBack = navigator.canGoBack();

      if (canGoBack) {
        navigator.goBack();
      } else {
        Alert.alert(`${t("hold_on")}`, `${t("exit_confirmation")}`, [
          { text: `${t("cancel")}`, onPress: () => null, style: "cancel" },
          { text: `${t("yes")}`, onPress: () => BackHandler.exitApp() }
        ]);
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigator]);

  const [syndicLogo, setSyndicLogo] = useState(null);

  // const getUser = async () => {
  //   const rs = await get_user_details();
  //   console.log(rs?.data?.building?.syndicLogo);
  //   setSyndicLogo(rs?.data?.building?.syndicLogo);
  // };

  // useEffect(() => {
  //   getUser();
  // }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme === "dark" ? "#1c1c1c" : "rgb(252, 248, 248)"
      }}
    >
      <View
        style={[
          styles.headerContainer,
          { backgroundColor: theme === "dark" ? "#1c1c1c" : "rgb(252, 248, 248)" }
        ]}
      >
        <Header
          visiable={
            (page === "Home" || page === "Withdraw" || page === "Deposit") &&
            visibleTitle
              ? true
              : false
          }
          // syndicLogo={syndicLogo}
        />
      </View>
      {/* Profile Logout  */}
      {/* {page === "ProfilePage" && (
        <View style={{ position: "absolute", right: 20, top: 50, zIndex: 10 }}>
          {editProfile ? (
            <TouchableOpacity
              onPress={() => {
                setEditProfile(false);
              }}
              style={{
                backgroundColor: "blue",
                padding: 10,
                borderRadius: "50%"
              }}
            >
              <AntDesign name="save" size={30} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                AsyncStorage.clear();
                navigation.replace("LandingPage");
              }}
            >
              <Image source={require("../../Assests/logout.png")} />
            </TouchableOpacity>
          )}
        </View>
      )} */}
      {page !== "ProfilePage" ? (
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              width: "100%",
              backgroundColor: theme === "dark" ? "#1c1c1c" : "white"
            }}
          >
            {renderPage()}
          </View>
        </ScrollView>
      ) : (
        <>{renderPage()}</>
      )}
      {/* Bottom Navigator */}
      <Stagger style={styles.bottomNavigatorContainer}>
        <BottomNavigator visibleTitle={visibleTitle} handleTabPress={setPage} />
      </Stagger>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingTop: 60,
    paddingBottom: 80
  },
  bottomNavigatorContainer: {
    position: "absolute",
    bottom: 10,
    left: 0,
    width: "100%",
    backgroundColor: "transparent"
  }
});

export default Dashboard;
