import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { UpdateImageRequest } from '../../requests/UpdateImageRequest'
import { getUserId } from '../utils'
import { updateImage } from '../../businessLogic/images'
import { createLogger } from '../../utils/logger'

const logger = createLogger('auth')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const imageId = event.pathParameters.imageId
    const updatedImage: UpdateImageRequest = JSON.parse(event.body)
    const userId = getUserId(event)

    if (!imageId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing imageId' })
      }
    }

    logger.info(
      `Received request for updating image ${imageId} of user ${userId}...`
    )

    await updateImage(userId, imageId, updatedImage)

    return {
      statusCode: 200,
      body: JSON.stringify({})
    }
  }
)

handler.use(
  cors({
    credentials: true
  })
)
