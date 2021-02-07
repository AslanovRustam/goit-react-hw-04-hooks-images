import { animateScroll as scroll } from "react-scroll";
import s from "../Button/button.module.css";
import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function ButtonFunc({ onClick }) {
  const classes = useStyles();
  const scrollPageOnBtnMore = () => {
    onClick();
    scroll.scrollToBottom();
  };

  return (
    // <Button variant="contained" color="primary" onClick={scrollPageOnBtnMore}>
    //   Load more
    // </Button>
    <button onClick={scrollPageOnBtnMore} className={s.Button} type="button">
      Load more
    </button>
  );
}

ButtonFunc.propTypes = {
  onClick: PropTypes.func.isRequired,
};
