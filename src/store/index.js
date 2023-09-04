import { rootReducer } from "./rootReducer";
import { configureStore } from "@reduxjs/toolkit";
// import { createStore } from 'redux'
// export const store = createStore(
//     rootReducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )
export const store = configureStore({
    reducer: rootReducer,
    devTools:  true, 
})