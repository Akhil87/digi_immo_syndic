import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  useColorScheme
} from "react-native";
import BackButton from "../../Elements/BackButton";
import BottomModal from "../../Elements/BottomModal";

const Dues = ({ navigation }) => {
  const scrollViewRef = useRef(null);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const theme = useColorScheme();
  useEffect(() => {
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: 9999, animated: true });
      }
    }, 0);
  }, []);

  const [modalVisiable, setModalVisiable] = useState(false);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === "dark" ? "black" : "#FFFFFF" }
      ]}
    >
      <BackButton navigation={navigation} title="dues" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.balanceContainer}>
          <Text style={styles.duesTitle}>Dues Balance</Text>
          <Text style={styles.duesAmount}>Rp 2,000,000</Text>
          <View
            style={[
              styles.horizontalScrollContainer,
              { width: windowWidth * 0.9 }
            ]}
          >
            <ScrollView
              ref={scrollViewRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {[...Array(8)].map((_, index) => (
                <TouchableOpacity key={index}>
                  <Text style={styles.monthText}>1/2025</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity>
                <Text style={styles.activeMonthText}>This month</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          width: Dimensions.get("window").width,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <TouchableOpacity
          style={styles.payButton}
          onPress={() => setModalVisiable(true)}
        >
          <Text style={styles.payButtonText}>Pay Dues</Text>
        </TouchableOpacity>
      </View>

      <BottomModal
        visiable={modalVisiable}
        navigation={navigation}
        setVisiable={setModalVisiable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  scrollContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  balanceContainer: {
    alignItems: "center",
    marginVertical: 50
  },
  duesTitle: {
    fontWeight: "800",
    fontSize: 16,
    color: "gray"
  },
  duesAmount: {
    fontWeight: "800",
    fontSize: 30,
    color: "rgb(83, 82, 82)",
    marginVertical: 10
  },
  horizontalScrollContainer: {
    marginTop: 20
  },
  scrollContent: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    gap: 10
  },
  monthText: {
    borderWidth: 2,
    borderColor: "gray",
    padding: 12,
    borderRadius: 10,
    minWidth: 80,
    textAlign: "center",
    fontSize: 14
  },
  activeMonthText: {
    borderWidth: 2,
    borderColor: "#04344c",
    padding: 12,
    borderRadius: 10,
    minWidth: 80,
    textAlign: "center",
    backgroundColor: "#04344c",
    color: "white",
    fontSize: 14
  },
  payButton: {
    position: "absolute",
    bottom: 0,
    marginVertical: 20,
    backgroundColor: "#03334D",
    paddingHorizontal: 70,
    paddingVertical: 14,
    borderRadius: 10
  },
  payButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center"
  }
});

export default Dues;
