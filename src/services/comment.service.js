import { http } from "./config";

export const commentService = {
  getListCommentByIdRoom: (id) => {
    return http.get(`/binh-luan/lay-binh-luan-theo-phong/${id}`);
  },
  postComment: (data, token) => {
    return http.post("/binh-luan", data, { headers: { token } });
  },
};
