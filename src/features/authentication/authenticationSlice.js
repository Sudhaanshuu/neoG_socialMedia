import { createSlice } from "@reduxjs/toolkit";

export const authenticationSlice = createSlice({
    name:"user authentication",
    initialState:{
        token:"Bearer data",
        _id: "u127",
        username:"admin"
    },
    reducers:{
        
    }
});

export default authenticationSlice.reducer;