import { http } from "./config";

export const nguoiDungSerivce = {
  postUsers: (data) => {
    return http.post("/users", data);
  },
  deleteUsers: (id) => {
    return http.delete(`/users?id=${id}`);
  },
  getUserByID: (id) => {
    return http.get(`/users/${id}`);
  },
  putUserByID: (id, data) => {
    return http.put(`/users/${id}`, data);
  },

  getUserFind: (pageIndex, keyword) => {
    return http.get(
      `/users/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=10&keyword=${keyword}`
    );
  },
};
