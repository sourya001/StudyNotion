import axios from "axios";

export const axiosInstance = axios.create({});

axios.defaults.baseURL = "https://study-notion-lt3k.vercel.app";
axios.defaults.withCredentials = true;
export const apiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};
