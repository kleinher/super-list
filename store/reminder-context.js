import React, { createContext, useState } from "react";
import { storeReminder, createReminderData } from "../util/http-firebase";
import { getReminderData } from "../util/http-firebase";

export const ReminderContext = createContext({
  reminders: [],
  getRemindersList: (reminderList) => {},
  saveReminder: (text) => {},
  useCreateReminderData: () => {},
});

export function ReminderContextProvider({ children }) {
  const [reminders, setReminders] = useState({});

  async function saveReminder(text, reminderList) {
    console.log(text, reminderList);
    const reminderData = {
      title: text,
      completed: false,
      date: new Date(),
    };
    const id = await storeReminder(reminderData, reminderList);

    const reminder = {
      id: id,
      ...reminderData,
    };

    setReminders((prevReminders) => {
      const updatedList = [...(prevReminders[reminderList] || []), reminder];
      return {
        ...prevReminders,
        [reminderList]: updatedList,
      };
    });
  }

  async function getRemindersList(reminderList) {
    const remindersDatabase = await getReminderData(reminderList);
    const remindersAux = [];
    for (const key in remindersDatabase) {
      const rem = {
        ...remindersDatabase[key],
        id: key,
      };
      remindersAux.push(rem);
    }

    setReminders((prevReminders) => ({
      ...prevReminders,
      [reminderList]: remindersAux,
    }));
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
