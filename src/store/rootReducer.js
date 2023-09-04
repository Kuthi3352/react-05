import { combineReducers } from "redux";
import { baiTapFormReducer } from "./slice";
export const rootReducer = combineReducers({
    baiTapForm: baiTapFormReducer,
})