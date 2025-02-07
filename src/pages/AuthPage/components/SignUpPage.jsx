import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { authService } from "../../../services/auth.service";
import { Input } from "antd";
import { FaFacebookF, FaGooglePlusG, FaTwitter } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Icons } from "../../../assets/Icons";
import { pathDefault } from "../../../common/path";
import InputCustom from "../../../components/ui/inputCustom/InputCustom";
import { NotificationContext } from "../../../App";

const SignUpPage = ({ styleIcon, setHandle, handle }) => {
  const { handleNotification } = useContext(NotificationContext);
  const navigate = useNavigate();
  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
      },
      onSubmit: (values) => {
        authService
          .signUp(values)
          .then((res) => {
            handleNotification("success", "Đăng kí thành công", 3000);
            navigate(`${pathDefault.AuthPage}?type=signin`);
            setHandle(!handle);
          })
          .catch((err) => {
            // console.log(err);
            handleNotification("error", err.response.data.content);
          });
      },
      validationSchema: yup.object({
        name: yup.string().required("Vui lòng không bỏ trống"),
        email: yup
          .string()
          .email("Vui lòng nhập đúng định dạng Email")
          .required("Vui lòng không bỏ trống"),
        password: yup
          .string()
          .required("Vui lòng không bỏ trống")
          .matches(
            /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
            "Mật khẩu phải có ít nhất 1 ký tự đặc biệt, 1 chữ viết hoa và 1 chữ số"
          ),
      }),
    });

  return (
    <div className="absolute h-full w-full flex flex-col justify-center items-center text-center z-[5] opacity-100 bg-white duration-700 overflow-hidden">
      <div>
        <Link to={pathDefault.homePage}>
          <Icons.logoFull fill="#FF385C" />
        </Link>
      </div>
      <div className="w-full p-10 space-y-3">
        <h2 className="font-bold text-3xl">Create Account</h2>
        <div className="space-x-5 flex text-2xl justify-center">
          <div className={styleIcon}>
            <FaFacebookF fill="#FF385C" />
          </div>
          <div className={styleIcon}>
            <FaGooglePlusG fill="#FF385C" />
          </div>
          <div className={styleIcon}>
            <FaTwitter fill="#FF385C" />
          </div>
        </div>
        <p className="text-gray-500 font-medium">or register an account</p>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <InputCustom
              placeholder="Name"
              name="name"
              value={values.name}
              handleBlur={handleBlur}
              handleChange={handleChange}
              className="py-3 "
              error={errors.name}
              touched={touched.name}
            />
          </div>
          <div>
            <InputCustom
              placeholder="Email"
              name="email"
              value={values.email}
              handleBlur={handleBlur}
              handleChange={handleChange}
              className="py-3 "
              error={errors.email}
              touched={touched.email}
            />
          </div>
          <div>
            <InputCustom
              type="password"
              name="password"
              value={values.password}
              handleBlur={handleBlur}
              handleChange={handleChange}
              className="py-3 "
              placeholder="Password"
              error={errors.password}
              touched={touched.password}
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-14 py-4 rounded-full w-full mt-3"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
