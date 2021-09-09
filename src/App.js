import React from "react";
import { useState, useEffect } from "react";
import ImageApi from "./components/API/ImageApi";

import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import Modal from "./components/Modal";
import Loader from "./components/Loader";
import ErrorQuery from "./components/ErrorQuery/ErrorQuery";
import { ToastContainer } from "react-toastify";

function App() {
  const [query, setQuery] = useState(null);
  const [status, setStatus] = useState("idle");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null)


  useEffect(() => {
    if (query === '') {
      return;
    }
    const options = {
      page,
      query,
    };
    setIsLoading(true);
    ImageApi
      .fetchImage(options)
      .then(images => {
        if (images.total === 0) {
          setError(`Nothing was found for your query ${query}`);
          setStatus("rejected");
        } else {
          setImages(images.hits);
          setStatus("resolved");
        }
      })
      .then(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => setError(error))
      .finally(() => setIsLoading(false));

  }, [page, query]);
  
  const toggleModal = () => setShowModal(!showModal);

  const openModal = (e) => {
    e.preventDefault();
    if (e.target.nodeName === "IMG") {
      setShowModal(true);
    }
  };

  const handleFormSubmit = (query) => {
    setImages([]);
    setQuery(query);
    setPage(1);
  };

  const handleLoadMore = () => {
  setPage(page + 1);
};


    if (status === "idle") {
      return (
        <>
          <Searchbar onSubmit={handleFormSubmit} />
          <ToastContainer autoClose={3000} />
        </>
      );
    }

    if (status === "pending") {
      return (
        <>
          <Searchbar onSubmit={handleFormSubmit} />
          {isLoading && <Loader />}
        </>
      );
    }

    if (status === "rejected") {
      return (
        <>
          <Searchbar onSubmit={handleFormSubmit} />
          <ErrorQuery message={error} />
          <ToastContainer autoClose={3000} />
        </>
      );
    }

    if (status === "resolved") {
      return (
        <>
          <Searchbar onSubmit={handleFormSubmit} />
          <ImageGallery images={images} onClick={openModal} />
          {showModal && (
            <Modal onClose={toggleModal}>
              {/* <img src={showModal} alt="modal" /> */}
            </Modal>
          )}
          {isLoading && <Loader />}
          <Button onClick={handleLoadMore} />
          <ToastContainer autoClose={3000} />
        </>
      );
    }
}
  

export default App;
