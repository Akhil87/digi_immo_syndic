import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { Card, Button } from "react-native-paper";
import { CustomTextInput } from "../../../UserInterface/customInput";
import { useTranslation } from "react-i18next";
import {
  get_user_details,
  update_user
} from "../../../Fetch_Apis/get_user_details";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Loader } from "../../../UserInterface/loader";
import { useDispatch, useSelector } from "react-redux";
import {
  login_action,
  user_data_action
} from "../../../Store/Actions/Auth_action";

const ProfilePage = ({ navigation }) => {
  const { t } = useTranslation();

  const Auth_reducer = useSelector((state) => state?.Auth_reducer);
  const dispatch = useDispatch();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmial] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");

  const [residence, setResidence] = useState("");
  const [flatNumber, setflatNumber] = useState("");

  const [floor, setFloor] = useState("");
  const [boxNumber, setBoxNumber] = useState("");

  const [building, setBuilding] = useState("");
  const [flatType, setFlatType] = useState("");

  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    // const rs = await get_user_details();
    // console.log(rs);
    setEmial(Auth_reducer?.userData?.email);
    setPhoneNumber(Auth_reducer?.userData?.phoneNumber);
    setFirstName(Auth_reducer?.userData?.firstName);
    setLastName(Auth_reducer?.userData?.lastName);
    setRole(Auth_reducer?.userData?.role);
    setResidence(Auth_reducer?.userData?.residence);
    setBoxNumber(Auth_reducer?.userData?.boxNumber?.toString());
    setflatNumber(Auth_reducer?.userData?.flatNumber?.toString());
    setFloor(Auth_reducer?.userData?.floor?.toString());
    setBuilding(Auth_reducer?.userData?.building?.buildingName);
    setFlatType(Auth_reducer?.userData?.flatType?.toString());
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleUpdateUser = async () => {
    setLoading(true);
    const rs = await update_user(
      phoneNumber,
      residence,
      flatNumber,
      floor,
      boxNumber,
      flatType
    );
    if (rs) {
      setEdit(false);
      setLoading(false);
    }
  };

  return (
    <View style={{ position: "relative" }}>
      <View style={{ position: "absolute", right: 20, top: 50, zIndex: 10 }}>
        {edit ? (
          <TouchableOpacity
            onPress={handleUpdateUser}
            style={{
              backgroundColor: "blue",
              padding: 10,
              borderRadius: "50%"
            }}
          >
            <AntDesign name="save" size={30} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              AsyncStorage.clear();
              navigation.replace("LandingPage");
              dispatch(login_action(false));
              dispatch(user_data_action(null));
            }}
          >
            <Image source={require("../../../Assests/logout.png")} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={{
              width: Math.min(Dimensions.get("window").width * 0.4, 300),
              height: Math.min(Dimensions.get("window").width * 0.4, 300)
            }}
            source={require("../../../Assests/Group.png")}
          />
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?cs=srgb&dl=pexels-italo-melo-881954-2379004.jpg&fm=jpg"
            }}
            style={styles.profileImage}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.name}>
            {`${firstName} ${lastName}` || "Jone Doe"}
          </Text>

          <TouchableOpacity
            onPress={() => {
              setEdit(!edit);
            }}
          >
            <Button mode="contained" style={styles.button}>
              {t("edit_profile")}
            </Button>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <CustomTextInput
            label={t("phone_number")}
            marginTop={20}
            numerical
            value={phoneNumber}
            disabled={!edit}
            onChangeText={setPhoneNumber}
          />
          <CustomTextInput
            label={t("email")}
            marginTop={20}
            email
            value={email}
            disabled
            onChangeText={setEmial}
          />
          {/* <CustomTextInput
            label={t("role")}
            marginTop={20}
            value={role}
            //   onChangeText={setPhoneNumber}

          /> */}
          <CustomTextInput
            label={t("residence")}
            marginTop={20}
            value={residence}
            onChangeText={setResidence}
            disabled={!edit}
          />
          <CustomTextInput
            label={t("flat_number")}
            marginTop={20}
            value={flatNumber}
            onChangeText={setflatNumber}
            disabled={!edit}
          />
          <CustomTextInput
            label={t("floor")}
            marginTop={20}
            value={floor}
            numerical
            onChangeText={setFloor}
            disabled={!edit}
          />
          <CustomTextInput
            label={"Box Number"}
            marginTop={20}
            value={boxNumber}
            numerical
            onChangeText={setBoxNumber}
            disabled={!edit}
          />
          <CustomTextInput
            label={"Building"}
            marginTop={20}
            value={building}
            numerical
            onChangeText={setBuilding}
            disabled
          />
          <CustomTextInput
            label={"Flat Type"}
            marginTop={20}
            value={flatType}
            onChangeText={setFlatType}
            disabled={!edit}
          />

          {/* <CustomTextInput
            label={t("address_of_property")}
            marginTop={20}

            //   value={phoneNumber}
            //   onChangeText={setPhoneNumber}
          /> */}
        </View>
        {/* <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Contact Information</Text>
          <Text style={styles.cardText}>Email: johndoe@example.com</Text>
          <Text style={styles.cardText}>Phone: +1234567890</Text>
        </Card.Content>
      </Card> */}
      </ScrollView>
      <Loader visible={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#fff",
    marginBottom: 50,
    position: "relative",
    paddingBottom: 100
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20
  },
  profileImage: {
    width: Math.min(Dimensions.get("window").width * 0.45, 250),
    height: Math.min(Dimensions.get("window").width * 0.45, 250),
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    backgroundColor: "#fff",
    overflow: "hidden"
  },
  infoContainer: {
    alignItems: "center",
    marginBottom: 20
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333"
  },
  role: {
    fontSize: 18,
    color: "#6200ea",
    fontWeight: "500",
    marginVertical: 5
  },
  bio: {
    fontSize: 16,
    color: "#777",
    marginVertical: 5
  },
  email: {
    fontSize: 16,
    color: "#555"
  },
  phone: {
    fontSize: 16,
    color: "#555"
  },
  button: {
    marginTop: 15,
    backgroundColor: "#6200ea"
  },
  card: {
    marginVertical: 10,
    padding: 10
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6200ea"
  },
  cardText: {
    fontSize: 16,
    color: "#333",
    marginTop: 8
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20
  },
  socialButton: {
    width: "30%"
  },
  bottomNavigatorContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    width: "100%",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default ProfilePage;
