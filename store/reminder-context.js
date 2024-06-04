import { createContext, useState } from "react";
import { storeReminder } from "../util/http";

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

  function saveReminder(text) {
    const reminder = {
      id: Math.random().toString(),
      title: text,
      date: new Date(),
    };
    storeReminder(reminder);
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
