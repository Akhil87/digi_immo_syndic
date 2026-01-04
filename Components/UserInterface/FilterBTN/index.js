import React, { useEffect, useRef } from "react";
import {
  Animated,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from "react-native";
import { Card } from "react-native-paper";

const windowWidth = Dimensions.get("window").width;

const AnimatedFilterButtons = ({ filter_btn, setFilter_btn, categories1 }) => {
  const categories = ["General", "Building specific", "My notices"];
  const animations = useRef(
    categories1.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    categories1.forEach((category, index) => {
      Animated.timing(animations[index], {
        toValue: filter_btn === category ? 1 : 0,
        duration: 300,
        useNativeDriver: false
      }).start();
    });
  }, [filter_btn]);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: windowWidth * 0.02,
        paddingVertical: windowWidth * 0.04
      }}
    >
      {categories1.map((category, index) => {
        const backgroundColor = animations[index].interpolate({
          inputRange: [0, 1],
          outputRange: ["transparent", "#04344c"]
        });

        const textColor = animations[index].interpolate({
          inputRange: [0, 1],
          outputRange: ["black", "white"]
        });

        return (
          <Card key={category} style={{ borderRadius: 8 }}>
            <TouchableOpacity onPress={() => setFilter_btn(category)}>
              <Animated.View
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                  borderRadius: 8,
                  backgroundColor
                }}
              >
                <Animated.Text
                  style={{
                    fontWeight: "500",
                    color: textColor
                  }}
                >
                  {category}
                </Animated.Text>
              </Animated.View>
            </TouchableOpacity>
          </Card>
        );
      })}
    </View>
  );
};

export default AnimatedFilterButtons;
