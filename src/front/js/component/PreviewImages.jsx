import React from 'react'

const PreviewImages = ({ images, onDragStart, onDrop, isDragging, setIsDragging, onDelete }) => {
  return (
    <div>
      <div className='d-flex flex-wrap gap-2'>
        {images.map((image) => (
          <div
            key={image.id}
            className='d-flex flex-column gap-2 align-items-center mt-2'
            style={{ height: '260px', width: '200px' }}
            draggable
            onDragStart={(e) => onDragStart(e, image)}
            onDragEnd={() => setIsDragging(false)}
            onDrop={(e) => onDrop(e, image)}
            onDragOver={(e) => e.preventDefault()}
          >
            <img
              src={URL.createObjectURL(image)}
              alt={image.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                border: `1px ${isDragging ? 'dashed' : 'solid'}`,
              }}
              className={`${isDragging ? 'border-primary' : 'border-dark'} `}
            />
            <button
              type='button'
              className='btn btn-danger'
              onClick={() => onDelete(image.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
export default PreviewImages
