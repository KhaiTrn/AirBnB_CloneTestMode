import { http } from "./config";
export const locationService = {
  getViTri: () => {
    return http.get("/vi-tri");
  },
  getViTriById: (id) => {
    return http.get(`/vi-tri/${id}`);
  },
  getAllLocation: (pageIndex, keyword) => {
    return http.get(
      `/vi-tri/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=3&keyword=${keyword}`
    );
  },
  postLocation: (data, token) => {
    return http.post("/vi-tri", data, { headers: { token } });
  },
  getLocationByID: (id) => {
    return http.get(`/vi-tri/${id}`);
  },
  editLocation: (id, data, token) => {
    return http.put(`/vi-tri/${id}`, data, { headers: { token } });
  },
  deleteLocation: (id, token) => {
    return http.delete(`/vi-tri/${id}`, { headers: { token } });
  },
  uploadImgLocation: (formData, id, token) => {
    return http.post(`/vi-tri/upload-hinh-vitri?maViTri=${id}`, formData, {
      headers: { token },
    });
  },
};
