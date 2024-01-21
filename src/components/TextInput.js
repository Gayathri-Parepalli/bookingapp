import React from "react";
import { TextInput, Text, View } from "react-native";
import { Controller } from "react-hook-form";
import { colors } from "../styles/colors";
import { fontFamily } from "../styles/fontFamily";

const Input = React.forwardRef((props, ref) => {
  return (
    <View style={{ width: "100%", gap: 5 }}>
      {props.label && (
        <Text
          style={{
            fontSize: 16,
            fontFamily: fontFamily,
            fontWeight: "400",
            width: "100%",
            ...props.labelStyles,
          }}
        >
          {props.label}
        </Text>
      )}
      <Controller
        control={props.control}
        rules={props.rules}
        name={props.name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            isDisabled={props.isDisabled || false}
            tabIndex={props.tabIndex}
            isReadOnly={props.isReadOnly || false}
            ref={ref}
            size={props.size || "lg"}
            multiline={props.multiline || false}
            rows={props.numberOfLines || 1}
            minLength={props.minLength || 1}
            maxLength={props.maxLength || 255}
            isInvalid={props.invalid}
            autoComplete="off"
            autoFocus={props.autoFocus || false}
            type={props.type || "text"}
            onSubmitEditing={props.onSubmitEditing}
            inputMode={props.keyboardType}
            onKeyPress={props.onKeyPress}
            onPressIn={props.onPressIn}
            onPressOut={props.onPressOut}
            inlineImageLeft={props.leftIcon}
            inlineImagePadding={props.leftIconPadding}
            onChangeText={(inputValue) => {
              onChange(
                props.toCaptlize ? inputValue.toUpperCase() : inputValue
              );
              props.onChangeText && props.onChangeText(inputValue);
            }}
            _focus={{
              backgroundColor: "white",
            }}
            onBlur={() => {
              onBlur();
              props.onBlur && props.onBlur(value);
            }}
            value={value || ""}
            style={{
              width: "100%",
              backgroundColor: colors.inputbgColor,
              fontFamily: fontFamily,
              fontSize: 16,
              fontWeight: "400",
              height: 50,
              paddingLeft: 10,
              paddingRight: 10,
              zIndex: 1,
              borderRadius: 6,
              borderWidth: props.invalid ? 1 : 0,
              borderColor: props.invalid ? "red" : "white",
              ...props.styles,
            }}
            _hover={{
              borderColor: "#D1D5DB",
            }}
            placeholder={props.placeholder}
          />
        )}
      />
      {props.error && (
        <View>
          <Text
            style={{
              color: "red",
              fontFamily: fontFamily,
              fontSize: 10,
            }}
          >
            {props.error}
          </Text>
        </View>
      )}
    </View>
  );
});

export default Input;
