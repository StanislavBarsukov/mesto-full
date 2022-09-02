import React from "react";
import iconSuccess from "../../images/Success.svg";
import iconError from "../../images/Error.svg";

const InfoTooltip = ({isOpen, onClose,isSuccess}) => {
    return (
        <div className={`popup popup_type_info ${isOpen ? "popup_active" : ""}`}>
            <div className="popup__container popup__container_type_info">
                { isSuccess ? (
                    <>
                        <img
                            src={iconSuccess}
                            alt="Регестрация успешна"
                            className="popup__info_images"/>
                        <p className="popup__info_message">Вы успешно зарегистрировались!</p>
                    </>
                    ) : (
                    <>
                        <img
                            src={iconError}
                            alt="Что-то пошло не так"
                            className="popup__info_images"/>
                        <p className="popup__info_message">Что-то пошло не так!  Попробуйте ещё раз.</p>
                    </>
                    )}
                <button
                    onClick={onClose}
                    aria-label="Кнопка закрыть"
                    className="popup__close"
                    type="button"
                >
                </button>
            </div>
        </div>
    )
};

export default InfoTooltip;