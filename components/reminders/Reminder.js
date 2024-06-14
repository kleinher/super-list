import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import CustomCheckbox from "../ui/CustomCheckbox";
import ReminderContainer from "./ui/ReminderContainer";
import { useContext } from "react";
import { ReminderContext } from "../../store/reminder-context";

function Reminder({ reminder, reminderList }) {
  const [isChecked, setIsChecked] = useState(false);
  const reminderCtx = useContext(ReminderContext);

  function toggleHandler() {
    reminderCtx.toggleReminder(reminder.id, reminderList);
    setIsChecked((prevState) => !prevState);
  }

  return (
    <ReminderContainer>
      <Text style={styles.title}>{reminder.title}</Text>
      <CustomCheckbox isChecked={isChecked} onToggle={toggleHandler} />
    </ReminderContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 10,
    margin: 8,
    marginLeft: 20,
    borderRadius: 15,
    backgroundColor: "#ffe8e4",
    flex: 1,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
});

export default Reminder;
