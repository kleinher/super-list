import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { useContext, useLayoutEffect, useEffect } from "react";
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
  const [isFetching, setIsFetching] = useState(true);

  const reminderList = route.params.reminderList;
  const reminderCtx = useContext(ReminderContext);
  function addReminderHandler() {
    setAddingReminder(true);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <IconButton onPress={addReminderHandler} />;
      },
    });
  }, [navigation]);

  function handleSubmit({ text }) {
    if (text.trim().length === 0) {
      return;
    }
    reminderCtx.saveReminder(text, reminderList);

    setAddingReminder(false);
  }
  useEffect(() => {
    async function getReminders() {
      setIsFetching(true);
      await reminderCtx.getRemindersList(reminderList);
      setIsFetching(false);
    }
    getReminders();
  }, [reminderList]);

  if (isFetching) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {addingReminder && <AddReminderInput handleSubmit={handleSubmit} />}
      <View style={styles.reminderList}>
        <ReminderList reminders={reminderCtx.reminders[reminderList]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
  },
  reminderList: {
    flex: 1,
  },
});
export default ReminderScreen;
