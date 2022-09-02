import React from "react";

const ImagePopup = ({card, onClose}) => {
    return(
        <div className={`popup popup_type_modal + ${card.link && "popup_active"}`}>
            <div className="modal">
                <img
                    className="modal__photo"
                    src={card.link}
                    alt={card.name}
                />
                <h2 className="modal__desc">{card.name}</h2>
                <button
                    aria-label="Кнопка закрыть"
                    className="popup__close"
                    type="button"
                    onClick={onClose}
                >
                </button>
            </div>
        </div>
    )
};

export default ImagePopup;