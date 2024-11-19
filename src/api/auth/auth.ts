import request from "@/utils/request";

// Login API
export const loginAPI = (data: any) => {
  return request({
    url: "/api/v1/auth",
    method: "post",
    data,
  });
};

// Register API
export const registerAPI = (data: any) => {
  return request({
    url: "/api/v1/auth/register",
    method: "post",
    data,
  });
};

// Function to get the logged-in user data
export const getUserAPI = () => {
  return request({
    url: "/api/v1/auth/me",
    method: "get",
  });
};
