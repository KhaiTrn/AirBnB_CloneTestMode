import React, { useContext } from "react";
import InputCustom from "../ui/inputCustom/InputCustom";
import { ButtonPrimary } from "../ui/button/ButtonCustom";
import { Icons } from "../../assets/Icons";
import * as yup from "yup";
import { useFormik } from "formik";
import { authService } from "../../services/auth.service";
import { NotificationContext } from "../../App";
import { useDispatch } from "react-redux";
import { handleUpdateUser } from "../../store/slice/user.slice";

const ModalLogin = ({ setIsModalLoginOpen }) => {
  const dispatch = useDispatch();
  const { handleNotification } = useContext(NotificationContext);
  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: (values) => {
        console.log(values);
        authService
          .signIn(values)
          .then((res) => {
            dispatch(handleUpdateUser(res.data.content.user));
            localStorage.setItem("userInfo", JSON.stringify(res.data.content));
            handleNotification("success", "Đăng nhập thành công!");
            setIsModalLoginOpen(false);
          })
          .catch((err) => {
            console.log(err);
          });
      },
      validationSchema: yup.object({
        email: yup
          .string()
          .email("Vui lòng nhập đúng định dạng Email")
          .required("Vui lòng không bỏ trống"),
        password: yup.string().required("Vui lòng không bỏ trống"),
      }),
    });
  return (
    <>
      <div className="flex justify-center my-6">
        <Icons.logoFull />
      </div>
      <form className="flex-col flex gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label>Email</label>
          <InputCustom
            error={errors.email}
            name={"email"}
            value={values.email}
            touched={touched.email}
            handleChange={handleChange}
            handleBlur={handleBlur}
            placeholder={"Vui lòng nhập email"}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Mật khẩu</label>
          <InputCustom
            error={errors.password}
            name={"password"}
            value={values.password}
            touched={touched.password}
            handleChange={handleChange}
            handleBlur={handleBlur}
            placeholder={"Vui lòng nhập mật khẩu"}
            type="password"
          />
        </div>
        <ButtonPrimary
          htmlType="submit"
          children={"Đăng nhập"}
          className={"py-6"}
        />
      </form>
    </>
  );
};

export default ModalLogin;
