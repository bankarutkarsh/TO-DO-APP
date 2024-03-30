import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todoSlice",
  initialState: {
    form: false,
    edit: undefined,
    sec: [],
    prog: [],
    Gone: [],
    Done: [],
    change: 0,
  },
  reducers: {
    setForm(state, action) {
      state.form = action.payload;
    },
    setEdit(state, action) {
      state.edit = action.payload;
    },
    setChange(state, action) {
      state.change += action.payload;
    },
    setSec(state, action) {
      state.sec = action.payload;
    },
    setProg(state, action) {
      state.prog = action.payload;
    },
    setGone(state, action) {
      state.Gone = action.payload;
    },
    setDone(state, action) {
      state.Done = action.payload;
    },
  },
});

export default todoSlice;

export const {
  setForm,
  setEdit,
  setChange,
  setSec,
  setDone,
  setGone,
  setProg,
} = todoSlice.actions;
