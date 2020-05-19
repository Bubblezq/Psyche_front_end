import { axios } from '@/utils/request'
import Qs from 'qs'

const api = {
  cancel: '/counseling/cancel',
  myReserve: '/counseling/myReservation',
  schedule: '/counseling/reserve',
}

export default api

export function getMyReserve (data) {
  return axios({
    url: api.myReserve,
    method: 'post',
    data: Qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function cancelAppointment (data) {
  return axios({
    url: api.cancel,
    method: 'post',
    data: Qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function chooseTime (data) {
  return axios({
    url: api.schedule,
    method: 'post',
    data: Qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

