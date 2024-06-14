import { getDatabase, ref, push, get, remove } from "firebase/database";

export async function storeReminder(reminderData, reminderList) {
  const db = getDatabase();

  const newPostRef = push(
    ref(db, "reminderData/" + reminderList + "/reminders"),
    reminderData
  );
  return newPostRef.key;
}

export async function deleteReminder(reminderList, reminderId) {
  const db = getDatabase();
  console.log(reminderList, reminderId);
  remove(ref(db, "reminderData/" + reminderList + "/reminders/" + reminderId));
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

export async function getReminderData(reminderList) {
  const db = getDatabase();
  const snapshot = await get(
    ref(db, "reminderData/" + reminderList + "/reminders")
  );

  return snapshot.val();
}
