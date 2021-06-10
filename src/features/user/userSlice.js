import { createSlice } from "@reduxjs/toolkit";
import { UsersData } from "../../database/users";

export const userSlice = createSlice({
    name:"user",
    initialState:{
        users: UsersData
    },
    reducers:{

    }
})

export default userSlice.reducer;