import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-reanimated";
import { I18nextProvider } from "react-i18next";
import i18n from "./Components/i18next/i18n";
import * as Updates from "expo-updates";
import { useEffect } from "react";

import { Provider } from "react-redux";
import { store } from "./Components/Store/Store";
import Navigations from "./Components/Navigations";
import { StatusBar } from "react-native";

export default function App() {
  useEffect(() => {
    async function checkForUpdates() {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (error) {
        console.error("Error checking for updates:", error);
      }
    }

    checkForUpdates();
  }, []);

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <GestureHandlerRootView>
          <PaperProvider>
            <Navigations />
            <StatusBar
              barStyle="dark-content"
              translucent
              backgroundColor="transparent"
            />
          </PaperProvider>
        </GestureHandlerRootView>
      </I18nextProvider>
    </Provider>

    // <View
    //   style={{
    //     paddingBlock: 40,
    //     paddingInline: 20,
    //     backgroundColor: "#fff",
    //     boxShadow: "gray",
    //     marginBlock: 90,
    //     boxShadow: "gray"
    //   }}
    // >
    //   <Text
    //     style={{
    //       marginBlock: 20,
    //       fontSize: 30,
    //       textAlign: "center",
    //       color: "indigo",
    //       fontWeight: "600"
    //     }}
    //   >
    //     Welcome Back.
    //   </Text>
    //   <View>
    //     <TextInput
    //       placeholder="Email"
    //       style={{
    //         marginBlock: 10,
    //         padding: 2,
    //         borderWidth: 1,
    //         borderBottom: 0,
    //         borderRadius: 2,
    //         borderColor: "gray",
    //         backgroundColor: "transparent"
    //       }}
    //     ></TextInput>
    //     <TextInput
    //       placeholder="Password"
    //       style={{
    //         marginBlock: 10,
    //         padding: 2,
    //         borderWidth: 1,
    //         borderBottom: 0,
    //         borderRadius: 2,
    //         borderColor: "gray",
    //         backgroundColor: "transparent"
    //       }}
    //     ></TextInput>
    //     <Text
    //       style={{
    //         marginBottom: 25,
    //         textAlign: "right",
    //         fontSizeF: 16,
    //         color: "gray",
    //         fontWeight: "400"
    //       }}
    //     >
    //       {" "}
    //       Forgot your password?
    //     </Text>
    //   </View>
    //   <Button
    //     style={{
    //       backgroundColor: "indigo",
    //       borderRadius: "none",
    //       padding: "8",
    //       borderRadius: 4,
    //       fontSize: 18
    //     }}
    //   >
    //     <Text style={{ color: "white", fontSize: 16, letterSpacing: 1.4 }}>
    //       LOGIN{" "}
    //     </Text>{" "}
    //   </Button>
    //   <Text
    //     style={{
    //       marginBlock: 20,
    //       textAlign: "center",
    //       fontSize: 16,
    //       color: "gray",
    //       fontWeight: "400"
    //     }}
    //   >
    //     {" "}
    //     Don't have an account?{" "}
    //     <Text style={{ color: "indigo", fontWeight: "700" }}>Sign up</Text>{" "}
    //   </Text>
    // </View>
  );
}

// Bottom Sheet Profile Card Component

// {
//   "cli": {
//     "version": ">= 14.0.0",
//     "appVersionSource": "remote"
//   },
//   "build": {
//     "development": {
//       "developmentClient": true,
//       "distribution": "internal"
//     },
//     "preview": {
//       "distribution": "internal"
//     },
//     "production": {
//       "autoIncrement": true
//     }
//   },
//   "submit": {
//     "production": {}
//   }
// }
