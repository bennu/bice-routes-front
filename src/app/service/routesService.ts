import axios from 'axios'

const apiUrl = `${process.env.BASE_URL_ROUTES}`

interface RouteData {
  base64: string
  base64List: string[]
}

export const parse = async (data: RouteData) => {
  const response = await axios.patch(`${apiUrl}/routes`, data)
  return response.data
}

export const download = async () => {
  const response = await axios.get(`${apiUrl}/routes/download`)
  return response.data
}
