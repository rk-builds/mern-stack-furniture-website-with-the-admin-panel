import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slice/userSlice";
import cartReducer from "../slice/cartSlice";

export let store = configureStore(
    {
        reducer:{
            myCart:cartReducer,
            user:userSlice
        }
    }
)