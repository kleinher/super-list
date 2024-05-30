import { View, StyleSheet, Text } from "react-native";
function ReminderContainer({ children }) {
  return <View style={styles.content}>{children}</View>;
}

const styles = StyleSheet.create({
  content: {
    padding: 10,
    margin: 8,
    marginLeft: 20,
    borderRadius: 15,
    backgroundColor: "#ffe8e4",
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default ReminderContainer;
