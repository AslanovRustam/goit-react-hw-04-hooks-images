import { Component } from "react";
import { animateScroll as scroll } from "react-scroll";
import s from "../Button/button.module.css";
import PropTypes from "prop-types";
import Loader from "../Loader/Loader";

export default class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  scrollPageOnBtnMore = () => {
    this.props.onClick();
    scroll.scrollToBottom();
  };

  render() {
    return (
      <button
        onClick={this.scrollPageOnBtnMore}
        className={s.Button}
        type="button"
      >
        Load more
      </button>
    );
  }
}
