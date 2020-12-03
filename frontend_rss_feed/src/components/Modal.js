import React from "react";
import "../css/modal.css";

function Modal({ setShow, show, children }) {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                {children}
                <button onClick={setShow(false)}>Close</button>
            </section>
        </div>
    )
}

export default Modal;