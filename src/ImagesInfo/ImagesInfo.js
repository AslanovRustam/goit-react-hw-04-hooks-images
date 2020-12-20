import React, { Component } from "react";
import PropTypes from "prop-types";
import ImagesErrorView from "../ImagesErrorView/ImagesErrorView";
import ImageGallery from "../ImageGallery/Imagegallery";
import Api from "../ImagesApi";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";
import s from "../ImagesInfo/image.modal.css";

export default class ImagesInfo extends Component {
  state = {
    images: [],
    status: "idle",
    error: null,
    page: 1,
  };

  static propTypes = {
    imgItem: PropTypes.string,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevImg = prevProps.imgItem;
    const nextImg = this.props.imgItem;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    console.log(nextPage);

    if (prevImg !== nextImg) {
      ///// обнуляет массив фото и сбрасывает страницу
      this.setState({ page: 1, images: [] });
    }

    if (prevImg !== nextImg || prevPage !== nextPage) {
      // this.setState({ status: "pending" });
      this.fetchImageGallery();
      // this.setState({ status: "resolved" });
    }
  }

  fetchImageGallery = () => {
    const nextImg = this.props.imgItem;
    const nextPage = this.state.page;
    Api.fetchImages(nextImg, nextPage)
      // .then((images) => this.setState({ images, status: "resolved" }))
      .then((newImages) => {
        if (newImages.total !== 0) {
          this.setState((prevState) => ({
            images: [...prevState.images, ...newImages.hits],
            status: "resolved",
          }));
          return;
        }
        return Promise.reject(new Error("Invalid request"));
      })
      .catch((error) => this.setState({ error, status: "rejected" }));
  };

  onClickLoadMoreBtn = () => {
    // console.log('больше');

    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { error, status, images } = this.state;
    if (status === "idle") {
      return <p>Please, enter the search query</p>;
    }
    if (status === "pending") {
      return <Loader />;
    }
    if (status === "rejected") {
      return <ImagesErrorView message={error.message} />;
    }
    if (status === "resolved") {
      return (
        <>
          <ImageGallery images={images} />
          <Button onClick={this.onClickLoadMoreBtn} />
        </>
      );
    }
  }
}
