import React from "react";
import {CurrentUserContext} from "../../context/CurrentUserContext";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

const EditProfilePopup = ({isOpen, onClose, onUpdateUser}) => {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState("");
    const [about, setAbout] = React.useState("");

    React.useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
    }, [currentUser, isOpen]);

    const handleChangeName = (e) =>{
        setName(e.target.value);
    };

    const handleChangeAbout = (e) => {
        setAbout(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateUser({
            name,
            about,
        });
    };

    return (
        <PopupWithForm
             name="profile"
             title="Редактировать профиль"
             buttonText="Сохранить"
             isOpen={isOpen}
             onClose={onClose}
             onSubmit={handleSubmit}
        >
             <input
                 aria-label="Поле ввода имени"
                 className="popup__line popup__line_type_name"
                 id="name-form"
                 placeholder="Ваше Имя"
                 type="text"
                 name="name"
                 minLength="2"
                 maxLength="40"
                 required
                 value={name || ""}
                 onChange={handleChangeName}
             />
             <span id="name-form-error" className="error"></span>
             <input
                 aria-label="Поле ввода описания"
                 name="about"
                 className="popup__line popup__line_type_info"
                 id="job-form"
                 placeholder="Описание"
                 type="text"
                 minLength="2"
                 maxLength="200"
                 required
                 value={about || ""}
                 onChange={handleChangeAbout}
             />
             <span id="job-form-error" className="error"></span>
        </PopupWithForm>
    )

};

export default EditProfilePopup