import React, { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Linking,
  StatusBar
} from "react-native";
import BackButton from "../../../Elements/BackButton";
import { themeColor } from "../../../UserInterfase/ThemeColor";
import { Dimension } from "../../../UserInterfase/Dimensions";
import { useDispatch, useSelector } from "react-redux";
import { single_meeting } from "../../../Fetch_Apis/meetings";
import { useFocusEffect } from "@react-navigation/native";
import { GET_ALL_POLLS } from "../../../Store/Actions/Action_types";

const windowWidth = Dimensions.get("window").width;
const Meeting_Details = ({ navigation, route }) => {
  const { meetingId } = route?.params;

  const { all_meetings, selected_meeting_details } = useSelector(
    (state) => state.Meeting_reducer
  );
  console.log(selected_meeting_details?.polls);

  const dispatch = useDispatch();

  const getSingleMeeting = async () => {
    const rs = await single_meeting(navigation, dispatch, meetingId);
  };

  useFocusEffect(
    useCallback(() => {
      getSingleMeeting();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <BackButton navigation={navigation} title="Meeting Details" />
      {/* <StatusBar barStyle="light-content" backgroundColor="transparent" /> */}
      <View style={styles.logoCon}>
        <Image
          source={
            selected_meeting_details?.type === "ANNUAL"
              ? require("../../../Assests/anual_meeting.png")
              : require("../../../Assests/Ad_hoc.png")
          }
          style={styles.logo}
        />
        <Text style={styles.title}>{selected_meeting_details?.title}</Text>
      </View>
      <Text style={styles.attandiesHending}>Attendies</Text>
      <View style={{ height: 60, marginHorizontal: 10 }}>
        <ScrollView
          horizontal
          contentContainerStyle={{
            // paddingHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
            gap: 5
          }}
          showsHorizontalScrollIndicator={false}
        >
          {selected_meeting_details?.attendees?.map((item, i) => (
            <Text key={i} style={styles.attandies}>
              {item?.firstName} {item?.lastName}
            </Text>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        contentContainerStyle={{
          padding: windowWidth * 0.02,
          flexGrow: 1,
          margin: 10,
          paddingBottom: 100
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.agenda}>
          {selected_meeting_details?.baseAgenda}
        </Text>
        <Text style={styles.descrip}>
          {selected_meeting_details?.description}
        </Text>
        <Text style={[styles.agenda, { marginTop: 10 }]}>Location</Text>
        <TouchableOpacity
          onPress={() => Linking.openURL(selected_meeting_details?.location)}
        >
          <Text
            style={[
              styles.descrip,
              { color: "blue", textDecorationLine: "underline" }
            ]}
          >
            {selected_meeting_details?.location}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.buttonCon}>
        <View style={styles.buttoncon2}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.4}
            onPress={() => {
              navigation.navigate("Open_PDF", {
                url: selected_meeting_details?.document
              });
            }}
          >
            <Text style={styles.btntext}>View Doc</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.4}
            onPress={() => {
              navigation.navigate("Agenda", {
                meetingData: selected_meeting_details
              });
              dispatch({
                type: GET_ALL_POLLS,
                payload: selected_meeting_details?.polls
              });
            }}
          >
            <Text style={styles.btntext}>Agenda / Poll</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
    // paddingHorizontal: 16
  },
  logoCon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    margin: 10
  },
  logo: {
    width: 60,
    height: 60
  },
  title: {
    fontWeight: "bold",
    fontSize: 20
  },
  attandiesHending: {
    margin: 10,
    fontWeight: "bold",
    fontSize: 18
  },
  attandies: {
    backgroundColor: themeColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
    borderRadius: 50
  },
  agenda: {
    fontWeight: "bold",
    fontSize: 18
  },
  descrip: {
    textAlign: "justify",
    marginTop: 10
  },
  buttonCon: {
    position: "absolute",
    width: Dimension.width,
    bottom: 20
  },
  buttoncon2: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  button: {
    backgroundColor: themeColor,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20
  },
  btntext: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14
  }
});

export default Meeting_Details;
