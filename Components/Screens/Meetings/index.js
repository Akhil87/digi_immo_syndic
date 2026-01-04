import React, { useEffect, useState } from "react";
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
import BackButton from "../../Elements/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { meetings_get, single_meeting } from "../../Fetch_Apis/meetings";
import {
  GET_ALL_POLLS,
  MEETINGS,
  SINGLE_MEETINGS
} from "../../Store/Actions/Action_types";

const windowWidth = Dimensions.get("window").width;
const Meetings = ({ navigation }) => {
  const [data, setData] = useState(null);

  const dispatch = useDispatch();
  const gfgf = useSelector((state) => state.Meeting_reducer);

  console.log(gfgf);

  const handleData = async () => {
    const rs = await meetings_get(navigation, dispatch);
    // const rs2 = await single_meeting(navigation, dispatch);
    console.log("meeting data", rs[0]);

    setData(rs);
  };

  const data122 = {
    boxNumber: "1",
    building: {
      assets: [],
      buildingName: "Anciens Combattants 91",
      buildingNumber: 91,
      city: "Evere",
      fullAddress: "Avenue Anciens Combattants 91, Evere - 1142",
      id: 10,
      pincode: 1142,
      streetName: "Avenue Anciens Combattants 91",
      syndicAddress: "34, Shell drive, Atlanta",
      syndicAdminEmail: "lgi@gestionimmeubles.be",
      syndicBTW: "BT123456789",
      syndicLogo:
        "http://res.cloudinary.com/dfrh2bbkn/image/upload/c_scale,f_auto,q_auto,w_500/v1/SocietyPhotos/syndicLogo428949",
      syndicName: "syndic",
      syndicWebsite: "syndic.syndic.com"
    },
    email: "dev5@dev.com",
    firstName: "Dev",
    flatNumber: 1,
    flatType: "1BHK",
    floor: 1,
    id: 18,
    lastName: "Sharma",
    ownerApproved: true,
    phoneNumber: "7668776455",
    residence: "andhus",
    role: "user",
    syndicApproved: true
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <BackButton navigation={navigation} title="Meetings" />
      {/* <StatusBar barStyle="light-content" backgroundColor="transparent" /> */}

      <ScrollView
        contentContainerStyle={{
          padding: windowWidth * 0.02,
          flexGrow: 1,
          // alignItems: data?.length != 0 ? "auto" : "center",
          justifyContent: data?.length != 0 ? "auto" : "center"
        }}
        showsVerticalScrollIndicator={false}
      >
        {Array.isArray(data) && data?.length > 0 ? (
          data?.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() => {
                  navigation.navigate("Meeting_Details", {
                    meetingId: item?.id
                  });
                  dispatch({
                    type: SINGLE_MEETINGS,
                    payload: item
                  });
                }}
              >
                <Image
                  source={
                    item?.type === "ANNUAL"
                      ? require("../../Assests/anual_meeting.png")
                      : require("../../Assests/Ad_hoc.png")
                  }
                  style={styles.image}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.category}>{item?.title}</Text>
                  <Text style={styles.title}>
                    {item?.baseAgenda?.length > 30
                      ? item?.baseAgenda?.substring(0, 30) + "..."
                      : item?.baseAgenda}
                  </Text>

                  {/* <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color="#FFC107" />
                    <Text style={styles.rating}>{item?.rating || "4.3"}</Text>
                    <Text style={styles.reviews}>
                      ({item?.reviews || "123 reviews"})
                    </Text>
                  </View> */}
                </View>
                {/* <Ionicons name="heart-outline" size={24} color="purple" /> */}
              </TouchableOpacity>
            );
          })
        ) : (
          <Text
            style={{
              fontSize: 18,
              color: "gray",
              textAlign: "center",
              justifyContent: "center"
              // flex: 1
            }}
          >
            No data available
          </Text>
        )}
      </ScrollView>
      {/* <Ask_modal isVisible={true}/> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
    // paddingHorizontal: 16
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 12
  },
  textContainer: {
    flex: 1
  },
  category: {
    color: "#6A5ACD",
    fontSize: 12,
    fontWeight: "600"
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333"
  },
  location: {
    fontSize: 12,
    color: "gray"
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4
  },
  rating: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4,
    color: "#333"
  },
  reviews: {
    fontSize: 12,
    color: "gray",
    marginLeft: 4
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center"
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15,
    color: "#333"
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  }
});

export default Meetings;
