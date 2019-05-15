import React from "react";

import style from "./spinner.module.css";
import SpinnerGif from "../imgAndSvg/GIF/spinner.gif";

const Spinner = () => {
  return (
    <div className={style.spinner}>
      <img src={SpinnerGif} alt="Fetching data" />
    </div>
  );
};

export default Spinner;
