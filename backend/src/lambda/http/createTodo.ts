import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { CreateImageRequest } from '../../requests/CreateImageRequest'
import { getUserId } from '../utils'
import { createImage } from '../../businessLogic/images'
import { createLogger } from '../../utils/logger'

const logger = createLogger('auth')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newImage: CreateImageRequest = JSON.parse(event.body)
    const userId = getUserId(event)

    logger.info(`Received request for creating image for user ${userId}...`)

    const item = await createImage(newImage, userId)

    return {
      statusCode: 201,
      body: JSON.stringify({
        item
      })
    }
  }
)

handler.use(
  cors({
    credentials: true
  })
)
