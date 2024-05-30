import { createContext, useState } from "react";
import { storeReminder } from "../util/http";

export const ReminderContext = createContext({
  reminders: [],
  saveReminder: (text) => {},
});

function ReminderContextProvider({ children }) {
  const [reminders, setReminders] = useState([]);

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

  const value = {
    reminders: reminders,
    saveReminder: saveReminder,
  };

  return (
    <ReminderContext.Provider value={value}>
      {children}
    </ReminderContext.Provider>
  );
}

export default ReminderContextProvider;
