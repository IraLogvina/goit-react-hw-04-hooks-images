import React, { Children } from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

import s from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

function Modal({ showModal, onClose }) {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.addEventListener("keydown", handleKeyDown);
    };
  });
  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      onClose();
    }
  };

  const handleBbackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={s.Overlay} onClick={handleBbackdropClick}>
      <div className={s.Modal}>
        {/* {Children} */}
        <img src={showModal} alt="modal" />
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;
