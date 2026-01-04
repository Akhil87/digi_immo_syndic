import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList, // Use FlatList for efficient rendering
  Animated,
  useColorScheme,
  Linking
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BackButton from "../../Elements/BackButton";
import { directory } from "../../Fetch_Apis/directory";
import { Card } from "react-native-paper";
import { useDispatch } from "react-redux";
import { themeColor, themeColor2 } from "../../UserInterfase/ThemeColor";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useFocusEffect } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;

const Directory = ({ navigation }) => {
  const theme = useColorScheme();
  const [data, setData] = useState([]);
  const [filter_btn, setFilter_btn] = useState("Emergency");
  const [recoverData, setRecoverData] = useState([]);

  const dispatch = useDispatch();
  const slideAnim = useRef(new Animated.Value(50)).current;
  const animatedValues = useRef([]).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true
    }).start();
  }, []);

  const fetchData = async () => {
    const rs = await directory(navigation, dispatch);
    setRecoverData(rs);
    console.log(rs);

    const emergencyNumbers = rs?.filter((item) => item?.type === "EMERGENCY");
    setData(emergencyNumbers);
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );
  const filteredData =
    Array.isArray(data) &&
    recoverData?.filter((item) => {
      if (filter_btn === "Emergency") return item?.type === "EMERGENCY";
      if (filter_btn === "Syndic") return item?.type === "SYNDIC";
      if (filter_btn === "Other Numbers") return item?.type === "OTHER";
      return true;
    });

  useEffect(() => {
    if (filteredData.length) {
      animatedValues.length = filteredData.length;
      animatedValues.forEach((_, i) => {
        animatedValues[i] = new Animated.Value(50);
        Animated.timing(animatedValues[i], {
          toValue: 0,
          duration: 500,
          delay: i * 100,
          useNativeDriver: true
        }).start();
      });
    }
  }, [filteredData]);

  const renderItem = ({ item, index }) => (
    <Animated.View
      key={index}
      style={{
        transform: [
          { translateY: animatedValues[index] || new Animated.Value(0) }
        ],
        opacity: animatedValues[index]
          ? animatedValues[index].interpolate({
              inputRange: [0, 50],
              outputRange: [1, 0]
            })
          : 1,
        marginBottom: 10
      }}
    >
      <Card
        style={{
          backgroundColor: theme === "dark" ? "#1F2937" : "#FFFFFF",
          borderRadius: 16,
          elevation: 3,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 4 },
          position: "relative",
          overflow: "visible"
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Create_Directory", {
              item: item
            });
          }}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 1
          }}
        >
          <MaterialCommunityIcons
            name="pencil-circle"
            size={30}
            color={theme === "dark" ? "#FBBF24" : themeColor2}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => Linking.openURL(`tel:${item?.phoneNumber}`)}
        >
          <MaterialCommunityIcons
            name="account-group-outline"
            size={40}
            color={theme === "dark" ? "#A3A3A3" : "#6C63FF"}
            style={styles.icon}
          />
          <View style={styles.textContainer}>
            <Text style={styles.category}>{item?.serviceType}</Text>
            <Text style={styles.title}>{item?.contactPerson}</Text>
            <Text style={styles.location}>{item?.name}</Text>
            {item?.email && <Text style={styles.location}>{item?.email}</Text>}
            <Text style={styles.location}>{item?.phoneNumber}</Text>
          </View>
        </TouchableOpacity>
      </Card>
    </Animated.View>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme === "dark" ? "#0D0D0D" : "rgb(252, 248, 248)"
      }}
    >
      <BackButton navigation={navigation} title="Directory" />
      {/* <StatusBar barStyle="light-content" backgroundColor="transparent" /> */}

      {/* Filter Buttons */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: windowWidth * 0.02,
          paddingVertical: 16,
          backgroundColor: theme === "dark" ? "#1A1A1A" : "#FFFFFF",
          borderBottomColor: "#E5E7EB",
          borderBottomWidth: 1,
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
          elevation: 3
        }}
      >
        {["Emergency", "Syndic", "Other Numbers"].map((category) => (
          <Animated.View
            key={category}
            style={{ transform: [{ translateY: slideAnim }] }}
          >
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                paddingHorizontal: 18,
                borderRadius: 20,
                backgroundColor:
                  filter_btn === category
                    ? themeColor2
                    : theme === "dark"
                    ? "#2C2C2E"
                    : "#F1F5F9",
                borderWidth: filter_btn === category ? 0 : 1,
                borderColor: "#E5E7EB"
              }}
              onPress={() => setFilter_btn(category)}
            >
              <Text
                style={{
                  fontWeight: "600",
                  color:
                    filter_btn === category
                      ? "#FFFFFF"
                      : theme === "dark"
                      ? "#D1D5DB"
                      : "#374151",
                  fontSize: 14
                }}
              >
                {category}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>

      {/* Directory List */}
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          paddingHorizontal: windowWidth * 0.04,
          paddingTop: 20,
          paddingBottom: 60
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={{ alignItems: "center", marginTop: "50%" }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
                color: theme === "dark" ? "#9CA3AF" : "#6B7280"
              }}
            >
              No Directory Available
            </Text>
          </View>
        }
      />
      <View
        style={{
          position: "absolute",
          left: 0,
          bottom: 20,
          alignItems: "center",
          justifyContent: "center",
          width: windowWidth
        }}
      >
        <TouchableOpacity
          style={styles.floatingButton}
          activeOpacity={0.4}
          onPress={() => navigation.navigate("Create_Directory")}
        >
          <Text style={styles.floatingButtonText}>Create Directory</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 16
  },
  icon: {
    marginRight: 16
  },
  textContainer: {
    flex: 1
  },
  category: {
    color: "#6C63FF",
    fontSize: 14,
    fontWeight: "600"
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333"
  },
  location: {
    fontSize: 14,
    color: "gray"
  },
  floatingButton: {
    backgroundColor: themeColor,
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgb(63, 162, 201)"
  },
  floatingButtonText: {
    color: "rgb(75, 74, 74)",
    fontWeight: "bold",
    fontSize: 16
  }
});

export default Directory;
