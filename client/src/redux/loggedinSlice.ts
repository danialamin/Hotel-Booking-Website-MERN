import { createSlice } from "@reduxjs/toolkit";


const loggedinSlice = createSlice({
  name: 'loggedin',
  initialState: {loggedin: false},
  reducers: {
    isLoggedin: state => {state.loggedin = true},
    notLoggedin: state => {state.loggedin = false}
  }
})

const notLoggedinAction = loggedinSlice.actions.notLoggedin
const isLoggedinAction = loggedinSlice.actions.isLoggedin
const reducer = loggedinSlice.reducer

export {notLoggedinAction, isLoggedinAction, reducer}