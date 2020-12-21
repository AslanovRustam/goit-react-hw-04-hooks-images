import { useState, useEffect, useRef } from "react";
import "./App.css";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Searchbar from "./Searchbar/Searchbar";
import ImagesInfo from "./ImagesInfo/ImagesInfo";
// import ImageGallery from './ImageGallery/Imagegallery';

export default function App() {
  const [image, setImage] = useState("");

  // useEffect(() => {
  //   if (image !== "") {
  //     setImage("");
  //   }
  // });
  const prevImageRef = useRef("");
  useEffect(() => {
    prevImageRef.current = image;
  });
  const prevImageName = prevImageRef.current;
  // const handleFormSubmit = (image) => {
  //   setImage(image);
  // };
  return (
    <>
      <Searchbar onSubmit={setImage} />
      <ImagesInfo imgItem={image} prevName={prevImageName} />
      <ToastContainer />
    </>
  );
}
