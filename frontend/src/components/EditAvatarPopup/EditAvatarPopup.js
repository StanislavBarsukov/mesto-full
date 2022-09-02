import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

const EditAvatarPopup = ({isOpen, onClose, onUpdateAvatar}) => {
    const avatarRef = React.useRef();

    React.useEffect(() => {
        avatarRef.current.value = ""
    }, [ isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    };

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                aria-label="Поле ввода названия аватара"
                className="popup__line"
                id="name-avatar"
                placeholder="Ссылка на Аватар"
                type="url"
                name="avatar"
                minLength="2"
                required
                ref={avatarRef}
            />
            <span id="name-avatar-error" className="error"></span>
        </PopupWithForm>
    )

};

export default EditAvatarPopup