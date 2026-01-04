import React, { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  StyleSheet,
  Text,
  View
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { useSelector } from "react-redux";
import { themeColor } from "../../UserInterfase/ThemeColor";
import { Dimension } from "../../UserInterfase/Dimensions";

const Header = ({ visiable }) => {
  const { width } = Dimensions.get("window");
  const animatedPosition = useState(new Animated.Value(0))[0];
  const Auth_reducer = useSelector((state) => state?.Auth_reducer);

  const animateHeader = () => {
    Animated.timing(animatedPosition, {
      toValue: visiable ? 0 : -150,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
      duration: 400
    }).start();
  };

  useEffect(() => {
    animateHeader();
  }, [visiable]);

  if (!visiable) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: animatedPosition }]
        }
      ]}
    >
      <View style={styles.card}>
        <Image
          style={[styles.logo, { 
            // tintColor: "rgb(248, 243, 243)" 
          }]}
          source={require("../../Assests/logo.png")}
        />

        <View
          style={{
            flexDirection: "column",
            width: width * 0.6,
            alignItems: "flex-end"
          }}
        >
          <Image
            style={styles.logo2}
            source={
              Auth_reducer?.userData?.building?.syndicLogo
                ? { uri: Auth_reducer?.userData?.building?.syndicLogo }
                : require("../../Assests/logo.png")
            }
          />
          <View style={styles.addressWrapper}>
            <View style={styles.addressRow}>
              <Text style={styles.addressText}>
                {Auth_reducer?.userData?.building?.fullAddress ||
                  "Your Address"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    // marginTop: 40,
    // paddingHorizontal: 10
    backgroundColor: "rgb(252, 248, 248)"
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: themeColor,
    borderEndEndRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 12,
    paddingTop: 40,
    paddingRight: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 8,
    justifyContent: "space-between",
    height: Dimension.height * 0.2,
    borderColor:"black",
    // borderWidth: 0.5,
  },
  logo: {
    width: Dimension.width * 0.25,
    height: Dimension.width * 0.25,
    resizeMode: "contain",
    borderRadius: 10,
    marginTop: -20
  },
  logo2: {
    width: Dimension.width * 0.13,
    height: Dimension.width * 0.13,
    resizeMode: "contain",
    borderRadius: 10,
    // tintColor: "rgb(248, 243, 243)",
  },
  addressWrapper: {
    flex: 1,
    marginHorizontal: 2,
    alignItems: "center"
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    // flexWrap: "wrap",
    justifyContent: "center"
  },
  addressText: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgb(95, 93, 93)",
    marginLeft: 5,
    textAlign: "right"
  }
});
