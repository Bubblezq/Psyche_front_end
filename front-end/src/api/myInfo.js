import {axios} from "@/utils/request";
import Qs from 'qs'

const api = {
  myTreeholes: '/user/myTreeholes',
  myLike: '/user/myLike',
}

export function getMyPost (data) {
  return axios({
    url: api.myTreeholes,
    method: 'post',
    data: Qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function getMyLike (data) {
  return axios({
    url: api.myLike,
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}