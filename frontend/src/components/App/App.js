import React from "react";
import {CurrentUserContext} from "../../context/CurrentUserContext";
import {Route,Routes,Navigate,useNavigate} from "react-router-dom";

import api from "../../utils/Api";
import * as auth from "../../utils/Auth";

import Login from "../Login/Login";
import Register from "../Register/Register";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import ImagePopup from "../ImagePopup/ImagePopup";
import PopupConform from "../PopupConform/PopupConform";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "../EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "../AddPlacePopup/AddPlacePopup";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

const App = () => {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isInfoTooltip, setIsInfoTooltip] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    //const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    React.useEffect(() => {
        handleTokenCheck()
    }, []);

    React.useEffect(() => {
        if (loggedIn) {
            api.getInitialUser(token)
                .then(resolve => setCurrentUser(resolve.user))
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                });
        }
    }, [loggedIn, token]);

    React.useEffect(() => {
        if (loggedIn) {
            api.getInitialCards(token)
                .then(resolve => setCards(resolve.card.reverse()))
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                });
        }
    }, [loggedIn, token]);

    const handleCardLike = (card) => {
        const isLiked = card.likes.some(i => i === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard.card : c));
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    };

    const handleCardDelete = (card) => {
        api.deleteCard(card._id)
            .then(() => {
                setCards((cards) => cards.filter((item) => item._id !== card._id));
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    };

    const handleUpdateUser = (userData) => {
      api.setUserInfo(userData)
          .then((res) => {
              setCurrentUser(res.user);
          })
          .catch((err) => {
              console.log(`Ошибка: ${err}`);
          });
        closeAllPopups();
    };

    const handleUpdateAvatar = (avatarData) => {
        api.setUserAvatar(avatarData)
            .then((res) => {
                setCurrentUser(res.user);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
        closeAllPopups();
    };

    const handleAddPlaceSubmit = (newData) => {
        api.setUpdateCard(newData)
            .then((newCard) => {
                setCards([newCard.card, ...cards]);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
        closeAllPopups();
    };

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    };

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    };

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    };

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsInfoTooltip(false)
        setSelectedCard({});
        //setIsDeletePopupOpen(false);
    };

    const handleRegister = (password, email) => {
        auth.register(password, email)
            .then(() => {
                setIsInfoTooltip(true);
                setIsSuccess(true);
                navigate("/sing-in");

            })
            .catch((err) => {
                console.log(`Некорректно заполнено одно из полей ${err}`)
                setIsInfoTooltip(true);
                setIsSuccess(false);
            });

    };

    const handleLogin = (password, email) => {
        auth.authorize(password, email)
            .then((res) => {
                localStorage.setItem("token", res.token);
                setLoggedIn(true);
                setEmail(email);
                navigate("/");
            })
            .catch((err) => {
                console.log(err)
                setLoggedIn(false);
                setIsInfoTooltip(true);
                setIsSuccess(false);
            });
    };

    const handleTokenCheck = () => {
        const token = localStorage.getItem("token");
        setLoggedIn(true);
        if (token) {
            auth.getContent(token)
                .then((res) => {
                    setEmail(res.user.email);
                    setLoggedIn(true);
                    navigate("/");
                })
                .catch((err) => console.log(err));
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        setLoggedIn(false);
        navigate("/sing-in");
    };

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header handleLogout={handleLogout} email={email}/>
                <Routes>
                    <Route path="/sing-in" element= {<Login handleLogin={handleLogin}></Login>}/>
                    <Route path="/sing-up" element= {<Register handleRegister={handleRegister}> </Register>}/>
                    <Route path="*" element={ loggedIn ? <Navigate to="/"/> : <Navigate to="/sing-in"/>}/>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute loggedIn={loggedIn}>
                                <Main
                                    onEditProfile={handleEditProfileClick}
                                    onAddPlace={handleAddPlaceClick}
                                    onEditAvatar={handleEditAvatarClick}
                                    cards={cards}
                                    onCardClick={handleCardClick}
                                    onCardLike={handleCardLike}
                                    onCardDelete={handleCardDelete}
                                />
                            </ProtectedRoute>}
                    />
                </Routes>
                <Footer/>
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                >
                </EditProfilePopup>
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                >
                </EditAvatarPopup>
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateCard={handleAddPlaceSubmit}
                >
                </AddPlacePopup>
                <PopupConform
                    //isOpen={isDeletePopupOpen}
                    //isClose={closeAllPopup}
                >
                </PopupConform>
                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                >
                </ImagePopup>
                <InfoTooltip
                    onClose={closeAllPopups}
                    isOpen={isInfoTooltip}
                    isSuccess={isSuccess}
                >
                </InfoTooltip>
            </div>
        </CurrentUserContext.Provider>
    )
};

export default App