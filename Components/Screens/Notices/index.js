import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  Animated,
  StyleSheet
} from "react-native";
import BackButton from "../../Elements/BackButton";
import { notices } from "../../Fetch_Apis/notice";
import { Card } from "react-native-paper";
import CustomPage from "../Custom/CustomPage";
import { useDispatch } from "react-redux";
import { themeColor, themeColor2 } from "../../UserInterfase/ThemeColor";

const windowWidth = Dimensions.get("window").width;

const Notices = ({ navigation }) => {
  const theme = useColorScheme();

  const [filter_btn, setFilter_btn] = useState("General");
  const [data, setData] = useState([]);

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

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    const rs = await notices(navigation, dispatch);
    setData(rs);
  };

  const filteredData =
    Array.isArray(data) &&
    data.filter((item) => {
      if (filter_btn === "General") return item.type === "general";
      if (filter_btn === "Building specific")
        return item.type === "building_specific";
      if (filter_btn === "My notices") return item.type === "specific";
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

  // Render each notice with animation
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
          shadowOffset: { width: 0, height: 4 }
        }}
      >
        <CustomPage item={item} navigation={navigation} />
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
      <BackButton navigation={navigation} title="Notices" />
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
        {["General", "Building specific", "My notices"].map((category) => (
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

      {/* Notices List */}
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
              No Notices Available
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
          onPress={() => navigation.navigate("Create_notice")}
        >
          <Text style={styles.floatingButtonText}>Create Notice</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Notices;

const styles = StyleSheet.create({
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
