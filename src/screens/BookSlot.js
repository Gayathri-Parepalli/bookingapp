import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
//styles
import { globalStyles } from "../styles/styles";
import { fontFamily } from "../styles/fontFamily";
import { colors } from "../styles/colors";
//components
import Header from "../components/Header";
import Input from "../components/TextInput";
const TimePickerInput = ({ value, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <TextInput
      editable={false}
      placeholder="Select Time"
      value={value ? moment(value).format("MM DD YYYY, h:mm a") : ""}
      style={styles.timepickerStyles}
      _hover={{
        borderColor: "#D1D5DB",
      }}
    />
  </TouchableOpacity>
);
const BookSlot = ({ navigation }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({ mode: "all" });
  const [showModal, setShowModal] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  //formSubmit
  const handleBookSlot = async (data) => {
    console.log(data);
    setShowModal(true);
    reset({});
  };
  //show picker
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };
  //hide picker
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };
  //setValue to input
  const handleConfirm = (selectedTime) => {
    if (selectedTime !== undefined) {
      setValue("selectedTime", selectedTime);
    }
    hideTimePicker();
  };
  return (
    <SafeAreaView style={globalStyles.containerStyles}>
      <Header />
      <View style={{ paddingHorizontal: 15, gap: 10 }}>
        <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.textStyles}>BookSlot</Text>
        </View>
        <View style={{ gap: 20, justifyContent: "center", minHeight: 500 }}>
          <Input
            control={control}
            name="name"
            label="Enter Name"
            placeholder="Enter Name"
            rules={{
              required: {
                value: true,
                message: "Name is required",
              },
            }}
            invalid={errors.name ? true : false}
            error={errors.name ? errors.name.message : ""}
          />
          <Input
            label="Enter Email"
            control={control}
            name="email"
            placeholder="Enter Email"
            rules={{
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Enter valid email",
              },
            }}
            invalid={errors.email ? true : false}
            error={errors.email ? errors.email.message : ""}
          />

          <View style={{ gap: 5 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: fontFamily,
                fontWeight: "400",
                width: "100%",
              }}
            >
              Select Time
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TimePickerInput
                  onPress={showTimePicker}
                  onChange={onChange}
                  value={value}
                />
              )}
              name="selectedTime"
              defaultValue={new Date()}
            />

            {isTimePickerVisible && (
              <DateTimePicker
                testID="timePicker"
                value={new Date()}
                mode="time"
                is24Hour={true}
                display="spinner"
                onChange={handleConfirm}
              />
            )}
          </View>
          <TouchableOpacity
            onPress={handleSubmit(handleBookSlot)}
            style={[
              styles.buttonStyles,
              { height: 50, backgroundColor: colors.black },
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
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={[styles.textStyles, { fontSize: 18, fontWeight: "bold" }]}
            >
              Hello, Your Slot is Booked!
            </Text>

            <View
              style={{
                flexDirection: "row",
                gap: 20,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setShowModal(false);
                }}
                style={[styles.buttonStyles, { height: 40, width: 100 }]}
              >
                <Text
                  style={[
                    styles.textStyles,
                    {
                      fontSize: 18,
                      fontWeight: "bold",
                      // color: colors.backgroundColor,
                    },
                  ]}
                >
                  ok
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default BookSlot;

const styles = StyleSheet.create({
  inputStyles: {
    height: 50,
  },
  textStyles: {
    fontFamily: fontFamily,
    fontSize: 20,
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
    minHeight: 150,
    margin: 20,
    gap: 20,

    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  timepickerStyles: {
    backgroundColor: colors.inputbgColor,
    fontFamily: fontFamily,
    fontSize: 16,
    fontWeight: "400",
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    zIndex: 1,
    borderRadius: 6,
    color: colors.black,
  },
});
