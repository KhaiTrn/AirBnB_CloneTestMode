import React, { useContext, useEffect } from "react";
import { locationService } from "../../../services/viTri.service";
import { UploadRoomPicture } from "../../../components/ui/upload/UploadCustom";
import { InputNormal } from "../../../components/ui/input/InputCustom";
import { NotificationContext } from "../../../App";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { Button } from "antd";
import * as Yup from "yup";
const FormAddLocation = ({
  handleCloseModal,
  getAllLocation,
  isOnSubmit,
  initialValues,
  previewImage,
  setPreviewImage,
  onResetForm,
}) => {
  const { handleNotification } = useContext(NotificationContext);
  const { token } = useSelector((state) => state.userSlice);
  const {
    errors,
    touched,
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (isOnSubmit) {
        // phần xử lý hình ảnh trước khi up API
        let formData = new FormData();
        formData.append("formFile", values.hinhAnh, values.hinhAnh.name);
        // tạo Clone up 1 API
        const valuesClone = { ...values };
        valuesClone.hinhAnh = "";
        //Đẩy dữ liệu lên API post Room
        locationService
          .postLocation(valuesClone, token)
          .then((res) => {
            locationService
              .uploadImgLocation(formData, res.data.content.id, token)
              .then((res) => {
                //Đẩy hình lên API upload hình ảnh
                handleNotification("success", "New room created successfully");
                handleCloseModal(true);
                getAllLocation();
                resetForm();
              })
              .catch((err) => {
                handleNotification("error", err.response.data.content);
              });
          })
          .catch((err) => {
            handleNotification("error", err.response.data.content);
          });
      } else {
        if (values.hinhAnh instanceof File) {
          // phần xử lý hình ảnh trước khi up API
          let formData = new FormData();
          formData.append("formFile", values.hinhAnh, values.hinhAnh.name);
          // tạo Clone up 1 API
          const valuesClone = { ...values };
          valuesClone.hinhAnh = "";
          locationService
            .editLocation(values.id, token, valuesClone)
            .then((res) => {
              locationService
                .uploadImgLocation(formData, values.id, token)
                .then((res) => {
                  handleNotification(
                    "success",
                    "Edited room information successfully"
                  );
                  getAllLocation();
                  resetForm();
                  handleCloseModal(false);
                })
                .catch((err) => {
                  handleNotification("error", err.response.data.content);
                });
            })
            .catch((err) => {
              handleNotification("error", err.response.data.content);
            });
        } else {
          locationService
            .editLocation(values.id, values, token)
            .then((res) => {
              handleNotification(
                "success",
                "Edited room information successfully"
              );
              getAllLocation();
              resetForm();
              handleCloseModal(false);
            })
            .catch((err) => {
              handleNotification("error", err.response.data.content);
            });
        }
      }
    },
    validationSchema: Yup.object({
      hinhAnh: Yup.string().required("Vui lòng thêm hình ảnh"),
      tenViTri: Yup.string().required("Vui lòng nhập tên vị trí"),
      tinhThanh: Yup.string().required("Vui lòng nhập tên Tỉnh Thành"),
      quocGia: Yup.string().required("Vui lòng nhập tên Thành Phố"),
    }),
  });
  useEffect(() => {
    if (onResetForm) {
      onResetForm(resetForm);
    }
  }, [onResetForm, resetForm]);
  return (
    <div>
      <form action="" onSubmit={handleSubmit} className="space-y-5">
        <UploadRoomPicture
          previewImage={previewImage}
          error={errors.hinhAnh}
          handleChange={(info) => {
            const file = info.file.originFileObj;
            setFieldValue("hinhAnh", file);
            // Tạo URL để xem trước hình ảnh
            const previewImg = URL.createObjectURL(file);
            setPreviewImage(previewImg);
          }}
        />
        <InputNormal
          labelContent={"Location Name"}
          name={"tenViTri"}
          id="tenViTri"
          value={values.tenViTri}
          placeholder={"Nhập tên vị trí"}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched.tenViTri}
          error={errors.tenViTri}
        />
        <InputNormal
          labelContent={"Province"}
          name={"tinhThanh"}
          id="tinhThanh"
          value={values.tinhThanh}
          placeholder={"Nhập tên Tỉnh Thành"}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched.tinhThanh}
          error={errors.tinhThanh}
        />
        <InputNormal
          labelContent={"Country"}
          name={"quocGia"}
          id="quocGia"
          value={values.quocGia}
          placeholder={"Nhập tên thành phố"}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched.quocGia}
          error={errors.quocGia}
        />
        <div className="text-right space-x-3">
          <Button
            htmlType="submit"
            className="p-5 bg-red-400 hover:!bg-red-600 text-white hover:!text-white !border-transparent"
          >
            {isOnSubmit ? "Add Location" : "Update"}
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

export default FormAddLocation;
