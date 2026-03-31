import axios from 'axios'

const api = axios.create({ baseURL: '/api/v1' })

api.interceptors.request.use((config) => {
  const access = localStorage.getItem('access_token')
  if (access) config.headers.Authorization = `Bearer ${access}`
  return config
})

api.interceptors.response.use(
  (r) => r,
  async (err) => {
    if (err.response?.status === 401) {
      const refresh = localStorage.getItem('refresh_token')
      if (refresh) {
        const res = await axios.post('/api/v1/auth/refresh', { refresh_token: refresh })
        localStorage.setItem('access_token', res.data.access_token)
        err.config.headers.Authorization = `Bearer ${res.data.access_token}`
        return axios(err.config)
      }
    }
    return Promise.reject(err)
  }
)

export default api
