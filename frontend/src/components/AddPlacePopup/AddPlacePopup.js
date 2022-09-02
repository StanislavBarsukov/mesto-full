import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

const AddPlacePopup = ({isOpen, onClose, onUpdateCard}) => {

    const nameRef = React.useRef();
    const linkRef = React.useRef();

    React.useEffect(() => {
        nameRef.current.value = ""
        linkRef.current.value = ""
    }, [ isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateCard({
            name: nameRef.current.value,
            link: linkRef.current.value
        });
    }

    return (
        <PopupWithForm
            name="photo"
            title="Новое место"
            buttonText="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                aria-label="Поле ввода названия места"
                className="popup__line"
                id="name-place"
                placeholder="Название"
                type="text"
                name="name"
                minLength="2"
                maxLength="30"
                required
                ref={nameRef}
            />
            <span id="name-place-error" className="error"></span>
            <input
                aria-label="Поле ввода ссылки на картинку"
                className="popup__line"
                id="name-link"
                placeholder="Ссылка на картинку"
                type="url"
                name="link"
                required
                ref={linkRef}
            />
            <span id="name-link-error" className="error"></span>
        </PopupWithForm>
  )

};

export default AddPlacePopup