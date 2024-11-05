import request from "@/utils/request";

export const getPingStatusAPI = (params: any) => {
  return request({
    url: "/api/v1/ping",
    method: "get",
    params,
  });
};
