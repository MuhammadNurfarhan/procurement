import request from "@/utils/request";

// API untuk membuat bid baru
export const createBidAPI = (data: any) => {
  return request({
    url: `/api/v1/procurements/${data.procurementId}/bids`,
    method: "post",
    data
  });
};

// API untuk memperbarui bid
export const updateBidAPI = (data: any) => {
  return request({
    url: `/api/v1/procurements/${data.procurementId}/bids/${data.bidId}`,
    method: "put",
    data
  });
};
