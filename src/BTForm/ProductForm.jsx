import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { baiTapFormActions } from "../store/slice";

const ProductForm = () => {
  const [formValue, setFormValue] = useState()

  const [formError, setFormError] = useState()
  console.log("fromError", formError);
  const { productEdit } = useSelector((state) => state.baiTapForm)
    console.log('productEdit: ', productEdit)
  const dispatch = useDispatch()


const validate = (element) =>{
    const { validity, minLength, title, value} = element;
    console.log('validity: ', validity)
    const { valueMissing, tooShort, patternMismatch } = validity;
    let mess = '';

    if (valueMissing) {
      mess = `Vui lòng nhập ${title}`;
    } else if (tooShort || value.length < minLength ) {
      mess = `Vui lòng nhập  ${title} tối thiểu ${minLength} ký tự`;
    } else if (patternMismatch) {
      mess = `Vui lòng nhập đúng ${title}`;
    }
    return mess
}

  const handleFormValue = () => (ev) => {
    const { name, value} = ev.target;
    let mess = validate(ev.target)

    setFormError({
      ...formError,
      [name]: mess,
    });

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  useEffect(() => {
    // if (!productEdit) return
    // setFormValue(productEdit)

    if (productEdit) {
        setFormValue(productEdit)
    }
}, [productEdit])
  console.log('render')
  return (
    <div className="container">
     
        <form
          noValidate
          onSubmit={(ev) => {
            //Ngăn chặn sự kiện reload của browser khi submit form
            ev.preventDefault();
            //ngăn chặn ng dùng k nhập gì vẫn submit được
          
            const elements = document.querySelectorAll("input");
            console.log("elements", elements);
            let errors = {};
            elements.forEach((ele) => {
              const { name } = ele;
             
              errors[name] = validate(ele)
             
            });
            console.log("errors", errors);
            setFormError(errors);
            // chức năng ngăn chặn submit khi User nhập sai
            let isFlag = false

            for (let key in errors) {
              if (errors[key]) {
                isFlag = true;
                break
              }
            }
            if (isFlag) return;
            if (!productEdit) {
              dispatch(baiTapFormActions.addProduct(formValue))
            } else {
                dispatch(baiTapFormActions.updateProduct(formValue))
            }
          
           
            console.log("submit");
          }}
        >
          <h2 className="p-4 bg-dark text-white">Thông tin sinh viên</h2>
          <div className="mt-3 row">
            <div className="col-6">
              <p>Mã SV</p>
              <input
            //    disabled={!!productEdit}
                type="text"
                className="form-control"
                name="maSV"
                title="mã sinh viên"
                disabled={!!productEdit}
                value={formValue?.maSV || ''}
               
                onChange={handleFormValue()}
                required
                maxLength={5}
                pattern="^[0-9]+$"
              />
              {formError?.maSV && 
                <p className="text-danger">{formError?.maSV}</p>
              }
            </div>
            <div className="col-6">
              <p>Họ Tên</p>
              <input
                type="text"
                className="form-control"
                name="name"
                title="Tên"
                value={formValue?.name || ''}
                onChange={handleFormValue()}
                required
              />
              {formError?.name && 
                <p className="text-danger">{formError?.name}</p>
              }
            </div>
            <div className="col-6">
              <p>Số Điện Thoại</p>
              <input
                type="text"
                className="form-control"
                name="phone"
                title="số điện thoại"
                value={formValue?.phone || ""}
                onChange={handleFormValue()}
                required
                pattern="(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b"
               
              />
              {formError?.phone && 
                <p className="text-danger">{formError?.phone}</p>
              }
            </div>
            <div className="col-6">
              <p>Email</p>
              <input
                type="text"
                className="form-control"
                name="email"
                title="email"
                value={formValue?.email || ""}
                onChange={handleFormValue()}
                required
                pattern="^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$"
              />
              {formError?.email && 
                <p className="text-danger">{formError?.email}</p>
              }
            </div>
          </div>
          <div className="mt-3 d-flex gap-3">
            {productEdit ? (
              <button className="btn btn-info mb-3 ">Cập nhật SV</button>
            ) : (
              <button className="btn btn-success mb-3 ">Thêm sinh viên</button>
            )}
          </div>
        </form>
     
    </div>
  );
};

export default ProductForm;
