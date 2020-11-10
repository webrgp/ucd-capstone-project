import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { ImageItem } from '../models/ImageItem'
import { UpdateImageRequest } from '../requests/UpdateImageRequest'
import { createLogger } from '../utils/logger'

const logger = createLogger('auth')

const XAWS = AWSXRay.captureAWS(AWS)

export class ImageAccess {
  constructor(
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly imagesTable = process.env.IMAGES_TABLE,
    private readonly createdAtIndex = process.env.CREATED_AT_INDEX
  ) {}

  async getImages(userId: string): Promise<ImageItem[]> {
    const result = await this.docClient
      .query({
        TableName: this.imagesTable,
        IndexName: this.createdAtIndex,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId
        }
      }).promise()

    logger.info(`Found ${result.Count} images for user ${userId}`)

    return result.Items as ImageItem[]
  }

  async createImage(image: ImageItem): Promise<ImageItem> {
    await this.docClient.put({
      TableName: this.imagesTable,
      Item: image
    }).promise()

    logger.info(`Saved new image ${image.imageId} for user ${image.userId}`)

    return image
  }

  async updateImage(
    userId: string,
    imageId: string,
    updatedImage: UpdateImageRequest
  ) {

    await this.docClient.update({
      TableName: this.imagesTable,
      Key: { // update based on key userId and imageId:
          userId,
          imageId,
      },
      UpdateExpression:
          'set #description = :description',
      ExpressionAttributeValues: {
          ':description': updatedImage.description,
      },
      ExpressionAttributeNames: {
          '#description': 'description',
      }
    }).promise();

    logger.info(`Updating image: ${updatedImage}`);

  }

  async deleteImage(userId: string, imageId: string) {
    await this.docClient
      .delete({
        TableName: this.imagesTable,
        Key: {
          userId,
          imageId
        }
      })
      .promise()

    logger.info(`Deleted image ${imageId}`)
  }
}
