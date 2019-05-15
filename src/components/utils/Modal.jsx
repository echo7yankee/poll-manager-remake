import React from "react";

import style from "./modal.module.css";
import { CloseIcon } from "../imgAndSvg/SVG/icons";

const Modal = ({ text, deletePolls, toggleModal }) => {
  return (
    <div className={style.modalOverlay}>
      <div className={style.modal}>
        <span className={style.close} onClick={toggleModal}>
          <CloseIcon icon="icon-close" />
        </span>
        <p className={style.text}>{text}</p>
        <div>
          <button className="btn btn-submit mr-2" onClick={deletePolls}>
            Yes
          </button>
          <button className="btn btn-submit" onClick={toggleModal}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
