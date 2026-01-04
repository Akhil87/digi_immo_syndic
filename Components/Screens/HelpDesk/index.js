import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
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
import { get_ticket_api } from "../../Fetch_Apis/help_desk";
import { Loader } from "../../UserInterface/loader";
import { useFocusEffect } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Close_Ticket from "./Close_ticket";
import { backgroundColor, themeColor } from "../../UserInterfase/ThemeColor";

const HelpDesk = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [allTickets, setTickets] = useState(null);
  const [visiable, setVisiable] = useState(false);
  const [ticketDetails, setTicketDetails] = useState({
    id: -1,
    subject: "",
    status: "Open",
    description: "",
    response: ""
  });

  const getTicket = async () => {
    const rs = await get_ticket_api(navigation, setLoading);
    const sort = rs?.data?.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setTickets(sort);
  };

  useFocusEffect(
    useCallback(() => {
      if (!visiable) getTicket();
    }, [visiable])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor }}>
      <BackButton navigation={navigation} title="help_desk" />
      {/* <StatusBar animated barStyle="light-content" /> */}
      <ScrollView
        style={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ margin: 20, paddingBottom: 40 }}>
          <View
            style={{
              backgroundColor: "white",
              paddingTop: 30,
              paddingHorizontal: 16,
              borderRadius: 16,
              paddingBottom: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 4
            }}
          >
            <Text
              style={{
                textAlign: "center",
                paddingBottom: 10,
                fontWeight: "800",
                fontSize: 16,
                color: "#111827"
              }}
            >
              Welcome to DIGI Support Ticket System!
            </Text>
          </View>

          <Text
            style={{
              fontSize: 20,
              fontWeight: "800",
              color: "#1F2937",
              textAlign: "center",
              paddingVertical: 24
            }}
          >
            My Tickets
          </Text>

          <View style={{ marginVertical: 10, gap: 12 }}>
            {allTickets ? (
              allTickets?.length > 0 ? (
                allTickets?.map((ticket, index) => (
                  <TicketCard
                    key={index}
                    {...ticket}
                    navigation={navigation}
                    setVisiable={setVisiable}
                    setTicketDetails={setTicketDetails}
                  />
                ))
              ) : (
                <View
                  style={{
                    alignItems: "center",
                    marginTop: 20,
                    justifyContent: "center",
                    flex: 1
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#374151"
                    }}
                  >
                    No data found
                  </Text>
                </View>
              )
            ) : (
              <View
                style={{
                  alignItems: "center",
                  marginTop: 20,
                  justifyContent: "center",
                  flex: 1
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#374151"
                  }}
                >
                  Loading...
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {loading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.2)"
          }}
        >
          <Loader visible={loading} />
        </View>
      )}

      {/* <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          bottom: 20,
          left: 0,
          width: Dimensions.get("window").width
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: themeColor,
            paddingVertical: 14,
            paddingHorizontal: 28,
            borderRadius: 50,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 4
          }}
          onPress={() => {
            navigation.navigate("New_Ticket", { title: "New_Ticket" });
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "white",
              fontSize: 14,
              marginRight: 8,
              letterSpacing: 0.6
            }}
          >
            New Ticket
          </Text>
          <AntDesign name="pluscircleo" size={18} color="white" />
        </TouchableOpacity>
      </View> */}

      {visiable && (
        <Close_Ticket
          navigation={navigation}
          visiable={visiable}
          setVisiable={setVisiable}
          ticketDetails={ticketDetails}
        />
      )}
    </SafeAreaView>
  );
};

export default HelpDesk;

const TicketCard = ({
  ticketStatus,
  ticketDescription,
  ticketSubject,
  createdAt,
  ticketResponse,
  updatedAt,
  id,
  navigation,
  setVisiable,
  setTicketDetails
}) => {
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true
    }).start();
  }, []);

  const getStatusStyles = (ticketStatus) => {
    const statusColors = {
      OPEN: { color: "#059669", backgroundColor: "#ECFDF5" },
      IN_PROGRESS: { color: "#F59E0B", backgroundColor: "#FFFBEB" },
      CLOSED: { color: "#EF4444", backgroundColor: "#FEE2E2" },
      SOLVED: { color: "#10B981", backgroundColor: "#D1FAE5" }
    };
    return statusColors[ticketStatus] || statusColors.OPEN;
  };

  return (
    <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "white",
          padding: 20,
          borderRadius: 16,
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
          elevation: 2
        }}
        onPress={() => {
          setVisiable(true);
          setTicketDetails((ticket) => ({
            ...ticket,
            id: id,
            subject: ticketSubject,
            status: ticketStatus,
            description: ticketDescription,
            response: ticketResponse
          }));
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 16,
              color: "#1F2937"
            }}
          >
            {ticketSubject}
          </Text>
          <Text
            style={{
              fontWeight: "400",
              fontSize: 14,
              color: "#6B7280",
              marginTop: 4
            }}
          >
            {ticketDescription?.length > 20
              ? `${ticketDescription.substring(0, 20)}...`
              : ticketDescription}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "#9CA3AF",
              marginTop: 4
            }}
          >
            {new Date(createdAt).toLocaleString()}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8
          }}
        >
          <Text
            style={{
              color: getStatusStyles(ticketStatus).color,
              backgroundColor: getStatusStyles(ticketStatus).backgroundColor,
              paddingVertical: 6,
              paddingHorizontal: 12,
              borderRadius: 999,
              fontWeight: "bold",
              fontSize: 10
            }}
          >
            {ticketStatus}
          </Text>
          <AntDesign name="right" size={18} color="black" />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
