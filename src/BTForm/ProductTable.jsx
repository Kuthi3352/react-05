import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { baiTapFormActions } from "../store/slice";
// import {useSearchParams} from 'react-router-dom'

import qs from 'qs'
const ProductTable = () => {
  const { productList } = useSelector((state) => state.baiTapForm);
  console.log("productList: ", productList);
  const dispatch = useDispatch();
//   const [searchParams, setSearchParams] = useSearchParams()


 
  return (
    <div className="container">
      <form>
        <input
          type="text"
          className="form-control"
          placeholder="Nhập tên sinh viên muốn tìm kiếm"
        
        />
        <button className="btn btn-warning mt-3"
        onClick={() => {
            // setSearchParams(
            //     {
            //         name:'indside'
            //     }
            // )
        }}
        >Tìm kiếm</button>
      </form>
      <table className="table mt-4">
        <thead className="table-dark">
          <tr>
            <th>Mã sinh viên</th>
            <th>Họ Tên</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        
        <tbody>
        {productList.map((prd) => (
            <tr key={prd?.maSV}>
              <td>{prd?.maSV}</td>
              <td>{prd?.name}</td>
              <td>{prd?.phone}</td>
              <td>{prd?.email}</td>
              <td>
                <div className="d-flex gap-3">
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      dispatch(baiTapFormActions.editProduct(prd));
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      dispatch(baiTapFormActions.deleteProduct(prd.maSV));
                    }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
