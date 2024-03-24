import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./loggedinSlice";


const store = configureStore({
  reducer: {
    loggedin: reducer
  }
})

export default store