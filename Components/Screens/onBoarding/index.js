import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TouchableWithoutFeedback
} from "react-native";
import { Button } from "react-native-paper";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const Onboarding = ({ navigation }) => {
  const [langShow, setLangShow] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const { t } = useTranslation();

  const language = async () => {
    const lang = await AsyncStorage.getItem("language");
    if (lang === "en") {
      setSelectedLanguage("English");
    } else if (lang === "fr") {
      setSelectedLanguage("French");
    } else {
      setSelectedLanguage("Dutch");
    }
  };
  useEffect(() => {
    language();
  }, []);
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    if (lang === "en") {
      setSelectedLanguage("English");
      setLangShow(false);
    } else if (lang === "fr") {
      setSelectedLanguage("French");
      setLangShow(false);
    } else {
      setSelectedLanguage("Dutch");
      setLangShow(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => setLangShow(false)}>
      <View style={styles.container}>
        <View
          style={{
            position: "absolute",
            top: 50,
            right: Dimensions.get("window").width * 0.05,
            zIndex: 20
          }}
        >
          <TouchableOpacity onPress={() => setLangShow(!langShow)}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                borderWidth: 1,
                borderColor: "rgb(150, 150, 150)",
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 20,
                textAlign: "center"
              }}
            >
              {selectedLanguage}
            </Text>
          </TouchableOpacity>
          {langShow && (
            <View>
              <TouchableOpacity onPress={() => changeLanguage("en")}>
                <Text style={styles.languageOption}>English</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => changeLanguage("fr")}>
                <Text style={styles.languageOption}>French</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => changeLanguage("nl")}>
                <Text style={styles.languageOption}>Dutch</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../Components/Assests/landingpageLogo.png")}
            style={styles.logo}
          />
        </View>
        <Text style={styles.title}>{t("Syndic")}</Text>{" "}
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={() => navigation.navigate("Login_email")}
          >
            <Button
              mode="contained"
              buttonColor="#34b474"
              textColor="white"
              theme={{ roundness: 20 }}
              contentStyle={styles.buttonContent}
              style={styles.button}
            >
              {t("login_with_email")}
            </Button>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={() => navigation.navigate("Login")}
          >
            <Button
              mode="contained"
              buttonColor="white"
              textColor="black"
              theme={{ roundness: 20 }}
              contentStyle={styles.buttonContent}
              style={styles.button}
            >
              {t("login_with_phone")}
            </Button>
          </TouchableOpacity> */}

          {/* <Text style={styles.footerText}>
            {t("dont_have_account")}?{" "}
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.signUpText}>{t("sign_up")}</Text>{" "}
            </TouchableOpacity>
          </Text> */}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "rgb(255, 255, 255)",
    alignItems: "center",
    justifyContent: "center"
  },
  logoContainer: {
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  logo: {
    backgroundColor: "white",
    height: width * 0.6,
    width: width * 0.6,
    resizeMode: "contain"
  },
  title: {
    marginVertical: 20,
    padding: 10,
    fontWeight: "800",
    fontSize: Math.min(Dimensions.get("window").width * 0.06, 32),
    textAlign: "center"
  },
  buttonGroup: {
    gap: 20,
    width: "100%",
    alignItems: "center"
  },
  buttonWrapper: {
    width: width - 50
  },
  buttonContent: {
    paddingVertical: 10
  },
  button: {
    borderColor: "#8ca4fc",
    borderWidth: 2,
    borderRadius: 20
  },
  footerText: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 14,
    alignItems: "center"
  },
  signUpText: {
    fontWeight: "800",
    color: "#8ca4fc",
    marginBottom: -4
  },
  languageOption: {
    fontWeight: "bold",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "rgb(150, 150, 150)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 5,
    textAlign: "center",
    color: "rgb(104, 102, 102)"
  }
});

export default Onboarding;
