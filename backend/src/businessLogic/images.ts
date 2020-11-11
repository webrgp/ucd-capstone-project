import * as uuid from 'uuid'
import { ImageItem } from '../models/ImageItem'
import { ImageAccess } from '../dataLayer/imageAccess'
import { CreateImageRequest } from '../requests/CreateImageRequest'
import { UpdateImageRequest } from '../requests/UpdateImageRequest'
import { createLogger } from '../utils/logger'

const logger = createLogger('auth')

const imageAccess = new ImageAccess()

const bucketName = process.env.IMAGES_S3_BUCKET

export async function createImage(createImageRequest: CreateImageRequest, userId: string): Promise<ImageItem> {
  logger.info('Generating uuid...')
  const imageId = uuid.v4()

  return await imageAccess.createImage({
    imageId,
    userId,
    createdAt: new Date().toISOString(),
    imageUrl: `https://${bucketName}.s3.amazonaws.com/${imageId}`,
    ...createImageRequest,
  })
}

export async function getImages(userId: string): Promise<ImageItem[]> {
  return await imageAccess.getImages(userId)
}

export async function updateImage(
  userId: string,
  imageId: string,
  updatedImage: UpdateImageRequest
) {
  return await imageAccess.updateImage(userId, imageId, updatedImage)
}

export async function deleteImage(userId: string, imageId: string) {
  return await imageAccess.deleteImage(userId, imageId)
}
