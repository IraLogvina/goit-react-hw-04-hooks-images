import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import s from "./Loader.module.css";

const loader = () => {
  return (
    <div className={s.Loader}>
      <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} />
      <p>Loading...</p>
    </div>
  );
};

export default loader;
