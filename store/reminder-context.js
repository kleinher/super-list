import { createContext, useState } from "react";
import { storeReminder } from "../util/http-firebase";

export const ReminderContext = createContext({
  reminders: [],
  getRemindersList: (reminderList) => {},
  saveReminder: (text) => {},
});

function ReminderContextProvider({ children }) {
  const [reminders, setReminders] = useState([
    {
      id: "r1",
      title: "Work",
      completed: false,
      date: new Date(),
    },
    {
      id: "r2",
      title: "Personal",
      completed: false,
      date: new Date(),
    },
  ]);

  function saveReminder(text, reminderList) {
    const reminderData = {
      title: text,
      completed: false,
      date: new Date(),
    };

    const id = storeReminder(reminderData, reminderList);

    const reminder = {
      id: id,
      ...reminderData,
    };

    setReminders((reminders) => {
      return [...reminders, reminder];
    });
  }

  function getRemindersList(reminderList) {
    return reminders;
  }

  const value = {
    reminders: reminders,
    saveReminder: saveReminder,
    getRemindersList: getRemindersList,
  };

  return (
    <ReminderContext.Provider value={value}>
      {children}
    </ReminderContext.Provider>
  );
}

export default ReminderContextProvider;
