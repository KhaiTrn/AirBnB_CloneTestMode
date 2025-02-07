import { http } from "./config";

export const userService = {
  uploadAvt: (data, token) => {
    return http.post("/users/upload-avatar", data, {
      headers: {
        token: token,
      },
    });
  },
  getListUser: () => {
    return http.get("/users");
  },
  thayDoiThongTinNguoiDung: (id, data) => {
    return http.put(`/users/${id}`, data);
  },
};
