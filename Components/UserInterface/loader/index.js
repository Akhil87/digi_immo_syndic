import { BlurView } from "expo-blur";
import { Dimensions } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { Portal } from "react-native-paper";
import { useSelector } from "react-redux";

export const Loader = ({ visible }) => {
  const { visiable } = useSelector((state) => state.Loader_reducer);
  return (
    <Portal>
      {visiable || visible ? (
        <BlurView
          style={{
            flex: 1,
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height
          }}
          intensity={100}
          experimentalBlurMethod="dimezisBlurView"
        >
          <Spinner size="large" visible />
        </BlurView>
      ) : null}
    </Portal>
  );
};
