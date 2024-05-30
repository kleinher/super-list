import { TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import ReminderContainer from "./ui/ReminderContainer";

function AddReminderInput({ handleSubmit }) {
  const [text, setText] = useState("");

  function changeTextHandler(text) {
    setText(text);
  }
  function submitHandler() {
    handleSubmit({ text });
    setText(""); // Limpiar el texto después de enviar
  }

  return (
    <ReminderContainer>
      <TextInput
        style={styles.inputText}
        placeholder="Enter new reminder"
        value={text}
        onChangeText={changeTextHandler}
        onSubmitEditing={submitHandler}
      />
    </ReminderContainer>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 15,
  },
  inputText: {
    flex: 1,
    fontSize: 20,
  },
});

export default AddReminderInput;
