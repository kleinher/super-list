import { createContext, useEffect } from "react";

export const ReminderMetadataContext = createContext({
  getRemindersListMetadata: () => {},
});

function ReminderMetadataContextProvider({ children }) {
  const metadata = [
    {
      id: 1,
      title: "Work",
      reminderList: "r1",
    },
    {
      id: 2,
      title: "Personal",
      reminderList: "r3",
    },
  ];

  useEffect(() => {
    console.log("ReminderMetadataContextProvider rendered");
  }, []);

  function getRemindersListMetadata() {
    return metadata;
  }

  const value = { getRemindersListMetadata: getRemindersListMetadata };

  return (
    <ReminderMetadataContext.Provider value={value}>
      {children}
    </ReminderMetadataContext.Provider>
  );
}

export default ReminderMetadataContextProvider;
