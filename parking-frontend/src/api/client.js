import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000
const ENABLE_RETRY = import.meta.env.VITE_ENABLE_REQUEST_RETRY !== 'false'
const MAX_RETRIES = parseInt(import.meta.env.VITE_MAX_RETRIES) || 3

const api = axios.create({
  baseURL: API_BASE,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Version': 'v1'
  }
})

// Request interceptor to add token
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    // Add request tracing
    config.headers['X-Request-ID'] = generateRequestId()
    config.metadata = { startTime: Date.now() }
    return config
  },
  error => Promise.reject(error)
)

// Response interceptor for error handling and token refresh
api.interceptors.response.use(
  response => {
    const duration = Date.now() - response.config.metadata.startTime
    console.debug(`[${response.config.method.toUpperCase()}] ${response.config.url} - ${duration}ms`)
    return response
  },
  async error => {
    const config = error.config

    // Handle 401 - Token expired or invalid
    if (error.response?.status === 401) {
      // Clear auth
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('refresh_token')

      // Redirect to login
      window.location.href = '/login'
      return Promise.reject(error)
    }

    // Handle 403 - Forbidden
    if (error.response?.status === 403) {
      console.error('Access denied - insufficient permissions')
      return Promise.reject(error)
    }

    // Handle 429 - Too many requests
    if (error.response?.status === 429) {
      console.warn('Rate limit exceeded')
      return Promise.reject(error)
    }

    // Retry logic for network errors
    if (ENABLE_RETRY && !config._retry) {
      config._retryCount = config._retryCount || 0
      if (config._retryCount < MAX_RETRIES) {
        config._retryCount++
        const delay = Math.pow(2, config._retryCount) * 1000 // Exponential backoff

        console.warn(`Retrying request (attempt ${config._retryCount}/${MAX_RETRIES}) after ${delay}ms`)

        await new Promise(resolve => setTimeout(resolve, delay))
        return api(config)
      }
    }

    // Enhanced error logging
    const errorInfo = {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      traceId: error.response?.data?.traceId,
      path: error.response?.data?.path,
      timestamp: new Date().toISOString()
    }

    console.error('[API Error]', errorInfo)
    return Promise.reject(error)
  }
)

function generateRequestId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export default api


