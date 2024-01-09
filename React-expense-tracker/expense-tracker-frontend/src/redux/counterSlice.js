// counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    isLogin: false,
    loginEmail: "",
    isPremium: false,
    totalAmount: 0,
  },
  reducers: {
    makeLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setLoginEmail: (state, action) => {
      state.loginEmail = action.payload;
    },
    makePremium: (state, action) => {
      state.isPremium = action.payload;
    },
    totalExpenseAmount: (state, action) => {
      state.totalAmount += action.payload;
    },
  },
});

export const { makeLogin, setLoginEmail, makePremium, totalExpenseAmount } =
  counterSlice.actions;

export default counterSlice.reducer;
