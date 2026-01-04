import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import BackButton from "../../../Elements/BackButton";
import { user_get_bills } from "../../../Fetch_Apis/user_get_bill";
import { themeColor } from "../../../UserInterfase/ThemeColor";
import { useDispatch, useSelector } from "react-redux";
import {
  BILL_DATA,
  PROVISION_BILL_DATA,
  PROVISION_BILL_TOTAL,
  REVERSE_FUND,
  REVERSE_FUND_BILL_DATA,
  REVERSE_FUND_BILL_TOTAL
} from "../../../Store/Actions/Action_types";
import { Picker } from "@react-native-picker/picker";

const screenWidth = Dimensions.get("window").width;

const Bills = ({ navigation }) => {
  const [bills, setBills] = useState(null);
  const [ProvisionbillsTotal, setProvisionBillsTotal] = useState(0);
  const [reserveFundbillsTotal, setReserveFundTotal] = useState(0);

  const [selectedMonth, setSelectedMonth] = useState(null);

  const dispatch = useDispatch();
  const {
    bill,
    reverse_fund_bill,
    provision_bill,
    total_provision_bill,
    total_reverse_fund_bill
  } = useSelector((state) => state?.Bill_reducer);

  const [provisionBill, setProvisionBill] = useState(null);
  const [reserveFundBill, setReserveFundBill] = useState(null);

  const getBill = async () => {
    const rs = await user_get_bills();

    const provisionData = await rs?.filter(
      (item) => item?.type === "PROVISIONS"
    );

    let provisionBillTotalAmount = await provisionData?.reduce(
      (total, item) => total + item?.totalAmount,
      0
    );

    const ReserveFundData = await rs?.filter(
      (item) => item?.type === "RESERVE_FUND"
    );

    let reserveFundTotalAmount = await ReserveFundData?.reduce(
      (total, item) => total + item?.totalAmount,
      0
    );

    setProvisionBillsTotal(provisionBillTotalAmount);
    setProvisionBill(provisionData);

    setReserveFundBill(ReserveFundData);
    setReserveFundTotal(reserveFundTotalAmount);

    setBills(rs);

    dispatch({
      type: PROVISION_BILL_DATA,
      provision_bill: provisionData
    });

    dispatch({
      type: PROVISION_BILL_TOTAL,
      total_provision_bill: provisionBillTotalAmount
    });

    dispatch({
      type: REVERSE_FUND_BILL_DATA,
      reserve_fund: ReserveFundData
    });

    dispatch({
      type: REVERSE_FUND_BILL_TOTAL,
      total_reserve_fund: reserveFundTotalAmount
    });

    dispatch({
      type: BILL_DATA,
      bill: rs
    });
  };
  useEffect(() => {
    getBill();
  }, []);

  const handleFilterbyDate = async () => {
    if (!selectedMonth) {
      setReserveFundTotal(total_reverse_fund_bill);
      setProvisionBillsTotal(total_provision_bill);
    }

    const getMonthName = (dateStr) => {
      const date = new Date(dateStr);
      return date.toLocaleString("default", { month: "long" });
    };

    const filteredProvision = selectedMonth
      ? provision_bill?.filter(
          (item) => getMonthName(`${item?.dueDate}`) === selectedMonth
        )
      : provision_bill;

    const filteredReserve = selectedMonth
      ? reverse_fund_bill?.filter(
          (item) => getMonthName(item?.dueDate) === selectedMonth
        )
      : reverse_fund_bill;

    const provisionBillTotalAmount = filteredProvision?.reduce(
      (total, item) => total + item?.totalAmount,
      0
    );

    const reserveFundTotalAmount = filteredReserve?.reduce(
      (total, item) => total + item?.totalAmount,
      0
    );

    setReserveFundTotal(reserveFundTotalAmount);
    setProvisionBillsTotal(provisionBillTotalAmount);
  };

  useEffect(() => {
    handleFilterbyDate();
  }, [selectedMonth]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "f4f4f4",
        flex: 1
      }}
    >
      {/* <StatusBar barStyle={"light-content"} backgroundColor={"transparent"} /> */}
      <BackButton navigation={navigation} title="bill_payments" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
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
          <View style={{ width: 180 }}>
            <Picker
              selectedValue={selectedMonth}
              style={{
                height: 50,
                width: "100%",
                backgroundColor: "#f0f0f0",
                borderRadius: 10
              }}
              onValueChange={(itemValue) => setSelectedMonth(itemValue)}
            >
              <Picker.Item label="All Months" value={null} />
              {Array.from({ length: 12 }, (_, i) => {
                const monthName = new Date(2025, i).toLocaleString("default", {
                  month: "long"
                });
                return (
                  <Picker.Item key={i} label={monthName} value={monthName} />
                );
              })}
            </Picker>
          </View>
        </View>
        {/* Bill Payment Options */}
        <TouchableOpacity
          style={styles.billContainer}
          activeOpacity={0.6}
          onPress={() => {
            navigation.navigate("Bill_List", {
              billData: ProvisionbillsTotal,
              type: "Provisions Bill's"
            });
          }}
        >
          <Text style={[styles.bill, { fontWeight: "bold" }]}>
            Provisions Bill
          </Text>
          <Text style={[styles.bill, { fontWeight: "bold" }]}>
            {ProvisionbillsTotal}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.billContainer, { marginTop: 10 }]}
          activeOpacity={0.6}
          onPress={() => {
            navigation.navigate("Bill_List", {
              billData: ProvisionbillsTotal,
              type: "Reserve Fund"
            });
          }}
        >
          <Text style={[styles.bill, { fontWeight: "bold" }]}>
            Reserve Fund
          </Text>
          <Text style={[styles.bill, { fontWeight: "bold" }]}>
            {reserveFundbillsTotal}
          </Text>
        </TouchableOpacity>
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
          {/* <View
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
                source={require("../../../Assests/Vector.png")}
              />
            </TouchableOpacity>
          </View> */}

          {/* Transaction List */}
          {/* <View
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
                    source={require("../../../Assests/avatar.png")}
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
          </View>*/}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Bills;

const styles = StyleSheet.create({
  billContainer: {
    backgroundColor: themeColor,
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  bill: { color: "white" }
});
