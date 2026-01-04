import React, { useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native";
import { Card } from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";
import BackButton from "../../../Elements/BackButton";

const Forums_details = ({ navigation }) => {
  const [wishlist, setWishlist] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <BackButton navigation={navigation} title="Forums Details" />
      <ScrollView>
        {[1, 2, 3, 4].map((_, index) => {
          return (
            <Card
              style={{
                marginTop: 10,
                padding: 10,
                marginHorizontal: 10
              }}
              key={index}
            >
              <TouchableOpacity style={{}}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {/* Profile Picture Placeholder */}
                  <View style={{ position: "relative" }}>
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        backgroundColor: "gray",
                        borderRadius: 25, // Corrected for circular shape
                        marginRight: 10 // Added spacing
                      }}
                    />
                    <View
                      style={{
                        width: 15,
                        height: 15,
                        backgroundColor:
                          index % 2 === 0
                            ? "rgb(2, 255, 23)"
                            : "rgb(2, 204, 255)",
                        borderRadius: 25,
                        position: "absolute",
                        bottom: 3,
                        right: 8
                      }}
                    />
                  </View>

                  {/* Content Wrapper */}
                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: Math.min(
                              Dimensions.get("window").width * 0.041,
                              16
                            )
                          }}
                        >
                          Lorem Ipsum dolor sit (...)
                        </Text>
                        <Text
                          style={{
                            fontWeight: "600",
                            color: "rgb(182, 182, 182)"
                          }}
                        >
                          Brice{" "}
                        </Text>
                      </View>
                      <TouchableOpacity onPress={() => setWishlist(!wishlist)}>
                        <AntDesign
                          name={wishlist ? "heart" : "hearto"}
                          size={24}
                          color="rgb(247, 50, 148)"
                        />
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 5
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "600",
                          fontSize: Math.min(
                            Dimensions.get("window").width * 0.041,
                            16
                          ),
                          color: "rgb(80, 80, 80)"
                        }}
                      >
                        30 Replies{" "}
                      </Text>
                      <Text
                        style={{
                          fontWeight: "600",
                          fontSize: Math.min(
                            Dimensions.get("window").width * 0.031,
                            16
                          ),
                          color: "rgb(165, 163, 163)"
                        }}
                      >
                        30 Aug 2024{" "}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </Card>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Forums_details;
