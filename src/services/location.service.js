import { http } from "./config";

export const locationService = {
  getListLocation: () => {
    return http.get("/vi-tri");
  },
};
