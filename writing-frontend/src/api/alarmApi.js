import writingApi from './writingApi'

export const getAlarmList = async () => {
   try {
      const response = await writingApi.get('/alarm')
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

export const deleteAlarmById = async (id) => {
   try {
      const response = await writingApi.delete(`/alarm/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

export const deleteAlarmList = async () => {
   try {
      const response = await writingApi.delete('/alarm')
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}
