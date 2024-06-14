import React, { createContext, useState } from "react";
import { storeReminder, createReminderData } from "../util/http-firebase";
import { getReminderData } from "../util/http-firebase";
import { deleteReminder } from "../util/http-firebase";

export const ReminderContext = createContext({
  reminders: [],
  currentList: "",
  toggleReminder: (reminderId, reminderList) => {},
  getRemindersList: (reminderList) => {},
  saveReminder: (text) => {},
  deleteCompleted: (reminderList) => {},
  useCreateReminderData: () => {},
});

export function ReminderContextProvider({ children }) {
  const [reminders, setReminders] = useState({});

  function toggleReminder(reminderId, reminderList) {
    setReminders((prevReminders) => {
      const updatedList = prevReminders[reminderList].map((reminder) => {
        if (reminder.id === reminderId) {
          return {
            ...reminder,
            completed: !reminder.completed,
          };
        }
        return reminder;
      });

      return {
        ...prevReminders,
        [reminderList]: updatedList,
      };
    });
  }

  async function deleteCompleted(reminderList) {
    const remindersList = reminders[reminderList];

    const completedReminders = remindersList.filter(
      (reminder) => reminder.completed
    );
    setReminders((prevReminders) => ({
      ...prevReminders,
      [reminderList]: remindersList.filter((reminder) => !reminder.completed),
    }));

    for (const reminder of completedReminders) {
      try {
        await deleteReminder(reminderList, reminder.id);
      } catch (e) {
        console.log(e);
      }
    }
  }

  async function saveReminder(text, reminderList) {
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
    toggleReminder: toggleReminder,
    deleteCompleted: deleteCompleted,
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
