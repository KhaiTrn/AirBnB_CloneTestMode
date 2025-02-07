import axios from "axios";

export const http = axios.create({
  baseURL: "https://airbnbnew.cybersoft.edu.vn/api",
  timeout: 30000,
  headers: {
    tokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3NiIsIkhldEhhblN0cmluZyI6IjI1LzA0LzMwMjUiLCJIZXRIYW5UaW1lIjoiMTc0NTUzOTIwMDAwMCIsIm5iZiI6MTcxNzA4ODQwMCwiZXhwIjoxNzQ1Njg2ODAwfQ.4fVDDMfR8EEZyP53_u8r7zpeQkNMsxNva1IxxXamRCM",
  },
});
