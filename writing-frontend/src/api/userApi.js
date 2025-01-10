import writingApi from './writingApi'

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

export const addLikemark = async (id) => {
   try {
      const response = await writingApi.post(`/user/likemark/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

export const removeLikemark = async (id) => {
   try {
      const response = await writingApi.delete(`/user/likemark/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

export const addBookmark = async (id) => {
   try {
      const response = await writingApi.post(`/user/bookmark/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}
