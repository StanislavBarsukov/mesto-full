import React from "react";

const PopupWithForm = (props) => {
    return(
        <div className={`popup popup_type_${props.name} + ${props.isOpen && "popup_active"}`}>
            <div className="popup__container">
                <h2 className="popup__title">{props.title}</h2>
                <form
                    className="popup__form"
                    name={`${props.name}`}
                    onSubmit={props.onSubmit}
                    >
                    {props.children}
                    <button
                        aria-label="Кнопка сохранить"
                        className="popup__save"
                        type="submit"
                    >{props.buttonText}
                    </button>
                </form>
                <button
                    aria-label="Кнопка закрыть"
                    className="popup__close"
                    type="button"
                    onClick={props.onClose}
                >
                </button>
            </div>
        </div>
    )
};

export default PopupWithForm;