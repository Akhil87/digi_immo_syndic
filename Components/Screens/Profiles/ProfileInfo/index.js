import React from "react";
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import BackButton from "../../../Elements/BackButton";
import { Card } from "react-native-paper";
import { Dimension } from "../../../UserInterfase/Dimensions";
import { themeColor } from "../../../UserInterfase/ThemeColor";
import {
  tenants_approve,
  tenants_delete
} from "../../../Fetch_Apis/tenant_Profiles";
import { useDispatch, useSelector } from "react-redux";
const data = {
  boxNumber: "15",
  building: {
    assets: [Array],
    buildingName: "Anciens Combattants 91",
    buildingNumber: 91,
    city: "Evere",
    fullAddress: "Avenue Anciens Combattants 91, Evere - 1142",
    id: 10,
    pincode: 1142,
    streetName: "Avenue Anciens Combattants 91",
    syndicAddress: "Hulpe road 150,170 Watermael-Boitsfort",
    syndicAdminEmail: "lgi@gestionimmeubles.be",
    syndicBTW: "BE14413",
    syndicLogo:
      "http://res.cloudinary.com/dfrh2bbkn/image/upload/c_scale,f_auto,q_auto,w_500/v1/SocietyPhotos/syndicLogo545949",
    syndicName: "gestionimmeubles",
    syndicWebsite: "https://gestionimmeubles.be/"
  },
  email: "dev1@gmail.com",
  firstName: "Dev1",
  flatNumber: 1,
  flatType: "1BHK",
  floor: 1,
  id: 13,
  lastName: "Sharma ",
  ownerApproved: true,
  phoneNumber: "1234567744",
  residence: "andhus",
  role: "owner",
  syndicApproved: true
};
const ProfileInfo = ({ route, navigation }) => {
  // const {
  //   email,
  //   id,
  //   firstName,
  //   lastName,
  //   phoneNumber,
  //   floor,
  //   flatNumber,
  //   boxNumber,
  //   building,
  //   residence,
  //   flatType,
  //   role
  // } = route?.params?.data;

  const dispatch = useDispatch();

  const handleApprove = async () => {
    const rs = await tenants_approve(navigation, id, dispatch);
  };

  const handleDeleteTenant = async () => {
    const rs = await tenants_delete(navigation, id, dispatch);
  };

  const { selected_tenants_details } = useSelector(
    (state) => state.Tenants_reducer
  );
  const {
    email,
    id,
    firstName,
    lastName,
    phoneNumber,
    floor,
    flatNumber,
    boxNumber,
    building,
    residence,
    flatType,
    role,
    syndicApproved,
    ownerApproved
  } = selected_tenants_details && selected_tenants_details;
  return (
    <View style={{ flex: 1 }}>
      <BackButton navigation={navigation} title="Tanant Profile" />

      <Card style={styles.profileCard}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.profileCardOpac}
          onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
        >
          <Image
            source={{
              uri: "https://cdn.openart.ai/published/MPODh50b7qoh6ctuw8wy/4LklgBnG_30aM_raw.jpg"
            }}
            style={styles.profileimage}
          />
          <View style={styles.mainContent}>
            <Text style={styles.profielName}>
              {firstName} {lastName}
            </Text>
            <Text style={[styles.otherText, { marginTop: 10 }]}>{email}</Text>
            <Text style={[styles.otherText, { marginTop: 10 }]}>
              {phoneNumber}
            </Text>
          </View>
        </TouchableOpacity>
      </Card>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <Card style={{ margin: 10 }}>
          <View style={styles.allContent}>
            <Text style={styles.profielName}>Regidence</Text>
            <Text style={styles.otherText}>{residence}</Text>
          </View>
          <View style={styles.allContent}>
            <Text style={styles.profielName}>Flat Number</Text>
            <Text style={styles.otherText}>{flatNumber}</Text>
          </View>
          <View style={styles.allContent}>
            <Text style={styles.profielName}>Floor</Text>
            <Text style={styles.otherText}>{floor}</Text>
          </View>
          <View style={styles.allContent}>
            <Text style={styles.profielName}>Box Number</Text>
            <Text style={styles.otherText}>{boxNumber}</Text>
          </View>
          <View style={styles.allContent}>
            <Text style={styles.profielName}>Building</Text>
            <Text style={styles.otherText}>{building?.buildingName}</Text>
          </View>
          <View style={styles.allContent}>
            <Text style={styles.profielName}>Flat Type</Text>
            <Text style={styles.otherText}>{flatType}</Text>
          </View>
          <View style={styles.allContent}>
            <Text style={styles.profielName}>Role</Text>
            <Text style={styles.otherText}>{role}</Text>
          </View>
          <View style={styles.allContent}>
            <Text style={styles.profielName}>Syndic Approved</Text>
            <Text
              style={[
                styles.otherText,
                { color: syndicApproved ? "green" : "red", fontWeight: "bold" }
              ]}
            >
              {syndicApproved ? "Yes" : "No"}
            </Text>
          </View>
          <View style={styles.allContent}>
            <Text style={styles.profielName}>Owner Approved</Text>
            <Text
              style={[
                styles.otherText,
                { color: ownerApproved ? "green" : "red", fontWeight: "bold" }
              ]}
            >
              {ownerApproved ? "Yes" : "No"}
            </Text>
          </View>
          <View style={styles.allContent}>
            <Text style={styles.profielName}>Syndic Website</Text>
            <Text
              style={[
                styles.otherText,
                { color: "blue", textDecorationLine: "underline" }
              ]}
              onPress={() => Linking.openURL(building?.syndicWebsite)}
            >
              {building?.syndicWebsite}
            </Text>
          </View>
        </Card>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          bottom: 20,
          left: 0,
          width: Dimension.width,
          justifyContent: "space-between",
          paddingHorizontal: 50
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: ownerApproved ? "green" : themeColor,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 10
          }}
          activeOpacity={0.4}
          onPress={handleApprove}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
            {ownerApproved ? "Approved" : "Approve"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "red",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 10
          }}
          activeOpacity={0.4}
          onPress={handleDeleteTenant}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileInfo;

const styles = StyleSheet.create({
  profileCard: {
    margin: Dimension.width * 0.02,
    width: Dimension.width * 0.96
  },
  profileCardOpac: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10
  },
  profileimage: {
    height: Math.min(Dimension.width * 0.3, 150),
    width: Math.min(Dimension.width * 0.3, 150),
    borderRadius: 10
  },
  mainContent: {
    textAlign: "right",
    alignItems: "flex-end"
  },
  profielName: {
    fontWeight: "bold",
    fontSize: Math.min(Dimension.width * 0.045, 16),
    marginRight: 10
  },
  otherText: {
    fontWeight: "semibold",
    marginRight: 10
  },
  allContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginTop:10,
    padding: 10
  }
});
