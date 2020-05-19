import { axios } from '@/utils/request'
import Qs from 'qs'

const api = {
  allTeacher: '/counseling',
  teacherDetail: '/counseling/schedule'
}

export default api

export function getTeacher (data) {
  return axios({
    url: api.allTeacher,
    method: 'post',
    data: Qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function postTeacherDetail (data) {
  return axios({
    url: api.teacherDetail,
    method: 'post',
    data: Qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}