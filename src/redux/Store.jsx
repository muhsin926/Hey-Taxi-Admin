import { configureStore } from "@reduxjs/toolkit";
import modal from "./Slices/ModalSlice";

export default configureStore({
  reducer: {
    modal: modal,
  },
});
