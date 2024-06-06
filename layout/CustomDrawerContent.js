import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import AddCategoryModal from "./AddCategoryModal";

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <AddCategoryModal />
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;
