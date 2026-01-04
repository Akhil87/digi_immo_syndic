import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { Button } from "react-native-paper";
import BackButton from "../../../../Elements/BackButton";
import { ScrollView } from "react-native";
import { CustomTextInput } from "../../../../UserInterface/customInput";
import { useTranslation } from "react-i18next";
import CustomPicker from "../../../../UserInterface/customPicker";
import axios from "axios";
import { base_url } from "../../../../base_url";
import CustomAlertModal from "../../../../UserInterface/custom_modal";
import CustomSnackbar from "../../../../UserInterface/SnackBar";
import { Loader } from "../../../../UserInterface/loader";

const RegisterTenant = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setemail] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [buildingId, setBuildingId] = useState(null);
  const [floor, setFloor] = useState(null);
  const [flatNumber, setFlatNumber] = useState(null);
  const [flatType, setFlatType] = useState(null);
  const [boxNumber, setBoxNumber] = useState(null);
  const [password, setPassword] = useState(null);

  const [message, setMessage] = useState("");
  const [snackBarVisible, setSnackBarVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const handleRegistration = async () => {
    const formdata = {
      firstName,
      lastName,
      email,
      phoneNumber,
      buildingId,
      floor,
      flatNumber,
      flatType,
      boxNumber,
      password,
      role: "user"
    };

    console.log(formdata);

    const formData = new FormData();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !floor ||
      !flatNumber ||
      !flatType ||
      !boxNumber ||
      !password
    ) {
      Alert.alert("Aleart", "Please fill a all required fields");
      return;
    }

    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("floor", floor);
    formData.append("flatNumber", flatNumber);
    formData.append("flatType", flatType);
    formData.append("boxNumber", boxNumber);
    formData.append("password", password);
    formData.append("buildingId", buildingId);
    formData.append("role", "user");

    setLoading(true);

    try {
      const rs = await axios.post(base_url + "/api/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log("Tenant response ////////  ", rs?.data?.response);
      if (rs?.data) {
        console.log(rs.data.response);
        setIsModalVisible(true);
      }
    } catch (error) {
      // console.error(error.response.data);
      setMessage(error.response.data);
      setSnackBarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          position: "relative",
          flex: 1,
          backgroundColor: "white",
          width: windowWidth,
          height: windowHeight,
          alignItems: "center",
          justifyContent: "center"
          // paddingHorizontal: 16
        }}
      >
        <View style={styles.header}>
          <BackButton navigation={navigation} title={""} />
        </View>

        <View
          style={{
            flexDirection: "column",
            backgroundColor: "rgba(0,0,0,0.5)",
            marginTop: 50,
            alignItems: "center"
          }}
        >
          <Image
            source={require("../../../../Assests/logo.png")}
            style={{
              backgroundColor: "white",
              width: windowWidth * 0.5,
              height: windowWidth * 0.5,
              resizeMode: "contain"
            }}
          />
        </View>

        <ScrollView
          style={{ width: "100%" }}
          contentContainerStyle={{
            paddingBottom: 120,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              marginTop: 20,
              textAlign: "center"
            }}
          >
            {t("registration")}
          </Text>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#47677d",
              textAlign: "center",
              marginBottom: 20
            }}
          >
            {t("tenant")}
          </Text>
          <CustomTextInput
            label={t("first_name")}
            marginTop={30}
            value={firstName}
            onChangeText={setFirstName}
          />
          <CustomTextInput
            label={t("last_name")}
            marginTop={20}
            value={lastName}
            onChangeText={setLastName}
          />
          <CustomTextInput
            label={t("email")}
            marginTop={20}
            email
            value={email}
            onChangeText={setemail}
          />
          <CustomTextInput
            label={t("phone_number")}
            marginTop={20}
            numerical
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />

          <CustomPicker setBuildingId={setBuildingId} />

          <CustomTextInput
            // label={t("address_of_property")}
            label="Floor"
            marginTop={0}
            numerical
            value={floor}
            onChangeText={setFloor}
          />
          <CustomTextInput
            // label={t("address_of_property")}
            label="Flat Number"
            marginTop={20}
            numerical
            value={flatNumber}
            onChangeText={setFlatNumber}
          />
          <CustomTextInput
            // label={t("address_of_property")}
            label="Flat Type"
            marginTop={20}
            value={flatType}
            onChangeText={setFlatType}
          />
          <CustomTextInput
            // label={t("address_of_property")}
            label="Box Number"
            marginTop={20}
            numerical
            value={boxNumber}
            onChangeText={setBoxNumber}
          />
          <CustomTextInput
            label={t("password")}
            marginTop={20}
            password
            value={password}
            onChangeText={setPassword}
          />
          {/* <CustomTextInput
            label={t("address_of_property")}
            marginTop={20}

            //   value={phoneNumber}
            //   onChangeText={setPhoneNumber}
          />
          <CustomTextInput
            label={t("syndic_name")}
            marginTop={20}

            //   value={phoneNumber}
            //   onChangeText={setPhoneNumber}
          />

         
         
          <CustomTextInput
            label={t("residential_address")}
            marginTop={20}

            //   value={phoneNumber}
            //   onChangeText={setPhoneNumber}
          />
          <CustomTextInput
            label={t("second_owner")}
            marginTop={20}

            //   value={phoneNumber}
            //   onChangeText={setPhoneNumber}
          /> */}
        </ScrollView>

        <TouchableOpacity
          style={{
            alignSelf: "center",
            position: "absolute",
            bottom: 10,
            width: "80%"
          }}
          onPress={handleRegistration}
        >
          <Button
            mode="contained"
            buttonColor="#04344c"
            textColor="white"
            theme={{
              roundness: 20
            }}
            style={{
              paddingVertical: 10,
              borderColor: "#04344c",
              borderWidth: 2,
              borderRadius: 40
            }}
          >
            {t("registration")}
          </Button>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={()=>setIsModalVisible(true)}><Text>click</Text></TouchableOpacity> */}
        <CustomAlertModal
          isVisible={isModalVisible}
          onClose={() => {
            setIsModalVisible(false);
            navigation.reset({
              index: 0,
              routes: [{ name: "LandingPage" }]
            });
          }}
          navigation={navigation}
        />
        <CustomSnackbar
          message={message}
          visible={snackBarVisible}
          onDismissSnackBar={() => setSnackBarVisible(false)}
        />
        <Loader visible={loading} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegisterTenant;

const styles = {
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10
  }
};
