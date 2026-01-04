import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from "react-native";
import { useTranslation } from "react-i18next";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Card } from "react-native-paper";
import { Dimension } from "../../../UserInterfase/Dimensions";
import { themeColor } from "../../../UserInterfase/ThemeColor";

const screenWidth = Dimensions.get("window").width;

const Home = ({ navigation }) => {
  const { t } = useTranslation();
  const theme = useColorScheme();

  const Communities = [
    {
      id: 1,
      name: "notices",
      icon: "bell-outline", // more specific to alerts/notices
      route: "Notices"
    },
    {
      id: 2,
      name: "forums",
      icon: "forum-outline",
      route: "Forums"
    },
    {
      id: 3,
      name: "help_desk",
      icon: "headset", 
      route: "HelpDesk"
    },
    {
      id: 4,
      name: "Directory",
      icon: "account-group-outline",
      route: "Directory"
    },
    {
      id: 5,
      name: "Residents",
      icon: "account-multiple-outline", 
      route: "Profiles"
    }
  ];

  const Services = [
    { id: 9, name: "Attendance", icon: "clipboard-check-outline" },
    { id: 10, name: "Cleaning & Maintenance", icon: "tools" }
  ];

  const renderComunityServices = ({ item }) => (
    <Card
      style={{
        width: screenWidth / 4,
        backgroundColor: "#ffffff",
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: theme === "dark" ? "#ffffff" : "rgb(218, 217, 217)"
      }}
    >
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: screenWidth / 4,
          paddingVertical: 10
        }}
        onPress={() => {
          if (item.route) {
            navigation.navigate(item.route, { title: item.name });
          }
        }}
      >
        <View
          style={{
            width: Math.min(screenWidth / 8, 70),
            height: Math.min(screenWidth / 8, 70),
            borderRadius: 15,
            // backgroundColor: theme === "dark" ? "#ffffff" : "#f0f0f0",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <MaterialCommunityIcons
            name={item.icon}
            size={Math.min(screenWidth / 12, 35)}
            color={theme === "dark" ? "#000000" : "#2D6AFE"}
          />
        </View>
        <Text
          style={{
            fontWeight: "600",
            fontSize: 12,
            color: theme === "dark" ? "white" : "gray",
            marginTop: 5,
            textAlign: "center"
          }}
        >
          {/* {t(item.name.length > 10 ? item.name.substring(0, 10) + "..." : item.name)} */}
          {t(item?.name)}
        </Text>
      </TouchableOpacity>
    </Card>
  );

  const renderServices = ({ item }) => (
    <Card
      style={{
        paddingHorizontal: 12,
        paddingVertical: 5,
        backgroundColor: "#ffffff",
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: theme === "dark" ? "#ffffff" : "rgb(218, 217, 217)"
      }}
    >
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: screenWidth / 3,
          paddingVertical: 10,
          flexDirection: "row",
          gap: 5
        }}
        onPress={() => {
          if (item.route) {
            navigation.navigate(item.route, { title: item.name });
          }
        }}
      >
        <View
          style={{
            // width: Math.min(screenWidth / 8, 70),
            // height: Math.min(screenWidth / 8, 70),
            borderRadius: 15,
            // backgroundColor: theme === "dark" ? "#ffffff" : "#f0f0f0",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <MaterialCommunityIcons
            name={item.icon}
            size={Math.min(screenWidth / 12, 35)}
            color={theme === "dark" ? "#000000" : "#2D6AFE"}
          />
        </View>
        <Text
          style={{
            fontWeight: "600",
            fontSize: 12,
            color: theme === "dark" ? "white" : "gray",
            marginTop: 5,
            textAlign: "center"
          }}
        >
          {/* {t(item.name.length > 10 ? item.name.substring(0, 10) + "..." : item.name)} */}
          {t(item?.name)}
        </Text>
      </TouchableOpacity>
    </Card>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        // minHeight: Dimension.height,
        backgroundColor: "rgb(252, 248, 248)"
      }}
    >
      {/* <StatusBar barStyle={"light-content"} /> */}
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 16,
          paddingHorizontal: 10,
          marginTop: Dimensions.get("window").width * 0.25
        }}
      >
        <Text
          style={{
            fontWeight: "700",
            fontSize: 16,
            color: theme === "dark" ? "white" : "black",
            marginVertical: 10
          }}
        >
          My Buildings
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10
          }}
        >
          <Card
            style={{
              width: Dimension.width / 4,
              marginBottom: 10,
              justifyContent: "center",
              alignItems: "center",
              padding: 12,
              backgroundColor: theme === "dark" ? "#ffffff" : "#ffffff"
            }}
          >
            <TouchableOpacity>
              <Text>Building 1</Text>
            </TouchableOpacity>
          </Card>
          <Card
            style={{
              width: Dimension.width / 4,
              marginBottom: 10,
              justifyContent: "center",
              alignItems: "center",
              padding: 12,
              backgroundColor: theme === "dark" ? "#ffffff" : "#ffffff"
            }}
          >
            <TouchableOpacity>
              <Text>Building 2</Text>
            </TouchableOpacity>
          </Card>
          <Card
            style={{
              width: Dimension.width / 4,
              marginBottom: 10,
              justifyContent: "center",
              alignItems: "center",
              padding: 12,
              backgroundColor: theme === "dark" ? "#ffffff" : "#ffffff"
            }}
          >
            <TouchableOpacity>
              <Text>Building 3</Text>
            </TouchableOpacity>
          </Card>
        </View>

        <Card
          style={{
            paddingHorizontal: 10,
            backgroundColor: "white",
            marginTop: 5,
            paddingBottom: 20
          }}
        >
          <SectionTitle title={t("Building Services")} theme={theme} />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={Communities}
            renderItem={renderComunityServices}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{
              paddingVertical: 10,
              gap: 15
            }}
          />
        </Card>

        <Card
          style={{
            paddingHorizontal: 10,
            backgroundColor: "white",
            marginTop: 20
          }}
        >
          <SectionTitle title={t("Activity Log")} theme={theme} />
          <FlatList
            key={2}
            data={Services}
            renderItem={renderServices}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginTop: 10,
              marginBottom: 30
            }}
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const SectionTitle = ({ title, theme }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 10
    }}
  >
    <Text
      style={{
        fontWeight: "700",
        fontSize: 16,
        color: theme === "dark" ? "white" : "black"
      }}
    >
      {title}
    </Text>
    {/* {title !== "Activity Log" && (
      <TouchableOpacity>
        <Text
          style={{
            // textDecorationLine: "underline",
            fontSize: 14,
            color: theme === "dark" ? "white" : "rgb(0, 31, 88)",
            fontWeight: "600"
          }}
        >
          {`More`}...
        </Text>
      </TouchableOpacity>
    )} */}
  </View>
);

export default Home;

// import React from "react";
// import {
//   Dimensions,
//   FlatList,
//   Image,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   useColorScheme,
//   ScrollView
// } from "react-native";
// import { useTranslation } from "react-i18next";

// const screenWidth = Dimensions.get("window").width;

// const Home = ({ navigation }) => {
//   const { t } = useTranslation();
//   const theme = useColorScheme();

//   const Communities = [
//     { id: 1, name: "notices", image: require("../../../Assests/notices.png"), route: "Notices" },
//     { id: 2, name: "forums", image: require("../../../Assests/form.png"), route: "Forums" },
//     { id: 3, name: "directory", image: require("../../../Assests/directorys.png"), route: "Directory" },
//     { id: 4, name: "meetings", image: require("../../../Assests/meetings.png"), route: "Meetings" }
//   ];

//   const MyHome = [
//     { id: 5, name: "tenant", image: require("../../../Assests/tanant.png"), route: "Profiles" },
//     { id: 6, name: "bill_payments", image: require("../../../Assests/bills.webp"), route: "Bills" },
//     { id: 7, name: "help_desk", image: require("../../../Assests/helpdesks.png"), route: "HelpDesk" }
//   ];

//   const Services = [
//     { id: 8, name: "cleaning", image: require("../../../Assests/cleaning.png") },
//     { id: 9, name: "painting", image: require("../../../Assests/painting.png") },
//     { id: 10, name: "packers", image: require("../../../Assests/packers.png") },
//     { id: 11, name: "property", image: require("../../../Assests/property.png") }
//   ];

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       style={{
//         alignItems: "center",
//         justifyContent: "center",
//         width: screenWidth / 5,
//         paddingVertical: 10
//       }}
//       onPress={() => {
//         if (item.route) {
//           navigation.navigate(item.route, { title: item.name });
//         }
//       }}
//     >
//       <Image
//         style={{
//           width: screenWidth / 8,
//           height: screenWidth / 8,
//           resizeMode: "contain",
//           backgroundColor: theme === "dark" ? "white" : "",
//           borderRadius: 15
//         }}
//         source={item.image}
//       />
//       <Text
//         style={{
//           fontWeight: "600",
//           fontSize: 12,
//           color: theme === "dark" ? "white" : "gray",
//           marginTop: 5,
//           textAlign: "center"
//         }}
//       >
//         {t(item.name.length > 10 ? item.name.substring(0, 10) + "..." : item.name)}
//       </Text>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <ScrollView
//         contentContainerStyle={{
//           paddingBottom: 16,
//           paddingHorizontal: 10,marginTop: Dimensions.get("window").width * 0.25
//         }}
//       >
//         {/* --- Community Services --- */}
//         <SectionTitle title={t("community_services")} theme={theme} />
//         <FlatList
//           key={4}
//           data={Communities}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.id.toString()}
//           numColumns={4}
//           scrollEnabled={false}
//           columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 10 }}
//         />

//         {/* --- My Home --- */}
//         <SectionTitle title={t("my_home")} theme={theme} />
//         <FlatList
//           key={4}
//           data={MyHome}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.id.toString()}
//           numColumns={4}
//           scrollEnabled={false}
//           columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 10 }}
//         />

//         {/* --- Services --- */}
//         <SectionTitle title={t("services")} theme={theme} />
//         <FlatList
//           key={4}
//           data={Services}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.id.toString()}
//           numColumns={4}
//           scrollEnabled={false}
//           columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 10 }}
//         />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const SectionTitle = ({ title, theme }) => (
//   <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 10 }}>
//     <Text style={{ fontWeight: "900", fontSize: 18, color: theme === "dark" ? "white" : "black" }}>
//       {title}
//     </Text>
//     <TouchableOpacity>
//       <Text style={{ textDecorationLine: "underline", fontSize: 14, color: theme === "dark" ? "white" : "black" }}>
//         {`More`}
//       </Text>
//     </TouchableOpacity>
//   </View>
// );

// export default Home;
