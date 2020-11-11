import React, { useRef, useState } from 'react'
import { FaRegImage } from 'react-icons/fa';
import { Button, Form, FormControl, InputGroup } from "react-bootstrap"

const defaultImageState = {
  file: null,
  description: ''
}

const ImageInput = ({onImageCreate}) => {

  const fileInputRef = useRef(null)

  const [imageState, setImageState] = useState(defaultImageState);

  const handleFileChange = (event) => {
    const files = event.target.files
    if (files.length > 0) {
      setImageState({
        ...imageState,
        file: files[0]
      })
    }
  }

  const handleSave = (event) => {
    event.preventDefault()
    onImageCreate(imageState)
  }

  return (
    <div className="ImageInput">
      <Form>
        <div className="ImageInput--upload-button" hidden={ imageState.file !== null } >
          <Button onClick={(event) => {
            event.preventDefault();
            fileInputRef.current.click()
          }}><FaRegImage /> Upload Photo</Button>
          <input
            ref={fileInputRef}
            type="file"
            hidden
            onChange={handleFileChange}
          />
        </div>
        <div hidden={ imageState.file === null } >
          <InputGroup>
            <FormControl
              placeholder="Picture description"
              value={imageState.description}
              onChange={ (event) => {
                setImageState({
                  ...imageState,
                  description: event.target.value
                })
              }}
            />
            <InputGroup.Append>
              <InputGroup.Text>{imageState.file !== null && imageState.file.name}</InputGroup.Text>
              <Button variant="primary"
                onClick={ handleSave }
              >Save</Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
      </Form>
    </div>
  )
}

export default ImageInput
