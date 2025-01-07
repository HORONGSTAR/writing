import writingApi from './writingApi'

export const createComment = async (commentData) => {
   try {
      const response = await writingApi.post('/comment', commentData)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

export const getComments = async (id) => {
   try {
      const response = await writingApi.get(`/comment/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

export const updateComment = async (commentData, id) => {
   try {
      const response = await writingApi.put(`/comment/${id}`, commentData)
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
