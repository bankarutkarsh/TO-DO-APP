import { createSlice } from "@reduxjs/toolkit";


const todoSlice = createSlice({
    name: "todoSlice",
    initialState: {
        form: false,
        edit:undefined,
        sec: [],
    },
    reducers: {
        setForm(state,action){
            state.form = action.payload;
        },
        setEdit(state,action){
            state.edit = action.payload;
        },
    }
});

export default todoSlice;

export const {setForm,setEdit} = todoSlice.actions;