import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  productList: [],
  productEdit: undefined,
};
const baiTapFormSlice = createSlice({
  name: "baiTapForm",
  initialState,
  reducers: {
    addProduct: (state, { payload }) => {
        state.productList.push(payload)
    },
    deleteProduct: (state, { payload }) => {
        state.productList = state.productList.filter((prd) => prd.maSV !== payload)
    },
    editProduct: (state, { payload }) => {
        state.productEdit = payload
    },
    updateProduct: (state, { payload }) => {
        //C1:
        // const index = state.productList.findIndex((prd) => prd.id === payload.id)
        // state.productList[index] = payload

        //C2:
        state.productList = state.productList.map((prd) => {
            if (prd.maSV === payload.maSV) {
                return payload
            }
            return prd
        })

        state.productEdit = undefined
    },
},
extraReducers: () => {},
});

export const { reducer: baiTapFormReducer, actions: baiTapFormActions } =
  baiTapFormSlice;
