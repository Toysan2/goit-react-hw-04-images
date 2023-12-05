import React, { useState, useEffect, useCallback } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

const App = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [totalPages, setTotalPages] = useState(0); // New state for total pages

  const fetchImages = useCallback(async () => {
    const API_KEY = '9553753-ea4dda346b6c3bb2d3db6490b';
    const BASE_URL = 'https://pixabay.com/api/';

    if (currentPage > totalPages && totalPages !== 0) {
      console.log('Reached the end of search results');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const url = `${BASE_URL}?q=${encodeURIComponent(
        searchQuery
      )}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Error fetching images: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      const totalHits = data.totalHits;
      const pages = Math.ceil(totalHits / 12); // Calculate total pages
      setTotalPages(pages);

      setImages(prevImages => [...prevImages, ...data.hits]);
      setCurrentPage(prevPage => prevPage + 1);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, currentPage, totalPages]);

  useEffect(() => {
    if (searchQuery !== '') {
      fetchImages();
    }
  }, [searchQuery, currentPage, fetchImages]);

  const handleSearch = query => {
    setSearchQuery(query);
    setImages([]);
    setCurrentPage(1);
    setTotalPages(0); // Reset total pages on new search
  };

  const toggleModal = (imageURL = '') => {
    setShowModal(!showModal);
    setLargeImageURL(imageURL);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSearch} />
      <ImageGallery images={images} onImageClick={toggleModal} />

      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && currentPage <= totalPages && (
        <Button onClick={() => fetchImages()} />
      )}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt="Large view" />
        </Modal>
      )}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default App;
