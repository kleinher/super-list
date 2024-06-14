import { StyleSheet, Text, View } from "react-native";

const CustomCheckbox = ({ isChecked }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.checkboxBase, isChecked && styles.checkboxChecked]}>
        {isChecked && <Text style={styles.checkmark}>✓</Text>}
      </View>
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
