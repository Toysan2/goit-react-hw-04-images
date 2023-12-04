import React from 'react';
import './ImageGalleryItem.css';

const ImageGalleryItem = ({ src, largeSrc, onClick }) => (
  <li className="gallery-item" onClick={() => onClick(largeSrc)}>
    <img src={src} alt="" />
  </li>
);

export default ImageGalleryItem;
