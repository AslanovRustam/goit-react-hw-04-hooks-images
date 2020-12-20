import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import s from "../Loader/loader.module.css";

export default function ImagePendingView() {
  return (
    <Loader
      className={s.loader}
      type="Grid"
      color="#00BFFF"
      height={80}
      width={80}
    />
  );
}
