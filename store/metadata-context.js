import React, { createContext, useContext, useEffect, useState } from "react";
import { createNewCategoryMetadata } from "../util/http-firebase";
import { AuthContext } from "./auth-context";
import { ReminderContext } from "./reminder-context";

export const ReminderMetadataContext = createContext({
  getRemindersListMetadata: () => {},
  useCreateNewCategory: (categoryName) => {},
});

export function ReminderMetadataContextProvider({ children }) {
  const UID = useContext(AuthContext).userID;
  const reminderCtx = useContext(ReminderContext);
  const [metadata, setMetadata] = useState([
    {
      id: 1,
      title: "Work",
      reminderList: "-NzF8RK2R-SVy1fGvaJO",
    },
    {
      id: 2,
      title: "Personal",
      reminderList: "-NzF91BNm9Y4_L4XtWdb",
    },
  ]);

  useEffect(() => {
    console.log("ReminderMetadataContextProvider rendered");
  }, []);

  function getRemindersListMetadata() {
    return metadata;
  }

  async function useCreateNewCategory(categoryName) {
    const reminderDataListId = reminderCtx.useCreateReminderData();

    console.log(reminderDataListId);
    const newCategory = {
      title: categoryName,
      reminderData: reminderDataListId,
      group: [UID],
    };

    const metadataKey = await createNewCategoryMetadata(newCategory);

    setMetadata((prevMetadata) => [
      ...prevMetadata,
      { key: metadataKey, ...newCategory },
    ]);
    console.log(metadata);
  }

  const value = {
    getRemindersListMetadata: getRemindersListMetadata,
    useCreateNewCategory: useCreateNewCategory,
  };

  return (
    <ReminderMetadataContext.Provider value={value}>
      {children}
    </ReminderMetadataContext.Provider>
  );
}

export default ReminderMetadataContextProvider;
