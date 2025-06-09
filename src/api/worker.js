import request from '@/utils/request'
export function fetchWorkerList(query) {
  return request({
    url: '/api/v1/worker/list',
    method: 'get',
    params: query
  })
}
