import React from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons"; // more modern icon
import { themeColor } from "../../UserInterfase/ThemeColor";

const windowWidth = Dimensions.get("window").width;

const BackButton = ({ navigation, title }) => {
  const { t } = useTranslation();
  const hasTitle = !!title;

  return (
    <View
      style={{
        backgroundColor: hasTitle ? themeColor : "transparent", // semi-transparent blue
        paddingTop: 30,
        paddingBottom: 12,
        paddingHorizontal: 20,
        borderBottomWidth: hasTitle ? 0.5 : 0,
        borderBottomColor: "rgba(255,255,255,0.2)",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 5
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        style={{
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        {/* Modern arrow */}
        <Ionicons name="arrow-back" size={28} color="#000" />
        {hasTitle && (
          <Text
            style={{
              fontSize: Math.min(windowWidth * 0.05, 20),
              fontWeight: "600",
              marginLeft: 12,
              color: "#000"
            }}
          >
            {t(`${title}`)}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;
