import LottieView from "lottie-react-native";
import React from "react";
import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native";

const Transaction = ({ navigation }) => {
  let animationRef = React.useRef(null);
  return (
    <View
      style={{
        flex: 1,
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        backgroundColor: "rgb(125, 43, 180)",
        alignItems: "center"
        // justifyContent: "center"
      }}
    >
      {/* <View
        style={{
          width: Dimensions.get("window").width,
          alignItems: "center"
        }}
      > */}
      <LottieView
        ref={(animation) => {
          animationRef = animation;
        }}
        source={require("../../Elements/Animations/paymentS.json")}
        style={{
          width: "100%",
          height: "50%"
        }}
        autoPlay
        loop={false}
        onAnimationFinish={() => {
          if (animationRef) {
            animationRef.play(99, 100);
          }
        }}
      />
      {/* <Image
        style={{
          width: Dimensions.get("window").width / 2,
          height: Dimensions.get("window").width / 2
        }}
        source={require("../../Assests/Success.png")}
      /> */}
      <View
        style={{
          alignItems: "center",
          margin: -50
        }}
      >
        <Text
          style={{
            color: "rgb(202, 202, 202)",
            fontSize: 24,
            fontWeight: "800"
          }}
        >
          Transaction Successfull
        </Text>
        <Text
          style={{
            color: "rgb(158, 156, 156)",
            fontSize: 16,
            fontWeight: "600",
            marginTop: 10
          }}
        >
          Yes! Enjoy your bill.
        </Text>
        <Text
          style={{
            color: "rgb(158, 156, 156)",
            fontSize: 16,
            fontWeight: "600",
            marginBottom: 10
          }}
        >
          Don't forget to give us feedback!
        </Text>
        <Text
          style={{
            color: "rgb(158, 156, 156)",
            fontSize: 16,
            fontWeight: "600",
            marginVertical: 10
          }}
        >
          You may check your history.
        </Text>
      </View>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 50
        }}
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "Dashboard" }]
          });
        }}
      >
        <Text
          style={{
            backgroundColor: "rgb(206, 195, 195)",
            color: "rgb(125, 43, 180)",
            fontWeight: "800",
            paddingVertical: 15,
            paddingHorizontal: 80,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: "rgb(147, 53, 209)"
          }}
        >
          Back to Home
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Transaction;
