import request from '@/utils/request'
import { aesEncodeBase64 } from '@/vendor/Crypto.js'

export function login(data) {
  try {
    console.log('原始数据:', data)
    const encryptedData = aesEncodeBase64(JSON.stringify(data))
    console.log('加密后的数据:', encryptedData)
    return request({
      url: '/api/v1/user/login',
      method: 'post',
      data: encryptedData,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error('加密失败:', error)
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
