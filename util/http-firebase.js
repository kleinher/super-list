import { getDatabase, ref, push } from "firebase/database";

export async function storeReminder(reminderData, reminderList) {
  const db = getDatabase();

  const newPostRef = push(
    ref(db, "reminderLists/" + reminderList + "/reminders"),
    reminderData
  );
  return newPostRef.key;
}

export async function createNewCategoryMetadata(categoryData) {
  const db = getDatabase();

  const newPostRef = push(ref(db, "reminderMetadata"), categoryData);
  return newPostRef.key;
}

export async function createReminderData() {
  const db = getDatabase();

  const newPostRef = push(ref(db, "reminderData"), { reminders: [] });
  return newPostRef.key;
}
