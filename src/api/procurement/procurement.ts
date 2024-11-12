import request from '@/utils/request';

export const getProcurementAPI = () => {
  return request({
    url: '/api/v1/prc/list',
    method: 'get',
  });
}

export const createProcurementAPI = (data: any) => {
  return request({
    url: '/api/v1/procurement',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export const updateProcurementAPI = (data: any) => {
  return request({
    url: `/api/v1/procurement/${data.id}`,
    method: 'put',
    data
  });
}

export const closeProcurementAPI = (data: any) => {
  return request({
    url: `/api/v1/procurement/${data.id}/close`,
    method: 'put',
    data
  });
}

export const getBidsByProcurementIdAPI = (data: any) => {
  return request({
    url: `/api/v1/procurement/${data.id}/bids`,
    method: 'get',
    data
  });
}
