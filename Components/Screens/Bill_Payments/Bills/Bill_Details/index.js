import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions
} from "react-native";
import BackButton from "../../../../Elements/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { themeColor } from "../../../../UserInterfase/ThemeColor";
import { Dimension } from "../../../../UserInterfase/Dimensions";
import CustomAlertModal from "../../../../UserInterface/custom_modal";
import { pay_All_bills } from "../../../../Fetch_Apis/user_get_bill";
import { LOADER_VISIABLE } from "../../../../Store/Actions/Action_types";

const Bill_List = ({ navigation, route }) => {
  const { bill, provision_bill, reserve_fund } = useSelector(
    (state) => state?.Bill_reducer
  );

  const dispatch = useDispatch();

  const isProvision = route.params.type === "Provisions Bill's";
  const selectedData = isProvision ? provision_bill : reserve_fund;

  const [isVisible, setIsvisiable] = useState(false);

  const onClose = async () => {
    const rs = await pay_All_bills(navigation, dispatch);
    if (rs.status === 200) {
      console.log("pay now all bills :- ", rs.data);
      setIsvisiable(false);
      setTimeout(() => {
        navigation.navigate("Transaction", { title: "Success" });
        dispatch({
          type: LOADER_VISIABLE,
          payload: false
        });
      }, 2000);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#f4f4f4", flex: 1 }}>
      {/* <StatusBar barStyle={"light-content"} backgroundColor={"transparent"} /> */}
      <BackButton navigation={navigation} title={route.params.type} />

      {selectedData === null ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#888" />
          <Text style={{ marginTop: 10 }}>Loading...</Text>
        </View>
      ) : selectedData?.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>No data found</Text>
        </View>
      ) : (
        Array.isArray(selectedData) &&
        selectedData?.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 10,
              borderBottomWidth: 1,
              borderColor: "gray",
              padding: 10
            }}
            onPress={() => {
              navigation.navigate("History_Details", {
                item: item
              });
            }}
            activeOpacity={0.6}
          >
            <Text
              style={{
                fontWeight: "800",
                fontSize: 16,
                color: "rgb(109, 109, 109)",
                width: Dimension.width / 3
              }}
            >
              {item?.billName}
            </Text>
            <Text
              style={{
                fontWeight: "800",
                fontSize: 16,
                color: item?.status === "PAID" ? "green" : "rgb(109, 109, 109)"
              }}
            >
              {item?.status}
            </Text>
            <Text
              style={{
                fontWeight: "400",
                fontSize: 16
              }}
            >
              {item?.totalAmount.toFixed(2)}
            </Text>
          </TouchableOpacity>
        ))
      )}
      {selectedData?.length > 0 && (
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
              backgroundColor: themeColor,
              paddingVertical: 12,
              paddingHorizontal: 30,
              borderRadius: 8
            }}
            onPress={() => {
              // handleBillPay(item?.billId);
              setIsvisiable(true);
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
              Pay All
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <CustomAlertModal
        isVisible={isVisible}
        onClose={onClose}
        navigation={navigation}
        content={"Are you sure ?"}
      />
    </SafeAreaView>
  );
};

export default Bill_List;
