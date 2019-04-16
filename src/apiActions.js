'use strict'

import axios from 'axios'
import apiUrl from './apiConfig'

const getTasks = token => {
  return axios({
    url: `${apiUrl}/tasks`,
    method: 'get',
    headers: {
      Authorization: `Token token=${token}`
    }
  })
}

const getTask = (taskId, userToken) => {
  return axios({
    url: `${apiUrl}/tasks/${taskId}`,
    method: 'get',
    headers: {
      Authorization: `Token token=${userToken}`
    }
  })
}

const deleteTask = (taskId, userToken) => {
  return axios({
    url: `${apiUrl}/tasks/${taskId}`,
    method: 'delete',
    headers: {
      Authorization: `Token token=${userToken}`
    }
  })
}

const createTask = (task, userToken) => {
  return axios({
    url: `${apiUrl}/tasks`,
    method: 'post',
    headers: {
      Authorization: `Token token=${userToken}`
    },
    data: { task }
  })
}

const editTask = (task, taskId, userToken) => {
  return axios({
    url: `${apiUrl}/tasks/${taskId}`,
    method: 'patch',
    headers: {
      Authorization: `Token token=${userToken}`
    },
    data: { task }
  })
}

export default {
  getTasks,
  getTask,
  deleteTask,
  createTask,
  editTask
}
