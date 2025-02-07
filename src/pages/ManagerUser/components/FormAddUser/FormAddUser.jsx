import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
} from "antd";
import {
  CalendarOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { useFormik } from "formik";
import {
  InputNormal,
  InputPasswordCustom,
} from "../../../../components/ui/input/InputCustom";
import { SelectCustom } from "../../../../components/ui/select/SelectCustom";
import { RadioCustom } from "../../../../components/ui/radio/RadioCustom";
import { nguoiDungSerivce } from "../../../../services/nguoiDung.service";
import { NotificationContext } from "../../../../App";
import * as Yup from "yup";
import dayjs from "dayjs";
import { DatePickerCustom } from "../../../../components/ui/datePicker/DatePickerCustom";
const FormAddUser = ({
  handleCloseModal,
  getAllUsers,
  isOnSubmit,
  initialValues,
  onResetForm,
}) => {
  const { handleNotification } = useContext(NotificationContext);
  const handleOnSubmit = (data) => {
    if (isOnSubmit) {
      nguoiDungSerivce
        .postUsers(data)
        .then((res) => {
          handleNotification("success", "User Created Successfully");
          getAllUsers();
          handleCloseModal();
        })
        .catch((err) => {
          handleNotification("error", err.response.data.content);
        });
    } else {
      delete data.password;
      nguoiDungSerivce
        .putUserByID(data.id, data)
        .then((res) => {
          handleNotification("success", "Edit User Successfully");
          getAllUsers();
          handleCloseModal();
        })
        .catch((err) => {
          handleNotification("error", err.response.data.content);
        });
    }
  };
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleOnSubmit(values);
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng không bỏ trống !"),
      email: Yup.string()
        .required("Vui lòng không bỏ trống !")
        .email("Vui lòng nhập đúng định dạng email !"),
      password: Yup.string().when([], {
        is: () => isOnSubmit,
        then: (schema) =>
          schema
            .required("Vui lòng không bỏ trống !")
            .matches(
              /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/,
              "Vui lòng nhập 1 ký tự đặc biệt, 1 in hoa, 1 số"
            ),
        otherwise: (schema) => schema.notRequired(),
      }),
      phone: Yup.string()
        .required("Vui lòng không bỏ trống !")
        .matches(
          /^(0(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])\d{7})$/,
          "Vui lòng nhập đúng định dạng số điện thoại Việt Nam"
        ),
      role: Yup.string().required("Vui lòng không bỏ trống !"),
      birthday: Yup.string().required("Vui lòng không bỏ trống !"),
      gender: Yup.boolean("Vui lòng chọn giới tính").required(
        "Vui lòng không bỏ trống !"
      ),
    }),
  });
  useEffect(() => {
    if (onResetForm) {
      onResetForm(resetForm);
    }
  }, [onResetForm, resetForm]);
  return (
    <form action="" onSubmit={handleSubmit} className="space-y-5">
      <InputNormal
        labelContent={"Name"}
        id="name"
        name={"name"}
        placeholder={"Vui lòng nhập tên"}
        value={values.name}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.name}
        touched={touched.name}
      />
      <InputNormal
        labelContent={"Email"}
        id="email"
        name={"email"}
        placeholder={"Vui lòng nhập email"}
        value={values.email}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.email}
        touched={touched.email}
      />
      <InputPasswordCustom
        labelContent={"Password"}
        id="password"
        name={"password"}
        placeholder={isOnSubmit ? "Vui lòng nhập password" : ""}
        value={values.password}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.password}
        touched={touched.password}
        disabled={isOnSubmit ? false : true}
      />
      <InputNormal
        labelContent={"Phone"}
        id="phone"
        name={"phone"}
        placeholder={"Vui lòng nhập số điện thoại"}
        value={values.phone}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.phone}
        touched={touched.phone}
      />
      <div className="grid grid-cols-2 gap-5">
        <DatePickerCustom
          labelContent={"Birthday"}
          id={"birthday"}
          name={"birthday"}
          format={"DD/MM/YYYY"}
          handleChange={(date, dateString) => {
            setFieldValue("birthday", date);
          }}
          value={values.birthday ? dayjs(values.birthday) : null}
          error={errors.birthday}
          touched={touched.birthday}
        />
        <div className="w-full">
          <SelectCustom
            labelContent={"Gender"}
            options={[
              { label: "Male", value: true },
              { label: "Female", value: false },
            ]}
            handleChange={(value, option) => {
              setFieldValue("gender", value);
            }}
            value={values.gender}
            error={errors.gender}
          />
        </div>
      </div>

      <RadioCustom
        labelContent={"ROLE"}
        handleChange={(e) => {
          setFieldValue("role", e.target.value);
        }}
        value={values.role}
        errors={errors.role}
        touched={touched.role}
      />
      <div className="flex justify-end gap-3">
        <Button
          htmlType="submit"
          className="p-5 bg-red-400 hover:!bg-red-600 text-white hover:!text-white !border-transparent"
        >
          {isOnSubmit ? "Add User" : "Update"}
        </Button>
        <Button
          className="p-5"
          onClick={() => {
            handleCloseModal();
            resetForm();
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default FormAddUser;
