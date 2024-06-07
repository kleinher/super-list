import React, { createContext, useState } from "react";
import { storeReminder, createReminderData } from "../util/http-firebase";

export const ReminderContext = createContext({
  reminders: [],
  getRemindersList: (reminderList) => {},
  saveReminder: (text) => {},
  useCreateReminderData: () => {},
});

export function ReminderContextProvider({ children }) {
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

  async function useCreateReminderData() {
    const reminderDataKey = await createReminderData();
    return reminderDataKey;
  }

  const value = {
    reminders: reminders,
    saveReminder: saveReminder,
    getRemindersList: getRemindersList,
    useCreateReminderData: useCreateReminderData,
  };

  return (
    <ReminderContext.Provider value={value}>
      {children}
    </ReminderContext.Provider>
  );
}

export default ReminderContextProvider;
