import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_URL

const writingApi = axios.create({
   baseURL: BASE_URL,
   headers: {
      'Content-Type': 'application/json',
   },
   withCredentials: true,
})

export const createUser = async (userData) => {
   try {
      const response = await writingApi.post('/auth/join', userData)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

export const loginUser = async (credentials) => {
   try {
      const response = await writingApi.post('/auth/login', credentials)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

export const logoutUser = async () => {
   try {
      const response = await writingApi.get('/auth/logout')
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

export const authStatus = async () => {
   try {
      const response = await writingApi.get('/auth/status')
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

export const createPost = async (postDate) => {
   try {
      const response = await writingApi.post('/post', postDate)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

export const getPostById = async (id) => {
   try {
      const response = await writingApi.get(`/post/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

export const getPostByFollow = async () => {
   try {
      const response = await writingApi.get('/post/follow')
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

export const getPosts = async (page) => {
   try {
      const response = await writingApi.get(`/post?page=${page}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

export const createTheme = async (themeDate) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      }
      const response = await writingApi.post('/theme', themeDate, config)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

export const getThemes = async (page) => {
   try {
      const response = await writingApi.get(`/theme?page=${page}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

export default writingApi
