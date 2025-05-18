import axios from 'axios';

// Create an axios instance with the base URL - using direct URL since that works
const API_URL = 'http://localhost:5001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  // Remove withCredentials since direct call works without it
  withCredentials: false
});

// Add a request interceptor for any pre-request configuration
api.interceptors.request.use(
  (config) => {
    // Log the request URL for debugging
    console.log(`Making request to: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for handling responses
api.interceptors.response.use(
  (response) => {
    // Log successful responses
    console.log(`Response from ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    // Handle errors globally with detailed logging
    console.error('API Error:', error.response?.data || error.message);
    console.error('Request was sent to:', error.config?.url);
    return Promise.reject(error);
  }
);

export default api; 