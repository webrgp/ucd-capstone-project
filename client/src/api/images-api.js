import { apiEndpoint } from '../config'
import Axios from 'axios'

export const getImages= async (idToken) => {
  console.log('Fetching Images')

  const response = await Axios.get(`${apiEndpoint}/images`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })

  return response.data.items
}

export const createImage = async (idToken, newImage) => {
  const response = await Axios.post(`${apiEndpoint}/images`,  JSON.stringify(newImage), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.item
}

export const patchImage = async( idToken, imageId, updatedImage) => {
  await Axios.patch(`${apiEndpoint}/images/${imageId}`, JSON.stringify(updatedImage), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export const deleteImage = async (idToken, imageId) => {
  await Axios.delete(`${apiEndpoint}/images/${imageId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export const getUploadUrl = async (idToken, imageId ) => {
  const response = await Axios.post(`${apiEndpoint}/images/${imageId}/attachment`, '', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.uploadUrl
}

export const uploadFile = async (uploadUrl, file) => {
  const res = await Axios.put(uploadUrl, file)
  console.log(res);
}