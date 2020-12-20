import { useState } from "react";
import { toast } from "react-toastify";

function Searchbar({ onSubmit }) {
  const [image, setImage] = useState("");

  //получение значения input
  const handleNameChange = (event) => {
    // const imageQuery = event.currentTarget.value.toLowerCase();
    setImage(event.currentTarget.value.toLowerCase());
  };
  //отправка значения из формы
  const handleSubmit = (event) => {
    event.preventDefault();
    if (image.trim() === "") {
      toast("Please enter the query !");
      return;
    }
    // this.props.onSubmit - вызывает props из App под именем onSubmit
    onSubmit(image);
    setImage("");
  };
  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          name="imageName"
          value={image}
          onChange={handleNameChange}
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

export default Searchbar;
