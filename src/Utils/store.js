import { configureStore } from "@reduxjs/toolkit";
import aPIReducer from "./aPISlice";

export const store = configureStore({
    reducer: {
        APIData : aPIReducer
    }
})