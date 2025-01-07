import writingApi from './writingApi'

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
