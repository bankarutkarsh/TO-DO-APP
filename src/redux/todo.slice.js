import { createSlice } from "@reduxjs/toolkit";


const todoSlice = createSlice({
    name: "todoSlice",
    initialState: {
        form: false,
        todo: [],
        prog: [],
        Gone: [],
        Done: [],
    },
    reducers: {
        setForm(state,action){
            state.form = action.payload;
        },
        settodo(state,action){
            state.todo = action.payload
        },
        setProg(state,action){
            state.prog = action.payload
        },
        setGone(state,action){
            state.Gone = action.payload
        },
        setDone(state,action){
            state.Done = action.payload
        },
    }
});

export default todoSlice;

export const {settodo,setForm,setDone,setGone,setProg} = todoSlice.actions;