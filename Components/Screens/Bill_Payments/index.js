import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import BackButton from "../../Elements/BackButton";
import { user_get_bills } from "../../Fetch_Apis/user_get_bill";

const screenWidth = Dimensions.get("window").width;

const Bill_Payments = ({ navigation }) => {
  const [bills, setBills] = useState(null);

  const getBill = async () => {
    const rs = await user_get_bills();

    setBills(rs);
  };
  useEffect(() => {
    getBill();
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "f4f4f4",
        flex: 1
      }}
    >
      <StatusBar barStyle={"light-content"} backgroundColor={"transparent"} />
      <BackButton navigation={navigation} title="bill_payments" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
        <Text
          style={{
            fontSize: Math.min(screenWidth * 0.045, 20),
            fontWeight: "800",
            color: "rgb(43, 42, 42)",
            marginVertical: 16
          }}
        >
          Pay Bill
        </Text>

        {/* Bill Payment Options */}
        <View
          style={{
            marginVertical: 20,
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          {[
            { source: require("../../Assests/phone.png"), label: "Phone" },
            { source: require("../../Assests/data.png"), label: "Data" },
            { source: require("../../Assests/invests.png"), label: "Invest" },
            { source: require("../../Assests/game.png"), label: "Gas" },
            { source: require("../../Assests/net.png"), label: "Net" },
            { source: require("../../Assests/pln.png"), label: "Electricity" },
            { source: require("../../Assests/bpjs.png"), label: "BPJS" },
            { source: require("../../Assests/water.png"), label: "Water" }
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                alignItems: "center",
                width: screenWidth * 0.22,
                marginBottom: 16
              }}
              onPress={() => {
                navigation.navigate("Bill_Details", {
                  title: item?.label,
                  billData:
                    Array.isArray(bills) &&
                    bills?.filter(
                      (bill) => bill?.billName?.split(" ")[0] === item?.label
                    )
                });
              }}
            >
              <Image
                style={{
                  width: Math.min(screenWidth * 0.15, 100),
                  height: Math.min(screenWidth * 0.15, 100)
                }}
                source={item.source}
              />
              <Text>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Transaction Section */}
        <View
          style={{
            // backgroundColor: "rgb(240, 233, 233)",
            paddingVertical: 20,
            paddingHorizontal: 5,
            borderRadius: 10,
            marginBottom: 16
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontWeight: "900",
                fontSize: 16,
                fontFamily: "Poppins"
              }}
            >
              Last Transaction
            </Text>
            <TouchableOpacity
              style={{
                fontWeight: "700",
                color: "#04344c",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                flexDirection: "row"
              }}
              onPress={() => {
                navigation.navigate("History");
              }}
            >
              <Text>See more </Text>
              <Image
                style={{
                  marginTop: 3
                  // width: Math.min(screenWidth * 0.02, 100),
                  // height: Math.min(screenWidth * 0.02, 100)
                }}
                source={require("../../Assests/Vector.png")}
              />
            </TouchableOpacity>
          </View>

          {/* Transaction List */}
          <View
            style={{
              backgroundColor: "rgb(248, 247, 247)",
              padding: 20,
              marginVertical: 20,
              borderRadius: 10
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                color: "rgb(94, 94, 94)",
                borderBottomWidth: 2,
                borderBottomColor: "rgb(231, 229, 229)",
                paddingBottom: 10
              }}
            >
              Today, Feb 25
            </Text>

            {[
              {
                label: "Top Up",
                time: "08:00 AM",
                amount: "+Rp 50,000",
                color: "#04344c"
              },
              {
                label: "Water",
                time: "08:00 AM",
                amount: "-Rp 62,244",
                color: "red"
              }
            ].map((transaction, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: 10
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <Image
                    style={{
                      width: Math.min(Dimensions.get("window").width * 0.1, 50),
                      height: Math.min(
                        Dimensions.get("window").width * 0.1,
                        50
                      ),
                      marginRight: 10
                    }}
                    source={require("../../Assests/avatar.png")}
                  />
                  <View>
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "rgb(61, 61, 61)"
                      }}
                    >
                      {transaction.label}
                    </Text>
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "rgb(209, 207, 207)",
                        marginTop: 5
                      }}
                    >
                      {transaction.time}
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    color: transaction.color,
                    fontWeight: "700"
                  }}
                >
                  {transaction.amount}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Bill_Payments;
