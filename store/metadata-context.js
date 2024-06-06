import { createContext, useEffect } from "react";

export const ReminderMetadataContext = createContext({
  getRemindersListMetadata: () => {},
});

function ReminderMetadataContextProvider({ children }) {
  const metadata = [
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
