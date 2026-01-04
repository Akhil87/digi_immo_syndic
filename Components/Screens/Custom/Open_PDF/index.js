import React from "react";
import { Dimensions, View, ActivityIndicator, Text } from "react-native";
import WebView from "react-native-webview";

const Open_PDF = ({ route }) => {
  const { url, description } = route.params;
  console.log(url);

  const viewerUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
    url
  )}`;

  return (
    <View style={{ flex: 1 }}>
      {!url ? (
        <Text
          style={{
            textAlign: "justify",
            paddingHorizontal: 10,
            paddingVertical: 10,
            lineHeight: 20,
            fontStyle: "italic",
            fontWeight: "semibold"
          }}
        >
          {description && description}
        </Text>
      ) : (
        <WebView
          source={{ uri: viewerUrl }}
          style={{ flex: 1, width: Dimensions.get("window").width }}
          startInLoadingState={true}
          allowsFullscreenVideo={true}
          scalesPageToFit={true}
          userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
        />
      )}
    </View>
  );
};

export default Open_PDF;
