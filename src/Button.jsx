import React from "react";

const Button = ({ id, label, clickCallback }) => {
    const onClickHandler = e => {
        e.persist();
        const id = e.target.id;
        clickCallback(id);
    };
    return (
        <button id={id} className="btn" onClick={e => onClickHandler(e)}>
            {label}
        </button>
    );
};

export default Button;
