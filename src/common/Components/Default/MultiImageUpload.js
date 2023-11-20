import ImageUploading from 'react-images-uploading';
import React from 'react';

export const MultiImageUpload = ({ listImageDependency, onChange }) => {
  return (
    <ImageUploading
      multiple
      value={listImageDependency}
      onChange={onChange}
      maxNumber={4}
      dataURLKey="data_url"
      acceptType={['jpg', 'png']}
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        <div className="file-upload-wrapper">
          <button
            style={isDragging ? { color: 'red' } : null}
            onClick={onImageUpload}
            {...dragProps}
            className="file-upload-btn"
          >
            Click here
          </button>
          &nbsp;
          <button onClick={onImageRemoveAll}>Remove all images</button>
          {imageList.map((image, index) => (
            <div key={index} className="image-item">
              <img src={image.data_url} alt="" width="100" />
              <div className="image-item__btn-wrapper">
                <button onClick={() => onImageUpdate(index)}>Update</button>
                <button onClick={() => onImageRemove(index)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </ImageUploading>
  );
};
