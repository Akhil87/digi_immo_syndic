import React, { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View
} from "react-native";
import BackButton from "../../Elements/BackButton";
import { Dimension } from "../../UserInterfase/Dimensions";
import { ScrollView } from "react-native-gesture-handler";
import { tenants } from "../../Fetch_Apis/tenant_Profiles";
import { useDispatch, useSelector } from "react-redux";
import { TENANTS_DETAILS } from "../../Store/Actions/Action_types";
import { useFocusEffect } from "@react-navigation/native";

const Profiles = ({ navigation }) => {
  const theme = useColorScheme();

  const dispatch = useDispatch();
  const { all_tenants } = useSelector((state) => state.Tenants_reducer);
  console.log("tenants_reducer :-", all_tenants);

  const [profiles, setProfiles] = useState(null);

  const Fetch_Apis = async () => {
    const rs = await tenants(navigation, dispatch);
    console.log(rs);
    setProfiles(rs);
  };
  // useEffect(() => {
  //   Fetch_Apis();
  // }, []);
  useFocusEffect(
    useCallback(() => {
      Fetch_Apis();
    }, [])
  );
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === "dark" ? "black" : "#FFFFFF" }
      ]}
    >
      {/* <StatusBar barStyle="light-content" backgroundColor="transparent" /> */}
      <BackButton navigation={navigation} title="Residents" />
      <ScrollView>
        {all_tenants?.map((profile, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            style={styles.content}
            onPress={() => {
              navigation.navigate("ProfileInfo", {
                data: profile
              });
              dispatch({
                type: TENANTS_DETAILS,
                payload: profile
              });
            }}
          >
            <Image
              source={{
                uri: "https://cdn.openart.ai/published/MPODh50b7qoh6ctuw8wy/4LklgBnG_30aM_raw.jpg"
              }}
              style={styles.profileimage}
            />
            <View>
              <Text style={styles.headingText}>
                {profile?.firstName} {profile?.lastName}
              </Text>
              <Text style={styles.text}>{profile?.phoneNumber}</Text>
              <Text style={styles.textHeading}>
                Floor Number: <Text style={styles.text}>{profile?.floor}</Text>
              </Text>
              <Text style={styles.textHeading}>
                Flat Number:{" "}
                <Text style={styles.text}>{profile?.flatNumber}</Text>
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Profiles;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  content: {
    margin: Dimension.width * 0.02,
    padding: Dimension.width * 0.02,
    backgroundColor: "rgb(243, 243, 243)",
    borderRadius: 10,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    elevation: 5
  },

  profileimage: {
    height: Math.min(Dimension.width * 0.3, 150),
    width: Math.min(Dimension.width * 0.3, 150),
    borderRadius: 10
  },
  headingText: {
    fontWeight: "bold",
    fontSize: Math.min(Dimension.width * 0.045, 16)
  },
  textHeading: {
    fontWeight: "bold",
    marginTop: 5
  },
  text: {
    fontWeight: "semibold",
    marginTop: 5
  }
});
