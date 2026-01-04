import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StatusBar,
  Animated
} from "react-native";
import BackButton from "../../../Elements/BackButton";
import { themeColor } from "../../../UserInterfase/ThemeColor";
import { Dimension } from "../../../UserInterfase/Dimensions";
import BottomModal from "../../../Elements/BottomModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchMeetingData, poll_Vote } from "../../../Fetch_Apis/meetings";
import CustomSnackbar from "../../../UserInterface/SnackBar";

const windowWidth = Dimensions.get("window").width;
const Agenda = ({ navigation, route }) => {
  // const { id, agenda } = route?.params?.meetingData;



  const { id, agenda } = useSelector(
    (state) => state.Meeting_reducer.selected_meeting_details
  );
  const { get_All_Polls } = useSelector((state) => state.Meeting_reducer);
  console.log(get_All_Polls);

  const dispatch = useDispatch();

  const [getAgenda, setAgenda] = useState(null);
  const [owner_poll_vots, setOwner_Poll_Vots] = useState(null);

  const optionColors = ["#4CAF50", "#F44336", "#FF9800"];

  const [addAgenda, setAdagenda] = useState(false);
  const [addAgendaStatus, setAdagendaStatus] = useState(null);

  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [message, setMessage] = useState(false);

  const handleGet_Poll = async () => {
    const res = await fetchMeetingData(navigation, dispatch, id);

    if (res?.error) {
      console.error("Error:", res.error);
      return;
    }

    setAgenda(res.agendas);
    setOwner_Poll_Vots(res.votes);
  };

  useEffect(() => {
    if (addAgendaStatus === 200 || addAgendaStatus === null) {
      handleGet_Poll();
      if (addAgendaStatus === 200) {
        setAdagendaStatus(null);
      }
    }
  }, [addAgendaStatus]);

  const handlePollselect = async (id, selectedOpt) => {
    const rs = await poll_Vote(navigation, dispatch, id, selectedOpt);
    if (rs.status === 400) {
      setMessage(rs?.response?.data);
      setSnackBarVisible(true);
    }
  };

  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <BackButton navigation={navigation} title="Meeting Agenda / Poll" />
      {/* <StatusBar barStyle="light-content" backgroundColor="transparent" /> */}

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 100
        }}
        // stickyHeaderIndices={[0, 2]}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.logoCon,
            styles.stickyHeader,
            {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }
          ]}
        >
          <Text style={styles.title}>Agenda's</Text>
        </View>
        {Array.isArray(agenda) &&
          agenda?.map((item, index) => (
            <Animated.View
              style={{ transform: [{ translateY: slideAnim }] }}
              key={index}
            >
              <View
                style={{
                  padding: 15,
                  backgroundColor: "rgb(228, 228, 228)",
                  marginTop: 10
                }}
              >
                <Text style={styles.pollQues}>{item}</Text>
                {/* <Text style={{ marginTop: 5, marginLeft: 10 }}>
            This Agenda for water
          </Text> */}
              </View>
            </Animated.View>
          ))}

        <View style={[styles.logoCon, styles.stickyHeader]}>
          <Text style={styles.title}>Poll</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("View_Polls", { id: id });
            }}
          >
            <Text style={styles.viewPolls}>View Polls</Text>
          </TouchableOpacity>
        </View>
        {Array.isArray(get_All_Polls) && get_All_Polls.length > 0 ? (
          get_All_Polls.some((poll) => poll.status === "Active") ? (
            get_All_Polls.map((poll, index) => {
              if (poll.status !== "Active") return null;

              const selected = owner_poll_vots?.find(
                (item) => item.pollId === poll.id.toString()
              );

              return (
                <View key={index}>
                  <View style={{ padding: 15 }}>
                    <Text style={styles.pollQues}>Q. {poll.question}</Text>
                  </View>
                  <View style={styles.pollButtonsContainer}>
                    {poll.options.map((option, i) => {
                      const isSelected = selected?.selectedOption === option;
                      return (
                        <TouchableOpacity
                          key={option}
                          style={[
                            styles.pollButton,
                            {
                              backgroundColor: isSelected
                                ? optionColors[i] || "#ccc"
                                : "rgb(248, 248, 248)",
                              borderWidth: isSelected ? 0 : 1,
                              borderColor: themeColor
                            }
                          ]}
                          onPress={() => {
                            handlePollselect(poll.id, option);
                          }}
                        >
                          <Text
                            style={[
                              styles.pollButtonText,
                              { color: isSelected ? "white" : "black" }
                            ]}
                          >
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              );
            })
          ) : (
            <View style={{ padding: 20, alignItems: "center" }}>
              <Text style={{ color: "gray", fontSize: 16 }}>
                No Active Poll available now
              </Text>
            </View>
          )
        ) : (
          <View style={{ padding: 20, alignItems: "center" }}>
            <Text style={{ color: "gray", fontSize: 16 }}>
              No Polls available
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.buttonCon}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.4}
          onPress={() => setAdagenda(true)}
        >
          <Text style={styles.btntext}>Add Agenda</Text>
        </TouchableOpacity>
      </View>
      <BottomModal
        visiable={addAgenda}
        navigation={navigation}
        title={"Agenda"}
        setVisiable={setAdagenda}
        meetingId={id}
        setAdagendaStatus={setAdagendaStatus}
      />
      <CustomSnackbar
        message={message}
        visible={snackBarVisible}
        onDismissSnackBar={() => setSnackBarVisible(false)}
      />
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
    margin: 10,
    justifyContent: "space-between",
    marginRight: 20
  },
  logo: {
    width: 60,
    height: 60
  },
  stickyHeader: {
    backgroundColor: "#fff",
    zIndex: 10,
    height: 50
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
    bottom: 20,
    alignItems: "center"
  },

  button: {
    backgroundColor: themeColor,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    width: Dimension.width * 0.8,
    alignItems: "center"
  },
  btntext: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  },
  pollQues: {
    fontWeight: "bold"
  },
  pollButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10
  },
  pollButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25
  },
  pollButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  },
  viewPolls: {
    fontWeight: "bold",
    color: "rgb(94, 93, 93)"
  }
});

export default Agenda;
