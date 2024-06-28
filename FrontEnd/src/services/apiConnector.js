import axios from "axios";

// Create an Axios instance with a base URL and withCredentials option
export const axiosInstance = axios.create({
  baseURL: "https://study-notion-lt3k.vercel.app",
  withCredentials: true,
});

// A function to make API requests using the Axios instance
export const apiConnector = async (method, url, bodyData, headers, params) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data: bodyData || undefined,
      headers: headers || undefined,
      params: params || undefined,
    });
    return response;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Server responded with an error:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up request:', error.message);
    }
    throw error; // Re-throw the error so it can be handled by the caller
  }
};
