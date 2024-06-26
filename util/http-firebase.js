import { getDatabase, ref, push, get } from "firebase/database";

export async function storeReminder(reminderData, reminderList) {
  const db = getDatabase();

  const newPostRef = push(
    ref(db, "reminderData/" + reminderList + "/reminders"),
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

  const newPostRef = push(ref(db, "reminderData"), {
    reminderList: [{ title: " " }],
  });
  return newPostRef.key;
}

export async function getReminderMetadata() {
  const db = getDatabase();
  const snapshot = await get(ref(db, "reminderMetadata"));

  return snapshot.val();
}
