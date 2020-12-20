import { animateScroll as scroll } from "react-scroll";
import s from "../Button/button.module.css";
import PropTypes from "prop-types";

export default function Button({ onClick }) {
  const scrollPageOnBtnMore = () => {
    onClick();
    scroll.scrollToBottom();
  };

  return (
    <button onClick={scrollPageOnBtnMore} className={s.Button} type="button">
      Load more
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
