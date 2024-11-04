export const requestConfig = {
  baseURL: import.meta.env.VITE_BACKEND_URL,
  contentType: "application/json;charset=UTF-8",
  requestTimeout: 15000,
  successCode: [200],
  invalidCode: 401,
  noPermissionCode: 403,
};
