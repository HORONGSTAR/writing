import writingApi from './writingApi'

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

export const getPosts = async (page, limit, endpoint) => {
   try {
      const response = await writingApi.get(`/post${endpoint}?page=${page}&limit=${limit}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}
