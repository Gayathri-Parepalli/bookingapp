import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const globalStyles = StyleSheet.create({
  containerStyles: {
    backgroundColor: colors.backgroundColor,
    flex: 1,
    width: "100%",
    gap: 15,
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
});
