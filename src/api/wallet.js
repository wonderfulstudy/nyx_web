import request from '@/utils/request'

export function getWallet(uuid) {
  return request({
    url: '/api/v1/wallet/info',
    method: 'get',
    params: { uuid }
  })
}

export function getActionList(uuid) {
  return request({
    url: '/api/v1/wallet/action',
    method: 'get',
    params: { uuid }
  })
}
