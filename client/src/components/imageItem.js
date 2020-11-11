import React, { useState } from 'react'
import { FaPen, FaTrash } from 'react-icons/fa';
import { Button, ButtonGroup, Col, Card, FormControl, InputGroup } from "react-bootstrap"

const ImageItem = ({ image, onDeleteImage, onUpdateImage }) => {

  const [description, setDescription] = useState(image.description)
  const [isEdit, setEdit] = useState(false)

  const handleSave = (event) => {
    event.preventDefault()

    onUpdateImage({
      ...image,
      description
    })

    setEdit(!isEdit)
  }

  return (
    <Col xs md={4}>
      <Card className="ImageItem">
        <Card.Img variant="top" src={image.imageUrl} />
        <Card.ImgOverlay>
          {
            isEdit
            ? <InputGroup>
                <FormControl
                  value={description}
                  onChange={ (event) => {
                    setDescription(event.target.value)
                  }}
                />
                <InputGroup.Append>
                  <Button variant="primary"
                    onClick={ handleSave }
                  >Save</Button>
                </InputGroup.Append>
              </InputGroup>
            : <>
                <Card.Text>{description}</Card.Text>
                <ButtonGroup>
                  <Button variant="primary" size="sm" onClick={(event) => {
                    setEdit(!isEdit)
                  }}><FaPen /></Button>
                  <Button variant="danger" size="sm" onClick={(event) => {
                    onDeleteImage(image)
                  }}><FaTrash /></Button>
                </ButtonGroup>
              </>
          }

        </Card.ImgOverlay>
      </Card>
    </Col>
  )
}

export default ImageItem
