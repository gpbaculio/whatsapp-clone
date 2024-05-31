import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
  Cursor,
} from "react-native-confirmation-code-field";
import {
  DynamicText,
  DynamicTouchableOpacity,
  DynamicView,
} from "@/components";

const CELL_COUNT = 6;

const Phone = () => {
  const { phone, signin } = useLocalSearchParams<{
    phone: string;
    signin: string;
  }>();
  const [code, setCode] = useState("");

  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  return (
    <DynamicView flex={1} p="l" backgroundColor="background" gap="l">
      <Stack.Screen options={{ title: phone }} />
      <DynamicText fontSize={14} textAlign="center" color="black">
        We have sent you an SMS with a code to the number above.
      </DynamicText>
      <DynamicText fontSize={14} textAlign="center" color="black">
        To complete your phone number verification, please enter the 6-digit
        activation code.
      </DynamicText>
      <CodeField
        ref={ref}
        {...props}
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <DynamicView
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            width={40}
            height={40}
            variant="centerItems"
            borderBottomColor="black"
            borderBottomWidth={1}
            style={isFocused ? styles.focusCell : null}
          >
            <DynamicText color="black" fontSize={36} textAlign="center">
              {symbol || (isFocused ? <Cursor /> : null)}
            </DynamicText>
          </DynamicView>
        )}
      />
      <DynamicTouchableOpacity
        width="100%"
        alignItems="center"
        onPress={() => {}}
      >
        <DynamicText color="primary" fontSize={18}>
          Didn't receive a verification code?
        </DynamicText>
      </DynamicTouchableOpacity>
    </DynamicView>
  );
};

export default Phone;

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginTop: 20,
    width: 260,
    marginLeft: "auto",
    marginRight: "auto",
    gap: 4,
  },
  focusCell: {
    paddingBottom: 4,
    borderBottomColor: "#000",
    borderBottomWidth: 2,
  },
});
