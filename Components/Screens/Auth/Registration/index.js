import React from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from "react-native";
import { Button } from "react-native-paper";

const { width, height } = Dimensions.get("window");

const Register = ({ navigation }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../Assests/logo.png")}
          style={styles.logo}
        />
      </View>

      <View style={styles.buttonGroup}>
        {/* Owner Registration */}
        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={() =>
            navigation.navigate("RegisterOwner", { title: "owner" })
          }
        >
          <Button
            mode="contained"
            buttonColor="#04344c"
            textColor="rgb(175, 178, 179)"
            theme={{ roundness: 20 }}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            {t("registration")} <View style={styles.spacing} />
            <Text style={styles.buttonText}>{t("Syndic")}</Text>
          </Button>
        </TouchableOpacity>

        {/* Tenant Registration */}
        {/* <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={() =>
            navigation.navigate("RegisterTenant", { title: "tenant" })
          }
        >
          <Button
            mode="contained"
            buttonColor="#04344c"
            textColor="rgb(175, 178, 179)"
            theme={{ roundness: 20 }}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            {t("registration")} <View style={styles.spacing} />
            <Text style={styles.buttonText}>{t("tenant")}</Text>
          </Button>
        </TouchableOpacity> */}

        {/* Sign In Text */}
        <Text style={styles.footerText}>
          {t("already_have_an_account")}?{" "}
          <TouchableOpacity onPress={() => navigation.replace("Onboarding")}>
            <Text style={styles.signNowText}>{t("sign_now")}</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  logoContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    width: width * 0.6,
    height: width * 0.6,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  logo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    backgroundColor: "white"
  },
  buttonGroup: {
    gap: 20,
    marginTop: 40,
    width: "100%",
    maxWidth: 500,
    alignItems: "center"
  },
  buttonWrapper: {
    width: "100%"
  },
  button: {
    borderColor: "#04344c",
    borderWidth: 2,
    borderRadius: 40
  },
  buttonContent: {
    paddingVertical: 10
  },
  buttonText: {
    color: "rgb(255, 255, 255)",
    fontWeight: "bold"
  },
  spacing: {
    width: 5
  },
  footerText: {
    textAlign: "center",
    fontWeight: "500",
    fontFamily: "Poppins",
    fontSize: 14,
    alignItems: "center",
    marginTop: 20
  },
  signNowText: {
    fontWeight: "800",
    color: "red",
    marginBottom: -6
  }
});

export default Register;
