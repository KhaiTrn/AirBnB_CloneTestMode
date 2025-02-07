import { http } from "./config";
export const reservationService = {
  getAllReservation: () => {
    return http.get("/dat-phong");
  },
  getReservationByID: (id) => {
    return http.get(`/dat-phong/${id}`);
  },
  putReservation: (id, data) => {
    return http.put(`/dat-phong/${id}`, data);
  },
  deleteReservation: (id) => {
    return http.delete(`dat-phong/${id}`);
  },
  postReservation: (data, token) => {
    return http.post("/phong-thue", data, { headers: { token } });
  },
};
