import { useState } from "react";
import Modal from "../Modal/Modal";

export default function ImageGalleryItem({ src, alt, largeImageUrl }) {
  const [showModal, setShowmodal] = useState(false);

  const toggleModal = () => setShowmodal(!showModal);

  return (
    <li className="ImageGalleryItem">
      <img
        src={src}
        alt={alt}
        className="ImageGalleryItem-image"
        onClick={toggleModal}
      />
      {showModal && (
        <Modal onClose={toggleModal} src={largeImageUrl} alt={alt} />
      )}
    </li>
  );
}
