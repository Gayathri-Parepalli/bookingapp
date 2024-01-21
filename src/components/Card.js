import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../styles/colors";

const Card = ({ children, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};
export default Card;

const styles = StyleSheet.create({
  card: {
    borderColor: colors.gray,
    borderWidth: 1,
    minHeight: 150,
    justifyContent: "center",
  },
});
