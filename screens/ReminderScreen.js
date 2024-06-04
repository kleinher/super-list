import { View, StyleSheet } from "react-native";
import { useContext, useLayoutEffect } from "react";
import ReminderList from "../components/reminders/RemindersList";
import { ReminderContext } from "../store/reminder-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import IconButton from "../components/ui/IconButton";
import AddReminderInput from "../components/reminders/AddReminderInput";

function ReminderScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const [addingReminder, setAddingReminder] = useState(false);
  const reminderList = route.params.reminderList;
  const reminderCtx = useContext(ReminderContext);

  console.log(reminderList);

  function addReminderHandler() {
    setAddingReminder(true);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          size={24}
          color={tintColor}
          icon="add"
          onPress={addReminderHandler}
        />
      ),
    });
  }, [navigation]);
  function handleSubmit({ text }) {
    if (text.trim().length === 0) {
      return;
    }
    reminders.saveReminder(text);
    setAddingReminder(false);
  }

  const reminders = reminderCtx.getRemindersList(reminderList);

  return (
    <View style={styles.container}>
      {addingReminder && <AddReminderInput handleSubmit={handleSubmit} />}
      <View style={styles.reminderList}>
        <ReminderList reminders={reminders} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  reminderList: {
    flex: 1,
  },
});
export default ReminderScreen;
