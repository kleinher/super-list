import React, { useState, useContext } from "react";
import { View, Text, Modal, Button, TextInput, StyleSheet } from "react-native";
import { DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ReminderMetadataContext } from "../store/metadata-context";

const AddCategoryModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const metadataCtx = useContext(ReminderMetadataContext);

  const handleAddCategory = async () => {
    try {
      await metadataCtx.useCreateNewCategory(categoryName);
      setModalVisible(false);
      setCategoryName("");
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  return (
    <View>
      <DrawerItem
        label="Add New Category"
        icon={({ focused, size }) => (
          <Icon
            name="add-circle-outline"
            size={size}
            color={focused ? "#7cc" : "#ccc"}
          />
        )}
        onPress={() => setModalVisible(true)}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add a New Category</Text>
            <TextInput
              style={styles.input}
              placeholder="Category Name"
              value={categoryName}
              onChangeText={setCategoryName}
            />
            <Button title="Add Category" onPress={handleAddCategory} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    width: 200,
    paddingHorizontal: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default AddCategoryModal;
