import React from 'react';
import './ImageGallery.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, onImageClick }) => (
  <ul className="gallery">
    {images.map(({ id, webformatURL, largeImageURL }, index) => (
      <ImageGalleryItem
        key={`${id}-${index}`} // Unique key using id and index
        src={webformatURL}
        largeSrc={largeImageURL}
        onClick={onImageClick}
      />
    ))}
  </ul>
);

export default ImageGallery;
