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

export const editUser = async (userData) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      }
      const response = await writingApi.put('/auth/edit', userData, config)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

export const createPost = async (postData) => {
   try {
      const response = await writingApi.post('/post', postData)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

export const updatePost = async (postData, id) => {
   try {
      const response = await writingApi.put(`/post/id/${id}`, postData)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

export const deletePost = async (id) => {
   try {
      const response = await writingApi.delete(`/post/id/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

export const getPostById = async (id) => {
   try {
      const response = await writingApi.get(`/post/id/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

export const getPosts = async (page) => {
   try {
      const response = await writingApi.get(`/post/all?page=${page}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

export const getFolloingPosts = async (page) => {
   try {
      const response = await writingApi.get(`/post/following?page=${page}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

export const getUserPosts = async (id, page) => {
   try {
      const response = await writingApi.get(`/post/user/${id}?page=${page}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

export const createTheme = async (themeData) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      }
      const response = await writingApi.post('/theme', themeData, config)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

export const deleteTheme = async (id) => {
   try {
      const response = await writingApi.delete(`/theme/id/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

export const getThemes = async (page, limit) => {
   try {
      const response = await writingApi.get(`/theme?page=${page}&limit=${limit}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

export const getThemeList = async () => {
   try {
      const response = await writingApi.get(`/theme/list`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

export const getProfile = async () => {
   try {
      const response = await writingApi.get(`/page/profile`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

export const getProfileId = async (id) => {
   try {
      const response = await writingApi.get(`/page/profile/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

export const followUser = async (id) => {
   try {
      const response = await writingApi.post(`/user/follow/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

export const unFollowUser = async (id) => {
   try {
      const response = await writingApi.delete(`/user/follow/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

export const createComment = async (commentData) => {
   try {
      const response = await writingApi.post('/comment', commentData)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

export const deleteComment = async (id) => {
   try {
      const response = await writingApi.delete(`/comment/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

export default writingApi
