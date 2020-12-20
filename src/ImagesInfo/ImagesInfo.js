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
export default function ImagesInfo({ imageName, prevImg }) {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (imageName !== prevImg) {
      ///// обнуляет массив фото и сбрасывает страницу
      setImages([]);
      setPage(1);
    }
  }, [imageName, prevImg]);

  useEffect(() => {
    if (prevImg === "") {
      console.log("no such images found");
      return;
    }
    // setStatus(Status.PENDING);
    // fetchImageGallery();
    Api.fetchImages(imageName, page)
      .then((newImages) => {
        if (newImages.total !== 0) {
          setImages((prevState) => [...prevState, ...newImages.hits]);
          setStatus(Status.RESOLVED);
          return;
        }
        return Promise.reject(new Error("Invalid request"));
      })
      .catch((error) => setStatus(Status.REJECTED), setError({ error }));
  }, [imageName, page, prevImg]);
  ////////////////////////////////////////////
  // const fetchImageGallery = (prevImg, page) => {
  //   // const nextImg = this.props.imgItem;
  //   // const nextPage = this.state.page;
  //   Api.fetchImages(prevImg, page)
  //     // .then((images) => this.setState({ images, status: "resolved" }))
  //     .then((newImages) => {
  //       if (newImages.total !== 0) {
  //         setImages((prevState) => [...prevState, ...newImages.hits]);
  //         setStatus(Status.RESOLVED);
  //         // status: "resolved",
  //         return;
  //       }
  //       return Promise.reject(new Error("Invalid request"));
  //     })
  //     .catch((error) => setStatus(Status.REJECTED), setError({ error }));
  // };
  // componentDidUpdate(prevProps, prevState) {
  //   const prevImg = prevProps.imgItem;
  //   const nextImg = this.props.imgItem;
  //   const prevPage = prevState.page;
  //   const nextPage = this.state.page;
  //   console.log(nextPage);

  // if (prevImg !== nextImg) {
  //   ///// обнуляет массив фото и сбрасывает страницу
  //   this.setState({ page: 1, images: [] });
  // }

  //   if (prevImg !== nextImg || prevPage !== nextPage) {
  //     // this.setState({ status: "pending" });
  //     this.fetchImageGallery();
  //     // this.setState({ status: "resolved" });
  //   }
  // }

  // const fetchImageGallery = () => {
  //   const nextImg = this.props.imgItem;
  //   const nextPage = this.state.page;
  //   Api.fetchImages(nextImg, nextPage)
  //     // .then((images) => this.setState({ images, status: "resolved" }))
  //     .then((newImages) => {
  //       if (newImages.total !== 0) {
  //         this.setState((prevState) => ({
  //           images: [...prevState.images, ...newImages.hits],
  //           status: "resolved",
  //         }));
  //         return;
  //       }
  //       return Promise.reject(new Error("Invalid request"));
  //     })
  //     .catch((error) => this.setState({ error, status: "rejected" }));
  // };

  // onClickLoadMoreBtn = () => {
  //   // console.log('больше');

  //   this.setState((prevState) => ({
  //     page: prevState.page + 1,
  //   }));
  // };

  // const { error, status, images } = this.state;
  if (status === Status.IDLE) {
    return <p>Please, enter the search query</p>;
  }
  if (status === Status.PENDING) {
    return <Loader />;
  }
  if (status === Status.REJECTED) {
    return <ImagesErrorView message={error.message} />;
  }
  if (status === Status.RESOLVED) {
    return (
      <>
        <ImageGallery images={images} />
        <Button onClick={setPage(page + 1)} />
      </>
    );
  }
}
//  ImagesInfo.propTypes = {
//     imgItem: PropTypes.string,
//   }
