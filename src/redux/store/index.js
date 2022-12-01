import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import asyncDataReducer from './asyncDataReducer'

const store = configureStore({
  reducer: { data: asyncDataReducer },
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production',
})
setInterval(() => console.log(store.getState()), 5000)
export default store
