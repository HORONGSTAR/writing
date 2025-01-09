import writingApi from './writingApi'

export const searchResult = async (search) => {
   try {
      const response = await writingApi.get(`/search/${search}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}
