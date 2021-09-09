import React, { Component } from "react";
import ImageApi from "./components/API/ImageApi";

import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import Modal from "./components/Modal";
import Loader from "./components/Loader";
import ErrorQuery from "./components/ErrorQuery/ErrorQuery";
import { ToastContainer } from "react-toastify";

class App extends Component {
  state = {
    images: [],
    status: "idle",
    page: 1,
    query: "",
    showModal: "",
    isLoading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.setState({
        status: "pending",
        page: 1,
        images: [],
      });
      this.fetchImage();
    }
  }

  fetchImage = () => {
    const { query, page } = this.state;

    const options = {
      page,
      query,
    };
    this.setState({ isLoading: true });
    ImageApi.fetchImage(options)
      .then(images => {
        if (images.total === 0) {
          this.setState({
            error: `Nothing was found for your query ${query}`,
            status: 'rejected',
          });
        }
    else {
      this.setState(prevState => ({
        images: images.hits,
        status: 'resolved',
        page: prevState.page + 1,
      }));
    }
  })
      .then(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      })
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  toggleModal = () => {
    this.setState({
      showModal: "",
    });
  };

  openModal = (e) => {
    e.preventDefault();
    if (e.target.nodeName === "IMG") {
      this.setState({ showModal: e.target.dataset.image });
    }
  };

  handleFormSubmit = (query) => {
    this.setState({ query, page: 1, images: [] });
  };

  handleLoadMore = () => {
    const { query, page } = this.state;
    this.fetchImage(query, page);
  };

  render() {
    const { images, error, isLoading, showModal, status } = this.state;

    if (status === "idle") {
      return (
        <>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ToastContainer autoClose={3000} />
        </>
      );
    }

    if (status === "pending") {
      return (
        <>
          <Searchbar onSubmit={this.handleFormSubmit} />
          {isLoading && <Loader />}
        </>
      );
    }

    if (status === "rejected") {
      return (
        <>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ErrorQuery message={error} />
          <ToastContainer autoClose={3000} />
        </>
      );
    }

    if (status === "resolved") {
      return (
        <>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ImageGallery images={images} onClick={this.openModal} />
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={this.state.showModal} alt="modal" />
            </Modal>
          )}
          {isLoading && <Loader />}
          <Button onClick={this.handleLoadMore} />
          <ToastContainer autoClose={3000} />
        </>
      );
    }
  }
}

export default App;
