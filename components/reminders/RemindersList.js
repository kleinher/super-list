import { FlatList, View, StyleSheet } from "react-native";
import Reminder from "./Reminder";

function ReminderList({ reminders, reminderList }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={reminders}
        renderItem={({ item }) => (
          <Reminder reminder={item} reminderList={reminderList} />
        )}
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
