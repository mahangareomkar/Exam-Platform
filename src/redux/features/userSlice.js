import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name:"",
    score:null
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers: {
        setUserDetails: (state,action) => {
            state.name = action.payload
        },
    }
})

export const {setUserDetails} = userSlice.actions;

export default userSlice.reducer;