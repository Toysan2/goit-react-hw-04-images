import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    error: null,
    showModal: false,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      images: [],
      error: null,
    });
  };

  fetchImages = async () => {
    const { currentPage, searchQuery } = this.state;
    const API_KEY = '9553753-ea4dda346b6c3bb2d3db6490b';
    const BASE_URL = 'https://pixabay.com/api/';

    this.setState({ isLoading: true });

    try {
      const url = `${BASE_URL}?q=${encodeURIComponent(
        searchQuery
      )}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
      const response = await fetch(url);
      const data = await response.json();

      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        currentPage: prevState.currentPage + 1,
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  openModal = largeImageURL => {
    this.setState({ largeImageURL });
    this.toggleModal();
  };

  render() {
    const { images, isLoading, showModal, largeImageURL } = this.state;
    const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;

    return (
      <div>
        <Searchbar onSubmit={this.onChangeQuery} />
        <ImageGallery images={images} onImageClick={this.openModal} />

        {isLoading && <Loader />}

        {shouldRenderLoadMoreButton && <Button onClick={this.fetchImages} />}

        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.toggleModal} />
        )}
      </div>
    );
  }
}

export default App;
