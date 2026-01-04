import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  Text,
  ScrollView
} from "react-native";
import { Button } from "react-native-paper";
import { Loader } from "../../../../UserInterface/loader";
import { CustomTextInput } from "../../../../UserInterface/customInput";
import CustomSnackbar from "../../../../UserInterface/SnackBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OtpModal from ".././OtpVerify";
import GradientBackground from "../../../../UserInterfase/App_bg";
import { useTranslation } from "react-i18next";
import { login } from "../../../../Fetch_Apis/login";
import { get_user_details } from "../../../../Fetch_Apis/get_user_details";
import { StatusBar } from "react-native";

const Login_email = ({ navigation }) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [verifyGmail, setVerifyGmail] = useState(false);
  const [otpVerify, setOtp] = useState("");
  const [otpValue, setotpValue] = useState(false);

  const onClose = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPassword("");
      if (otpVerify) {
        setotpValue(true);
      }
    }, 2000);
    setVerifyGmail(false);
  };

  const ShowSnackbar = (message) => {
    setMessage(message);
    setSnackBarVisible(true);
    setTimeout(() => {
      setSnackBarVisible(false);
    }, 5000);
  };

  const HandleLogin = async () => {
    try {
      setLoading(true);

      if (!email || !password) {
        ShowSnackbar("Please fill all the required details.");
        setLoading(false);
        return;
      }

      const rs = await login(email, password);

      if (rs?.status === 200) {
        await AsyncStorage.setItem("token", rs?.data?.token);
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "Dashboard" }]
          });
          setLoading(false);
        }, 2000);
      } else if (rs?.status === 400) {
        ShowSnackbar("Login failed. Incorrect credentials.");
        setLoading(false);
      }
    } catch (error) {
      ShowSnackbar("An error occurred. Please check your connection.");
      console.error("Login error:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const StoreToken = async (token) => {
    await AsyncStorage.setItem("token", token).then(() => {
      navigation.replace("Dashboard");
    });
  };

  // const getUser = async () => {
  //   const rs = await get_user_details();
  //   console.log(rs);
  // };

  // useEffect(() => {
  //   getUser();
  // }, []);

  return (
    <>
      <StatusBar hidden={true} translucent backgroundColor="transparent" />

      <GradientBackground>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
              <Image
                source={require("../../../../Assests/logo.png")}
                style={styles.logo}
              />
              <View style={styles.loginContainer}>
                <Text style={styles.title}>{t("login")}</Text>
                {/* <Text style={styles.subtitle}>
                  {t("dont_have_account")}?
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                  >
                    <Text style={styles.signupText}> {t("sign_up")}</Text>
                  </TouchableOpacity>
                </Text> */}

                <CustomTextInput
                  label={t("enter_your_email")}
                  marginTop={40}
                  email
                  value={email}
                  onChangeText={setemail}
                />
                <CustomTextInput
                  label={t("password")}
                  marginTop={10}
                  password
                  value={password}
                  onChangeText={setPassword}
                />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.loginButton}
                    onPress={HandleLogin}
                  >
                    <Button
                      mode="contained"
                      style={[styles.button, styles.loginButtonStyle]}
                      labelStyle={styles.buttonText}
                    >
                      {t("login")}
                    </Button>
                  </TouchableOpacity>
                </View>
              </View>

              <CustomSnackbar
                message={message}
                visible={snackBarVisible}
                onDismissSnackBar={() => setSnackBarVisible(false)}
              />
            </View>
            <Loader visible={loading} />
          </ScrollView>
        </TouchableWithoutFeedback>
      </GradientBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // padding: 16,
    width: "100%"
  },
  logo: {
    width: Dimensions.get("window").width * 0.5,
    height: Dimensions.get("window").width * 0.5,
    resizeMode: "contain",
    marginBottom: 20
  },
  loginContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 20,
    width: "100%"
    // maxWidth: 400
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "rgb(95, 93, 93)"
  },
  subtitle: {
    fontSize: 14,
    marginTop: 10,
    color: "gray"
  },
  signupText: {
    color: "rgb(15, 127, 233)",
    fontWeight: "bold",
    marginBottom: -4
  },
  buttonContainer: {
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 20,
    width: "100%"
  },
  button: {
    width: "100%",
    // maxWidth: 320,
    paddingVertical: 10
  },
  loginButtonStyle: {
    backgroundColor: "rgb(2, 190, 134)",
    borderRadius: 10
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },
  loginButton: {
    marginTop: 20,
    // alignItems: "center",
    // justifyContent: "center",
    width: "100%"
  }
});

export default Login_email;
