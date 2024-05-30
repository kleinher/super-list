import { FlatList, View, StyleSheet } from "react-native";
import Reminder from "./Reminder";

function ReminderList({ reminders }) {
  console.log(reminders);
  return (
    <View style={styles.container}>
      <FlatList
        data={reminders}
        renderItem={({ item }) => <Reminder reminder={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default ReminderList;
