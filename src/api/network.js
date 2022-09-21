import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 3000
})
axiosInstance.interceptors.response.use(
  response => {
    return response.data || response
  },
  (err) => {
    return Promise.reject(err)
  }
)
export {
  axiosInstance
}
