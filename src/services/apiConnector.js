import axios from "axios"; // Importing axios to make API calls

export const axiosInstance = axios.create({}); // Creating an instance of axios

export const apiConnector = (method, url, bodyData, headers, params) => {
  // Function to make API calls
  return axiosInstance({
    method: method, // HTTP method
    url: url,
    data: bodyData ? bodyData : null, // Request body
    headers: headers ? headers : null, // Request headers
    params: params ? params : null, // Request query parameters
  });
};
