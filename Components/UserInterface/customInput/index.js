import React, { useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";

import { TextInput } from "react-native-paper";
// import { Colors } from "../../Theme";

export const CustomTextInput = ({
  label,
  onChangeText,
  marginTop,
  marginBottom,
  marginStart,
  marginEnd,
  password,
  numerical,
  email,
  capital,
  maxLength,
  onBlur,
  value,
  disabled,
  multiline,
  height,
  placeholder,
  editable
}) => {
  const [open, setOpen] = useState(password);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TextInput
          keyboardShouldPersistTaps="handled"
          style={{
            width: Dimensions.get("window").width / 1.3,
            marginTop: marginTop,
            marginBottom: marginBottom,
            marginStart: marginStart,
            marginEnd: marginEnd,
            backgroundColor: disabled ? "transparent" : "rgb(252, 248, 248)",
            height: height,
            borderColor: "gray",
            borderWidth: 1
            // borderRadius: 10
          }}
          value={value}
          onBlur={onBlur}
          label={label}
          maxLength={maxLength}
          keyboardType={
            numerical ? "numeric" : email ? "email-address" : "default"
          }
          onChangeText={onChangeText}
          disabled={disabled}
          editable={editable ? false : true}
          underlineColor="gray"
          underlineColorAndroid="gray"
          activeUnderlineColor="gray"
          secureTextEntry={open}
          autoCapitalize={capital ? "characters" : "none"}
          activeOutlineColor="gray"
          placeholder={placeholder}
          right={
            password ? (
              <TextInput.Icon
                icon={open ? "eye" : "eye-off"}
                onPress={() => {
                  setOpen(!open);
                }}
              />
            ) : null
          }
          multiline={multiline}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
