import axios from "axios";

// Timeout so we don't hang forever (e.g. when backend is cold-starting on Render)
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
