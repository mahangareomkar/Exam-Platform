import { configureStore } from "@reduxjs/toolkit";
import { examSlice, userSlice } from "./features";


export default configureStore({
    reducer: {
        user: userSlice,
        exam: examSlice,
    },
})