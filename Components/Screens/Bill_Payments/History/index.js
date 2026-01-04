import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import BackButton from "../../../Elements/BackButton";
import { user_get_bills } from "../../../Fetch_Apis/user_get_bill";
import { TextInput } from "react-native-paper";

const monthOrder = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12
};

const History = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [recoverData, setRecoverData] = useState(null);
  const [search, setSearch] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("PAID");
  let lastBillingMonth = null;
  const sortedData = [...((data && data) || [])].sort((a, b) => {
    const monthA = monthOrder[a.billingMonth] || 0;
    const monthB = monthOrder[b.billingMonth] || 0;
    return monthB - monthA;
  });

  useEffect(() => {
    if (Array.isArray(recoverData)) {
      const filteredData = recoverData.filter(
        (item) => item?.status === selectedStatus
      );

      setData(filteredData);
    } else {
      setData([]);
    }
  }, [recoverData, selectedStatus]);

  const getBill = async () => {
    const rs = await user_get_bills();
    console.log("bill--------->", rs);

    setRecoverData(rs);
  };

  useEffect(() => {
    getBill();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => setDropdownVisible(false)}>
      <View style={{ flex: 1, backgroundColor: "#f4f4f4" }}>
        <BackButton navigation={navigation} title="History" />
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ScrollView>
            <View
              style={{ marginHorizontal: 10, marginTop: 20, marginBottom: 10 }}
            >
              <View>
                <TextInput
                  mode="outlined"
                  outlineColor="gray"
                  activeOutlineColor="gray"
                  onChangeText={setSearch}
                  value={search}
                  style={{
                    width: "100%",
                    backgroundColor: "#f4f4f4",
                    borderRadius: 10,
                    overflow: "hidden"
                  }}
                  outlineStyle={{ borderWidth: 1, borderRadius: 10 }}
                  placeholder="Search"
                  left={
                    <TextInput.Icon icon="magnify" size={30} color="gray" />
                  }
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  marginTop: 10
                }}
              >
                {/* Status Dropdown */}
                <TouchableOpacity
                  onPress={() => setDropdownVisible(!isDropdownVisible)}
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 2,
                    borderColor: "gray",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 10
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "700",
                      fontSize: 16,
                      color: "rgb(94, 94, 94)",
                      textTransform: "capitalize"
                    }}
                  >
                    {selectedStatus}
                  </Text>
                  <Image source={require("../../../Assests/down_icon.png")} />
                </TouchableOpacity>

                {isDropdownVisible && (
                  <View
                    style={{
                      position: "absolute",
                      top: 40,
                      left: 0,
                      //   width: 100,
                      zIndex: 20,
                      gap: 2
                    }}
                  >
                    {["PAID", "UNPAID", "Due", "Over Due"].map((status) => (
                      <TouchableOpacity
                        key={status}
                        onPress={() => {
                          setSelectedStatus(status);
                          setDropdownVisible(false);
                        }}
                        style={{
                          paddingVertical: 5,
                          paddingHorizontal: 10,
                          borderWidth: 2,
                          borderColor: "gray",
                          borderRadius: 10,
                          backgroundColor: "#f4f4f4"
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: "700",
                            fontSize: 16,
                            color: "rgb(94, 94, 94)",
                            textTransform: "capitalize"
                          }}
                        >
                          {status}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 2,
                    borderColor: "gray",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 10
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "700",
                      fontSize: 16,
                      color: "rgb(94, 94, 94)"
                    }}
                  >
                    Date
                  </Text>
                  <Image source={require("../../../Assests/down_icon.png")} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ marginTop: 20 }}>
              {sortedData?.map((item, index) => {
                const currentBillingMonth = item?.billingMonth || "";

                const showMonthHeader =
                  currentBillingMonth !== lastBillingMonth;
                if (showMonthHeader) lastBillingMonth = currentBillingMonth;

                return (
                  <View key={index}>
                    {showMonthHeader && (
                      <View
                        style={{
                          backgroundColor: "#4DA9FF",
                          paddingVertical: 10,
                          paddingHorizontal: 20
                        }}
                      >
                        <Text style={{ fontWeight: "600" }}>2025</Text>
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: Math.min(
                              Dimensions.get("window").width * 0.05,
                              16
                            ),
                            color: "rgb(54, 54, 54)"
                          }}
                        >
                          {currentBillingMonth}
                        </Text>
                      </View>
                    )}
                    <View style={{ margin: 10 }}>
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          width: "100%",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 10,
                          backgroundColor: "white",
                          padding: 10,
                          paddingRight: 10,
                          borderRadius: 20
                        }}
                        onPress={() => {
                          navigation.navigate("History_Details", {
                            item: item
                          });
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            gap: 10,
                            alignItems: "center"
                          }}
                        >
                          <Image
                            style={{ width: 80, height: 80 }}
                            source={require("../../../Assests/history_exchange.png")}
                          />
                          <View>
                            <Text
                              style={{
                                fontWeight: "bold",
                                fontSize: 14,
                                textTransform: "capitalize"
                              }}
                            >
                              {item?.type}
                            </Text>
                            <Text
                              style={{
                                color: "gray",
                                marginTop: 5,
                                fontWeight: "700"
                              }}
                            >
                              Transaction ID
                            </Text>
                            <Text
                              style={{
                                color: "rgb(68, 68, 68)",
                                fontWeight: "400"
                              }}
                            >
                              {item?.transactionId?.substring(0, 15)}...
                            </Text>
                          </View>
                        </View>
                        <View style={{ alignItems: "flex-end", gap: 5 }}>
                          <Text style={{ fontWeight: "bold" }}>
                            $
                            {item?.totalAmount
                              ? parseFloat(item?.totalAmount).toFixed(2)
                              : "0.00"}
                          </Text>
                          <Text
                            style={{
                              backgroundColor:
                                item?.status === "PAID"
                                  ? "rgb(133, 194, 118)"
                                  : "rgb(244,154,71)",
                              color:
                                item?.status === "PAID"
                                  ? "rgb(36, 247, 36)"
                                  : "rgb(244,154,71)",
                              width: Math.min(
                                Dimensions.get("window").width * 0.18,
                                80
                              ),
                              fontWeight: "bold",
                              textAlign: "center",
                              borderRadius: 8,
                              paddingVertical: 3
                            }}
                          >
                            {item?.status ? item.status.toLowerCase() : ""}
                          </Text>
                          <Text
                            style={{
                              color: "rgb(134, 133, 133)",
                              textAlign: "right"
                            }}
                          >
                            <Text>{item?.dueDate} </Text>
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default History;
