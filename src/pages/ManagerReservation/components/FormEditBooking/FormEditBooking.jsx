import React, { useContext } from "react";
import {
  InputNormal,
  InputNumberCustom,
} from "../../../../components/ui/input/InputCustom";
import { useFormik } from "formik";
import { Button } from "antd";
import dayjs from "dayjs";
import { DatePickerCustom } from "../../../../components/ui/datePicker/DatePickerCustom";
import { reservationService } from "../../../../services/reservation.service";
import { NotificationContext } from "../../../../App";
import * as Yup from "yup";
const FormEditBooking = ({
  initialValues,
  getAllReservation,
  setIsModalOpen,
  handleCloseModal,
}) => {
  const { handleNotification } = useContext(NotificationContext);
  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      ...initialValues,
      ngayDen: dayjs(initialValues.ngayDen),
      ngayDi: dayjs(initialValues.ngayDi),
    },
    enableReinitialize: true,

    onSubmit: (values) => {
      const ngayDenISO = dayjs(values.ngayDen, "DD-MM-YYYY").format(
        "YYYY-MM-DDTHH:mm:ss"
      );
      const ngayDiISO = dayjs(values.ngayDi, "DD-MM-YYYY").format(
        "YYYY-MM-DDTHH:mm:ss"
      );
      reservationService
        .putReservation(values.id, {
          ...values,
          ngayDen: ngayDenISO,
          ngayDi: ngayDiISO,
        })
        .then((res) => {
          getAllReservation();
          setIsModalOpen(false);
          handleNotification("success", "Updated information successfully");
        })
        .catch((err) => {
          console.error("Error:", err);
          getAllReservation();
          handleNotification(
            "error",
            err?.response?.data?.content || "Có lỗi xảy ra"
          );
        });
    },

    validationSchema: Yup.object({
      soLuongKhach: Yup.number()
        .required("Vui lòng không bỏ trống")
        .min(1, "Vui lòng nhập trên 1 khách"),

      ngayDen: Yup.string().required("Vui lòng chọn ngày đến"),
      ngayDi: Yup.string().required("Vui lòng chọn ngày đi"),
    }),
  });
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().startOf("day");
  };
  return (
    <div>
      <form action="" className="space-y-5" onSubmit={handleSubmit}>
        <InputNormal
          labelContent={"Mã đặt phòng"}
          id="id"
          name={"id"}
          value={values.id}
          disabled={true}
          className="dark:text-slate-500"
        />
        <InputNormal
          labelContent={"Mã phòng"}
          id="maPhong"
          name={"maPhong"}
          value={values.maPhong}
          disabled={true}
          className="dark:text-slate-500"
        />
        <div className="grid grid-cols-2 gap-5">
          <DatePickerCustom
            id="ngayDen"
            name="ngayDen"
            labelContent="Ngày Đến"
            disabledDate={disabledDate}
            value={values.ngayDen}
            format={"DD-MM-YYYY"}
            error={errors.ngayDen}
            touched={touched.ngayDen}
            handleChange={(date) => setFieldValue("ngayDen", date)}
            handleBlur={handleBlur}
          />

          <DatePickerCustom
            id="ngayDi"
            name="ngayDi"
            labelContent="Ngày Đi"
            disabledDate={disabledDate}
            value={values.ngayDi}
            error={errors.ngayDi}
            format={"DD-MM-YYYY"}
            touched={touched.ngayDi}
            handleChange={(date) => setFieldValue("ngayDi", date)}
            handleBlur={handleBlur}
          />
        </div>
        <InputNumberCustom
          labelContent={"Số lượng khách"}
          id="soLuongKhach"
          name={"soLuongKhach"}
          value={values.soLuongKhach}
          handleChange={(value) => {
            setFieldValue("soLuongKhach", value);
          }}
          handleBlur={handleBlur}
          error={errors.soLuongKhach}
          touched={touched.soLuongKhach}
        />
        <InputNormal
          className="dark:text-slate-500"
          labelContent={"Mã người dùng"}
          id="maNguoiDung"
          name={"maNguoiDung"}
          value={values.maNguoiDung}
          disabled={true}
        />
        <div className="text-right space-x-3">
          <Button
            htmlType="submit"
            className="p-5 bg-red-400 hover:!bg-red-600 text-white hover:!text-white !border-transparent"
          >
            {"Update"}
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
    </div>
  );
};

export default FormEditBooking;
