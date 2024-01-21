import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { fontFamily } from "../styles/fontFamily";
import { colors } from "../styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const Header = () => {
  return (
    <View
      style={{
        width: "100%",
        height: 66,
        flexDirection: "row",
        paddingHorizontal: 16,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colors.black,
      }}
    >
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Image
          source={{
            uri: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          }}
          style={{
            width: 40,
            height: 40,
            resizeMode: "cover",
            borderRadius: 20,
            marginRight: 10,
          }}
        />
        <View>
          <Text
            style={[styles.textStyles, { fontSize: 18, fontWeight: "600" }]}
          >
            Modren Salon
          </Text>
          <Text
            style={[styles.textStyles, { fontSize: 10, fontWeight: "600" }]}
          >
            44 Gandhi Street, West Delhi
          </Text>
        </View>
      </View>

      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          gap: 10,
        }}
      >
        <MaterialIcons name="qr-code-scanner" size={24} color="white" />
        <Ionicons name="notifications-outline" size={30} color="white" />
      </View>
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  inputStyles: {
    height: 50,
  },
  textStyles: {
    fontFamily: fontFamily,
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    color: colors.backgroundColor,
  },
});
