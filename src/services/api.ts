import axios from "axios";

export default () => {
  return axios.create({
    baseURL:
      "https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/",
  });
};
