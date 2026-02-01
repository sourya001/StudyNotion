import axios from "axios";

const API_TIMEOUT_MS = 45000;

export const axiosInstance = axios.create({
	withCredentials: true,
	timeout: API_TIMEOUT_MS,
});

export const apiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};
