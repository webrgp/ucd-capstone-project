import React, { useEffect } from 'react'
import { Alert, CardColumns, Container, Row, Col } from "react-bootstrap"

import { Store } from '../store'
import {
  deleteImage,
  getImages,
  createImage,
  getUploadUrl,
  patchImage,
  uploadFile
} from '../api/images-api'
import ImageInput from '../components/imageInput'
import ImageItem from '../components/imageItem'

const HomeView = ({user}) => {

  const { state, dispatch } = React.useContext(Store);

  useEffect(() => {
    fetchImages()
  }, []);

  const fetchImages = async () => {
    try {
      const result = await getImages(user.token)
      const sorted = result.sort( (a, b) =>
        (new Date(a.createdAt) < new Date(b.createdAt)) ? 1 : -1
      )
      console.log(sorted);
      dispatch({
        type: 'FETCH_IMAGES',
        value: sorted
      });
    } catch (e) {
      alert(`Failed to fetch todos: ${e.message}`)
    }
  }

  const onImageCreate = async ({ file, description }) => {

    if (description.length === 0 || file === null) {
      alert(`Picture can't be empty`)
      return
    }

    try {
      const image = await createImage(user.token, {
        description
      })

      const uploadUrl = await getUploadUrl(user.token, image.imageId)

      await uploadFile(uploadUrl, file)

      dispatch({
        type: 'ADD_IMAGE',
        value: image
      });

    } catch {
      alert('Image creation failed')
    }
  }

  const onDeleteImage = async ( image ) => {
    try {
      // Don't need to wait, just send the request out
      deleteImage(user.token, image.imageId)
      dispatch({
        type: 'DELETE_IMAGE',
        value: image
      });
    } catch {
      alert('Image deletion failed')
    }
  }

  const onUpdateImage = async (image) => {
    try {
      // Don't need to wait, just send the request out
      patchImage(user.token, image.imageId, {
        description: image.description
      })
      dispatch({
        type: 'UPDATE_IMAGE',
        value: image
      });
    } catch {
      alert('Image update failed')
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <ImageInput onImageCreate={onImageCreate} />
        </Col>
      </Row>
      <Row>
        {
          state && state.length > 0
          ? <CardColumns>
              {state.map( image => <ImageItem
                key={image.imageId}
                image={image}
                onDeleteImage={onDeleteImage}
                onUpdateImage={onUpdateImage}
              />)}
            </CardColumns>
          : <Col>
              <Alert variant='info' className='text-center'>
                You have no Images
              </Alert>
            </Col>
        }
      </Row>
    </Container>
  )
}

export default HomeView
