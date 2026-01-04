import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { themeColor } from "../../../../UserInterfase/ThemeColor";
import BackButton from "../../../../Elements/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { poll_Result } from "../../../../Fetch_Apis/meetings";

const View_Polls = ({ navigation, route }) => {
  const [pollAns, setPollAns] = useState({
    yes: false,
    no: false,
    neutral: false
  });
  const { poll_result_data } = useSelector((state) => state.Meeting_reducer);
  console.log(poll_result_data);

  const { id } = route?.params;

  const dispatch = useDispatch();

  const handle_poll_result = async () => {
    const rs = await poll_Result(navigation, dispatch, id);
  };

  useEffect(() => {
    handle_poll_result();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <BackButton navigation={navigation} title="Polls Result" />
      {/* <StatusBar barStyle="light-content" backgroundColor="transparent" /> */}

      <ScrollView contentContainerStyle={{ padding: 15 }}>
        {poll_result_data?.length > 0 ? (
          poll_result_data?.map((item, index) => {
            const question = Object.keys(item)[0];
            const votes = item[question];

            const maxVote = Math.max(votes.yes, votes.no, votes.neutral);
            const getColor = (type) => {
              if (votes[type] === maxVote) {
                if (type === "yes") return "#4CAF50";
                if (type === "no") return "#F44336";
                if (type === "neutral") return "#FF9800";
              }
              return "rgb(248, 248, 248)";
            };

            const getTextColor = (type) =>
              votes[type] === maxVote ? "#fff" : "#000";

            return (
              <View key={index} style={{ marginBottom: 25 }}>
                <Text style={styles.pollQues}>Q. {question}</Text>

                {["yes", "no", "neutral"].map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.pollButton,
                      {
                        backgroundColor: getColor(type),
                        borderWidth: votes[type] === maxVote ? 0 : 1,
                        borderColor: themeColor
                      }
                    ]}
                  >
                    <Text
                      style={[
                        styles.pollButtonText,
                        { color: getTextColor(type) }
                      ]}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Text>
                    <Text
                      style={[
                        styles.pollButtonText,
                        { color: getTextColor(type) }
                      ]}
                    >
                      {votes[type]}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            );
          })
        ) : (
          <View style={{ padding: 20, alignItems: "center" }}>
            <Text style={{ color: "gray", fontSize: 16 }}>
              No Polls available
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default View_Polls;

const styles = StyleSheet.create({
  pollQues: {
    fontWeight: "bold"
  },
  pollButtonsContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginTop: 10,
    marginHorizontal: 15
  },
  pollButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
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
