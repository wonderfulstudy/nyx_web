import request from '@/utils/request'
import { aesEncodeBase64 } from '@/vendor/Crypto.js'

export function login(data) {
  try {
    const encryptedData = aesEncodeBase64(JSON.stringify(data))
    return request({
      url: '/api/v1/user/login',
      method: 'post',
      data: encryptedData,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

export function getInfo(token) {
  return request({
    url: '/api/v1/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/api/v1/user/logout',
    method: 'post'
  })
}
