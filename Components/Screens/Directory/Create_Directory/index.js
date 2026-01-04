import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Modal,
  FlatList,
  TouchableWithoutFeedback
} from "react-native";
import BackButton from "../../../Elements/BackButton";
import { Dimension } from "../../../UserInterfase/Dimensions";
import { themeColor } from "../../../UserInterfase/ThemeColor";
import { buildings } from "../../../Fetch_Apis/buildings";
import { useDispatch } from "react-redux";
import {
  Create_Directory_api,
  update_Directory_api
} from "../../../Fetch_Apis/directory";

const typeOptions = ["EMERGENCY", "SYNDIC", "OTHER"];

const Create_Directory = ({ navigation, route }) => {
  const { item } = route?.params || {};

  const [form, setForm] = useState({
    name: "",
    contactPerson: "",
    email: "",
    serviceType: "",
    availability: "",
    phoneNumber: "",
    buildingId: null,
    type: "",
    id: null
  });

  const [buildingDropdownVisible, setBuildingDropdownVisible] = useState(false);
  const [typeDropdownVisible, setTypeDropdownVisible] = useState(false);
  const [building, setBuilding] = useState(null);

  const dispatch = useDispatch();

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleGetBuildings = async () => {
    const rs = await buildings(navigation, dispatch);
    setBuilding(rs);
  };

  useEffect(() => {
    handleGetBuildings();
    if (item) {
      setForm((prev) => ({
        ...prev,
        name: item.name,
        contactPerson: item.contactPerson,
        email: item.email,
        serviceType: item.serviceType,
        availability: item.availability,
        phoneNumber: item.phoneNumber,
        buildingId: item.building.id,
        type: item.type,
        id: item.id
      }));
    }
  }, [item]);

  const handleSubmit = async () => {
    const rs = await Create_Directory_api(form, navigation, dispatch);
    if (rs.status === 200) {
      navigation.goBack();
    }
  };

  const handleUpdate = async () => {
    const rs = await update_Directory_api(form, navigation, dispatch);
    if (rs.status === 200) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BackButton navigation={navigation} title={item ? "Update Directory":"Create Directory"} />
      <ScrollView contentContainerStyle={styles.container}>
        {[
          { label: "Name", key: "name" },
          { label: "Contact Person", key: "contactPerson" },
          { label: "Email", key: "email" },
          { label: "Service Type", key: "serviceType" },
          { label: "Availability", key: "availability" },
          { label: "Phone Number", key: "phoneNumber" }
        ].map(({ label, key }) => {
          const isEditable =
            !item || ["name", "phoneNumber", "contactPerson", "email"].includes(key);
          return (
            <TextInput
              key={key}
              style={[
                styles.input,
                !isEditable && styles.disabledInput
              ]}
              placeholder={label}
              value={form[key]}
              onChangeText={(text) => handleChange(key, text)}
              editable={isEditable}
            />
          );
        })}

        {/* Building Dropdown */}
        <TouchableOpacity
          style={[styles.dropdown, item && styles.disabledDropdown]}
          onPress={() => {
            if (!item) setBuildingDropdownVisible(true);
          }}
          disabled={!!item}
        >
          <Text style={item && styles.disabledText}>
            {form.buildingId
              ? building?.find((b) => b.id === form.buildingId)?.buildingName || "Select Building"
              : "Select Building"}
          </Text>
        </TouchableOpacity>

        {/* Type Dropdown */}
        <TouchableOpacity
          style={[styles.dropdown, { marginBottom: 100 }, item && styles.disabledDropdown]}
          onPress={() => {
            if (!item) setTypeDropdownVisible(true);
          }}
          disabled={!!item}
        >
          <Text style={item && styles.disabledText}>{form.type || "Select Type"}</Text>
        </TouchableOpacity>

        {/* Building Modal */}
        <Modal
          transparent
          visible={buildingDropdownVisible}
          animationType="slide"
        >
          <TouchableWithoutFeedback
            onPress={() => setBuildingDropdownVisible(false)}
          >
            <View style={styles.modalBackdrop}>
              <View style={styles.modalBox}>
                <FlatList
                  data={building}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        handleChange("buildingId", item.id);
                        setBuildingDropdownVisible(false);
                      }}
                    >
                      <Text style={styles.option}>{item?.buildingName}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* Type Modal */}
        <Modal
          transparent
          visible={typeDropdownVisible}
          animationType="slide"
          onRequestClose={() => setTypeDropdownVisible(false)}
        >
          <TouchableWithoutFeedback
            onPress={() => setTypeDropdownVisible(false)}
          >
            <View style={styles.modalBackdrop}>
              <TouchableWithoutFeedback>
                <View style={styles.modalBox}>
                  {typeOptions.map((option) => (
                    <TouchableOpacity
                      key={option}
                      onPress={() => {
                        handleChange("type", option);
                        setTypeDropdownVisible(false);
                      }}
                    >
                      <Text style={styles.option}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* Submit/Update Button */}
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={item ? handleUpdate : handleSubmit}
        >
          <Text style={styles.buttonText}>{item ? "Update" : "Submit"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12
  },
  disabledInput: {
    backgroundColor: "#f0f0f0",
    color: "#888"
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12
  },
  disabledDropdown: {
    backgroundColor: "#f0f0f0"
  },
  disabledText: {
    color: "#888"
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    width: "80%",
    maxHeight: "80%"
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  button: {
    marginTop: 20,
    position: "absolute",
    bottom: 20,
    alignItems: "center",
    justifyContent: "center",
    width: Dimension.width
  },
  buttonText: {
    backgroundColor: themeColor,
    color: "#000",
    padding: 10,
    textAlign: "center",
    borderRadius: 5,
    width: Dimension.width - 40,
    fontWeight: "bold",
    fontSize: 16
  }
});

export default Create_Directory;
