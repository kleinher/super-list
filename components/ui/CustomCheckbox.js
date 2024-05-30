import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const CustomCheckbox = ({ isChecked, onToggle }) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.checkboxBase, isChecked && styles.checkboxChecked]}
        onPress={onToggle}
      >
        {isChecked && <Text style={styles.checkmark}>✓</Text>}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  checkboxBase: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "red",
  },
  checkmark: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CustomCheckbox;
