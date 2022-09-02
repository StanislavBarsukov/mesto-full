import React from "react";
import Card from "../Card/Card";
import {CurrentUserContext} from "../../context/CurrentUserContext";

const Main = ({onEditAvatar, onEditProfile,
                onAddPlace, cards, onCardClick,
                onCardLike, onCardDelete }) => {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__info-avatar">
                    <button
                        onClick={onEditAvatar}
                        aria-label="Изменить фото аватара"
                        className="profile__avatar-button">
                    </button>
                    {currentUser.avatar && (<img className ="profile__avatar" src={currentUser.avatar} alt="Ваш аватар"  />)}
                </div>
                <div className="profile__block">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button
                        onClick={onEditProfile}
                        aria-label="Кнопка редактирования профиля"
                        className="profile__edit"
                        type="button">
                    </button>
                    <p className="profile__job">{currentUser.about}</p>
                </div>
                <button
                    aria-label="Кнопка добавления фото"
                    className="profile__add-photo"
                    type="button"
                    onClick={onAddPlace}
                >
                </button>
            </section>
            <section className="elements">
                <ul className="gallery">
                    {cards.map((card) => (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        >
                        </Card>
                    ))}
                </ul>
            </section>
        </main>
    )

};

export default Main