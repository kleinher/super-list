import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createNewCategoryMetadata,
  getReminderMetadata,
} from "../util/http-firebase";
import { AuthContext } from "./auth-context";
import { ReminderContext } from "./reminder-context";

export const ReminderMetadataContext = createContext({
  reminderMetadata: [],
  getRemindersListMetadata: () => {},
  useCreateNewCategory: (categoryName) => {},
});

export function ReminderMetadataContextProvider({ children }) {
  const UID = useContext(AuthContext).userID;
  const reminderCtx = useContext(ReminderContext);
  const [metadata, setMetadata] = useState([
    {
      group: [""],
      key: "-Nzm-F_BwRN-fD5Rtka5",
      reminderData: "-Nzm-FZnNy37AIxkaEX-",
      title: "Z",
    },
  ]);

  async function getRemindersListMetadata() {
    const metadataList = await getReminderMetadata();
    const newMetadata = Object.keys(metadataList).map((key) => ({
      key: key,
      ...metadataList[key],
    }));

    setMetadata(newMetadata);
    return newMetadata;
  }

  async function useCreateNewCategory(categoryName) {
    const reminderDataListId = await reminderCtx.useCreateReminderData();

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
