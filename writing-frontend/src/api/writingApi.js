import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_URL

const writingApi = axios.create({
   baseURL: BASE_URL,
   headers: {
      'Content-Type': 'application/json',
   },
   withCredentials: true,
})

export default writingApi
