import React from "react";

const PopupConform = () => {
    return (
        <div className="popup popup_type_delete">
            <div className="popup__container">
                <h2 className="popup__title popup__title_conform">Вы уверенны?</h2>
                <button
                    aria-label="Кнопка подтверждения"
                    className="popup__save popup__save_conform"
                    type="button"
                >Да
                </button>
                <button
                    aria-label="Кнопка закрыть"
                    className="popup__close"
                    type="button"
                >
                </button>
            </div>
        </div>
    )
};

export default PopupConform;
