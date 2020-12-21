import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ImagesErrorView from "../ImagesErrorView/ImagesErrorView";
import ImageGallery from "../ImageGallery/Imagegallery";
import Api from "../ImagesApi";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";
import s from "../ImagesInfo/image.modal.css";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};
////////////////////////////////////////////
export default function ImagesInfo({ imgItem, prevName }) {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const resetImages = () => {
    // if (prevProps.imgItem !== props.imgItem) {
    ///// обнуляет массив фото и сбрасывает страницу
    setImages([]);
    setPage(1);
  };

  useEffect(() => {
    // resetImages();
    if (!imgItem) {
      return;
    }
    fetchImageGallery();
  }, [imgItem, page]);

  useEffect(() => {
    setImages([]);
    setPage(1);
  }, [prevName]);

  const fetchImageGallery = () => {
    Api.fetchImages(imgItem, page)
      // .then((images) => this.setState({ images, status: "resolved" }))
      .then((newImages) => {
        if (newImages.total !== 0) {
          setImages((prevState) => [...prevState, ...newImages.hits]);
          setStatus(Status.RESOLVED);
          return;
        }
        return Promise.reject(new Error("Invalid request"));
      })
      .catch((error) => setStatus(Status.REJECTED));
  };

  const onClickLoadMoreBtn = () => {
    setPage((prevState) => prevState + 1);
  };

  if (status === Status.IDLE) {
    return <p>Please, enter the search query</p>;
  }
  if (status === Status.PENDING) {
    return <Loader />;
  }
  if (status === Status.REJECTED) {
    return <ImagesErrorView />;
  }
  if (status === Status.RESOLVED) {
    return (
      <>
        <ImageGallery images={images} />
        <Button onClick={onClickLoadMoreBtn} />
      </>
    );
  }
}
