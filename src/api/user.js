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

export function getInfo() {
  return request({
    url: '/api/v1/user/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/api/v1/user/logout',
    method: 'post'
  })
}

export function fetchUserList(query) {
  return request({
    url: '/api/v1/user/list',
    method: 'get',
    params: query
  })
}

export function createUser(data) {
  return request({
    url: '/api/v1/user/create',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function deleteUser(data) {
  const user = aesEncodeBase64(JSON.stringify(data))
  return request({
    url: '/api/v1/user/delete',
    method: 'post',
    data: user,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function updateUser(data) {
  return request({
    url: '/api/v1/user/update',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
