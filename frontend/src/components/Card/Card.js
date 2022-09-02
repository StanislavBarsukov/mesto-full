import React from "react";
import {CurrentUserContext} from "../../context/CurrentUserContext";

const Card = ({card,onCardClick, onCardLike, onCardDelete}) => {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner === currentUser._id;
    const isLiked = card.likes.some(i => i === currentUser._id);

    const cardDeleteButtonClassName = (
        `card__delete-button ${isOwn ? "card__delete-button_visible" : "card__delete-button_hidden"}`);

    const cardLikeButtonClassName = (`card__like ${isLiked ? "card__like_active" : ""}`);

    const handleClick = () => {
        onCardClick(card);
    };

    const handleLikeClick = () => {
        onCardLike(card);
    };

    const handleDeleteClick = () => {
        onCardDelete(card);
    };

    return(
        <li className="card">
             <button
                aria-label="Кнопка удалить фото"
                className={cardDeleteButtonClassName}
                type="button"
                onClick={handleDeleteClick}
            >
            </button>
            <img
                className="card__photo"
                src={card.link}
                alt={card.name}
                onClick={handleClick}
            />
            <div className="card__text">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__like-container">
                    <button
                        aria-label="Кнопка мне нравится"
                        className={cardLikeButtonClassName}
                        type="button"
                        onClick={handleLikeClick}
                    >
                    </button>
                    <p className="card__like-number">{card.likes.length}</p>
                </div>
            </div>
        </li>
    )
};

export default Card