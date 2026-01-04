import LottieView from "lottie-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Card } from "react-native-paper";
import BottomModal from "../../../../Elements/BottomModal";
import { user_pay_bills } from "../../../../Fetch_Apis/user_get_bill";

const History_Details = ({ route, navigation }) => {
  const { item } = route.params;
  console.log(item);
  const scaleValue = useRef(new Animated.Value(1)).current;
  const [modalVisiable, setModalVisiable] = useState(false);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        })
      ])
    ).start();
  }, []);

  const handleBillPay = async (billId) => {
    console.log(billId);

    const rs = await user_pay_bills(navigation, billId);

    if (rs) {
      navigation.navigate("Transaction", { title: "Success" });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Card
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height / 3,
          backgroundColor:
            item?.status === "PAID" ? "rgb(16, 182, 1)" : "rgb(235, 104, 104)",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <LottieView
          source={require("../../../../Elements/Animations/bill_unpaid.json")}
          style={{
            width: Dimensions.get("window").width - 20,
            height: Dimensions.get("window").height / 3
          }}
          loop
          autoPlay
        />
      </Card>

      {[
        { label: "Type", value: item?.type },
        { label: "Bill Name", value: item?.billName },
        { label: "Billing Month", value: item?.billingMonth },
        { label: "Due Date", value: item?.dueDate },
        { label: "Status", value: item?.status },
        { label: "Total Amount", value: item?.totalAmount }
      ].map((detail, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 10,
            borderBottomWidth: 1,
            borderColor: "gray",
            paddingBottom: 10
          }}
        >
          <Text
            style={{
              fontWeight: "800",
              fontSize: 16,
              color: "rgb(109, 109, 109)"
            }}
          >
            {detail.label}
          </Text>
          <Text
            style={{
              fontWeight: "400",
              fontSize: 16,
              color:
                detail.label === "Status"
                  ? detail.value === "PAID"
                    ? "rgb(0, 206, 27)"
                    : "black"
                  : "black",
              fontWeight:
                detail.label === "Status"
                  ? detail.value === "PAID"
                    ? "bold"
                    : "normal"
                  : "normal"
            }}
          >
            {detail.value}
          </Text>
        </View>
      ))}

      {/* Pay Now button */}
      {item?.status === "UNPAID" && (
        <View
          style={{
            position: "absolute",
            bottom: 20,
            left: 0,
            right: 0,
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#E53935",
              paddingVertical: 12,
              paddingHorizontal: 30,
              borderRadius: 8
            }}
            onPress={() => {
              handleBillPay(item?.billId);
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
              Pay Now
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <BottomModal
        visiable={modalVisiable}
        navigation={navigation}
        setVisiable={setModalVisiable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default History_Details;
