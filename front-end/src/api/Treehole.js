import { axios } from '@/utils/request'
import Qs from 'qs'

const api = {
  allPost: '/treehole',
  postDetail: '/treehole/hole',
  sendTreehole: '/treehole/sendTreehole',
  deleteTreehole: '/treehole/deleteTreehole',
  sendComment: '/treehole/sendComment',
  comment:'/treehole/comment',
}

export default api

export function getPost (data) {
  return axios({
    url: api.allPost,
    method: 'post',
    data: Qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function postDetail(data) {
  return axios({
    url: api.postDetail,
    method: 'post',
    data: Qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function getComment(data) {
  return axios({
    url: api.comment,
    method: 'post',
    data: Qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function sendTreehole(parameter) {
  return axios({
    url: api.sendTreehole,
    method: 'post',
    data: Qs.stringify(parameter),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function deleteTreehole (data) {
  return axios({
    url: api.deleteTreehole,
    method: 'post',
    data: Qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function sendComment(data) {
  return axios({
    url: api.sendComment,
    method: 'post',
    data: Qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
