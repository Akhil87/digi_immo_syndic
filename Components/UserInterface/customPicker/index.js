import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback
} from "react-native";
import { Button, Card } from "react-native-paper";
import { CustomTextInput } from "../customInput";
import axios from "axios";
import { base_url } from "../../base_url";

const FullScreenPickerWithSearch = ({ setBuildingId }) => {
  const [text, setText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const { t } = useTranslation();
  const [buildings, setBuilding] = useState([]);

  const fetchBuildings = async () => {
    try {
      const rs = await axios.get(
        base_url + `/api/buildings/search?name=${search}`
      );
      console.log(rs?.data);
      setBuilding(rs?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBuildings();
  }, [search]);

  const handleSelect = (value) => {
    setText(value.buildingName);
    setModalVisible(false);
    setSearch("");
    setBuildingId(value?.id);
  };

  return (
    <View style={{ padding: 20, height: 100 }}>
      {/* Input Box */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <CustomTextInput
          label="Select a Building"
          value={text || "Select an option"}
          editable={true}
        />
      </TouchableOpacity>

      {/* Full-Screen Modal with Search */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        backdropColor="transparent"
        style={{ margin: 0 }}
        statusBarTranslucent={true}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "center"
            }}
          >
            <TouchableWithoutFeedback>
              <View
                style={{
                  backgroundColor: "white",
                  marginHorizontal: 20,
                  borderRadius: 10,
                  padding: 20,
                  maxHeight: "80%"
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
                >
                  Enter Your Building Name
                </Text>

                {/* Search Box */}
                <TextInput
                  style={{
                    height: 45,
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 5,
                    paddingHorizontal: 10,
                    marginBottom: 10
                  }}
                  placeholder="Search..."
                  value={search}
                  onChangeText={setSearch}
                />

                {/* Filtered List */}
                {buildings.length > 0 ? (
                  <FlatList
                    data={buildings}
                    keyExtractor={(item, index) =>
                      item.buildingId?.toString() || index.toString()
                    } // FIXED KEY ISSUE
                    renderItem={({ item }) => (
                      <Card
                        style={{
                          paddingVertical: 8,
                          paddingHorizontal: 10,
                          marginTop: 10,
                          backgroundColor: "rgb(247, 247, 247)"
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => handleSelect(item)}
                          style={{ paddingVertical: 0 }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              textTransform: "capitalize",
                              fontWeight: "600",
                              color: "rgb(100, 100, 100)"
                            }}
                          >
                            {item.buildingName}
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              color: "rgb(168, 168, 168)"
                            }}
                          >
                            {item.streetName}
                          </Text>
                        </TouchableOpacity>
                      </Card>
                    )}
                  />
                ) : (
                  <Text style={{ textAlign: "center", marginVertical: 10 }}>
                    No results found
                  </Text>
                )}

                {/* Close Button */}
                <Button
                  mode="contained"
                  onPress={() => setModalVisible(false)}
                  style={{ marginTop: 20 }}
                >
                  Close
                </Button>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default FullScreenPickerWithSearch;
