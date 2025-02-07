import { Upload } from "antd";
import { useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { message } from "antd";
// const getBase64 = (img, callback) => {
//   const reader = new FileReader();
//   reader.addEventListener("load", () => callback(reader.result));
//   reader.readAsDataURL(img);
// };
// const beforeUpload = (file) => {
//   const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
//   if (!isJpgOrPng) {
//     message.error("You can only upload JPG/PNG file!");
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     message.error("Image must smaller than 2MB!");
//   }
//   return isJpgOrPng && isLt2M;
// };
export const UploadRoomPicture = ({
  handleChange,
  id = "",
  previewImage,
  error,
}) => {
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
      className="dark:text-white"
    >
      {<PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  const customRequest = ({ file, onSuccess }) => {
    onSuccess("ok");
  };
  useEffect(() => {}, [previewImage]);
  return (
    <div>
      <Upload
        onChange={handleChange}
        customRequest={customRequest}
        listType="picture-card"
        showUploadList={false}
        id={id}
        error={error}
      >
        {previewImage ? (
          <img
            src={previewImage}
            alt="img"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "8px",
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
      {error ? <p className="text-red-500 mt-1 text-sm">{error}</p> : null}
    </div>
  );
};
