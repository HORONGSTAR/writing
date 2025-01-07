import writingApi from './writingApi'

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
