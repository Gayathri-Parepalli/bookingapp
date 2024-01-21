import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Modal,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const { height: screenHeight } = Dimensions.get("window");
import moment from "moment";
//styles
import { fontFamily } from "../styles/fontFamily";
import { globalStyles } from "../styles/styles";
import { colors } from "../styles/colors";
//components
import Header from "../components/Header";
import Card from "../components/Card";
const HomeScreen = ({ navigation }) => {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const generateDateArray = () => {
      const currentDate = new Date();
      const hoursToAdd = 24; // Number of hours to add to the current time
      const interval = 1; // Hourly interval
      const newArray = [];

      for (let i = 0; i < hoursToAdd; i += interval) {
        const newDate = moment(currentDate).add(i, "hours");
        const formattedDate = newDate.format("M/D/YYYY");
        const startTime = newDate.format("hh:mm A");
        const endTime = moment(currentDate).format("hh:mm A");

        newArray.push({
          date: formattedDate,
          time: `${startTime} - ${endTime}`,
          status: "Available",
          id: (i + 1).toString(),
        });
      }

      return newArray;
    };

    // Set slots with the generated array
    setSlots(generateDateArray());
  }, []);
  //update status
  const updateSlot = (id) => {
    const status = slots.find((val) => val.id === id)["status"];
    Alert.alert(
      "Status Update",
      `${
        status === "Booked"
          ? "This slot is booked,Do you want to cancel?"
          : "This slot is Availble you can proceed with this slot"
      }`,
      [
        status === "Availble"
          ? {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            }
          : {
              text: "Yes",
              onPress: () => {
                const data = slots.map((slot) => {
                  if (slot.id === id) {
                    return { ...slot, status: "Availble" };
                  } else {
                    return slot;
                  }
                });
                setSlots(data);
              },
              style: "cancel",
            },
        status === "Availble"
          ? {
              text: "Book",
              onPress: () => {
                const data = slots.map((slot) => {
                  if (slot.id === id) {
                    return { ...slot, status: "Booked" };
                  } else {
                    return slot;
                  }
                });
                setSlots(data);
              },
            }
          : { text: "No", onPress: () => console.log("No Pressed") },
      ]
    );
  };
  const Item = ({ item }) => (
    <View style={styles.item}>
      <Card onPress={() => updateSlot(item.id)}>
        <View style={{ paddingHorizontal: 10, gap: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={[styles.textStyles, { fontWeight: "bold" }]}>
              HairCut
            </Text>
          </View>
          <View>
            <Text style={[styles.textStyles, { fontSize: 14 }]}>
              Lorem Ipsum description Lorem Ipsum description Lorem Ipsum
              description{" "}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            <View style={{ flexDirection: "row", width: "45%" }}>
              <Text
                style={[
                  styles.textStyles,
                  { fontSize: 14, fontWeight: "bold" },
                ]}
              >
                Time : {""}
              </Text>
              <Text style={[styles.textStyles, { fontSize: 14 }]}>
                {item.time}
              </Text>
            </View>
            <View style={{ flexDirection: "row", width: "40%" }}>
              <Text
                style={[
                  styles.textStyles,
                  { fontSize: 14, fontWeight: "bold" },
                ]}
              >
                Date : {""}
              </Text>
              <Text style={[styles.textStyles, { fontSize: 14 }]}>
                {item.date}
              </Text>
            </View>
            <View style={{ flexDirection: "row", width: "40%" }}>
              <Text
                style={[
                  styles.textStyles,
                  { fontSize: 14, fontWeight: "bold" },
                ]}
              >
                Availability : {""}
              </Text>
              <Text
                style={[
                  styles.textStyles,
                  {
                    fontSize: 14,
                    color:
                      item.status === "Availble" ? colors.green : colors.red,
                  },
                ]}
              >
                {item.status}
              </Text>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
  return (
    <SafeAreaView style={globalStyles.containerStyles}>
      <Header />
      <View style={{ paddingHorizontal: 15 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={[styles.textStyles, { fontSize: 30, fontWeight: "bold" }]}
          >
            Slots
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("BookSlot")}
            style={[
              styles.buttonStyles,
              { height: 32, backgroundColor: colors.black },
            ]}
          >
            <Text
              style={[
                styles.textStyles,
                { color: colors.backgroundColor, fontSize: 14 },
              ]}
            >
              Book Slot
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            //   ListHeaderComponent={
            //     <View style={{ backgroundColor: colors.black, height: 50 }}>
            //       <Text
            //         style={[styles.textStyles, { color: colors.backgroundColor }]}
            //       >
            //         Slots
            //       </Text>
            //     </View>
            //   }
            height={screenHeight - 115}
            contentContainerStyle={styles.flatListContent}
            showsVerticalScrollIndicator={false}
            data={slots}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <Text style={styles.textStyles}>No Slots Found</Text>
              </View>
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  textStyles: {
    fontFamily: fontFamily,
    fontSize: 20,
  },

  item: {
    marginBottom: 15,
  },
  buttonStyles: {
    borderWidth: 1,
    paddingHorizontal: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: 300,
    minHeight: 200,
    margin: 20,
    gap: 20,

    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
