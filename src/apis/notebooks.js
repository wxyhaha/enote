import request from "../helpers/request";
import {friendlyData} from '../helpers/util'

const URL = {
  GET: '/notebooks',
  ADD: '/notebooks',
  UPDATE: '/notebooks/:id',
  DELETE: '/notebooks/:id'
}

export default {
  getAll() {
    return new Promise((resolve, reject) => {
      request(URL.GET)
        .then(res => {
          res.data = res.data.sort((notebook1, notebook2) => notebook1.createdAt < notebook2.createdAt)
          res.data.forEach(notebook => {
            notebook.createdAtFriendly=friendlyData(notebook.createdAt)
            notebook.updatedAtFriendly=friendlyData(notebook.updatedAt)
          })
          resolve(res)
        }).catch(err => {
        reject(err)
      })
    })
  },
  updateNotebook(notebookId, {title = ''} = {title: ''}) {
    return request(URL.UPDATE.replace(':id', notebookId), 'PATCH', {title})
  },
  deleteNotebook(notebookId) {
    return request(URL.DELETE.replace(':id', notebookId), 'DELETE')
  },
  addNotebook({title = ''} = {title: ''}) {
    return new Promise((resolve, reject) => {
      request(URL.ADD, 'POST', {title})
        .then(res => {
          res.data.createdAtFriendly=friendlyData(res.data.createdAt)
          res.data.updatedAtFriendly=friendlyData(res.data.updatedAt)
          resolve(res)
        }).catch(err=>{
          reject(err)
      })
    })
  }
}
