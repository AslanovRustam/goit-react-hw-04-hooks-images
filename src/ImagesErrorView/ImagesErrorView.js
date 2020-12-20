import error from "../error.jpg";
import s from "../ImagesErrorView/imageErrorView.module.css";

export default function ImagesErrorView({ message }) {
  return (
    <div>
      <img className={s.error} src={error} />

      <p>No such image finded...</p>
    </div>
  );
}
