class Api {
    constructor(data) {
        this._url = data.url;
        this._headers = data.headers
    }

    getInitialCards(token) {
        return fetch(`${this._url}/cards`, {
            method:"GET",
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then(this._checkResponse);
    }

    setUpdateCard(data) {
        return fetch(`${this._url}/cards`, {
            method:"POST",
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name:data.name,
                link:data.link
            })
        }).then(this._checkResponse);
    }

    getInitialUser(token) {
        return fetch(`${this._url}/users/me`, {
            method:"GET",
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then(this._checkResponse);
    }

    setUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method:"PATCH",
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            })
        }).then(this._checkResponse);
    }

    setUserAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method:"PATCH",
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                avatar: data.avatar
            })
        }).then(this._checkResponse);
    }

    deleteCard(id){
        return fetch(`${this._url}/cards/${id}`, {
            method:"DELETE",
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            }
        }).then(this._checkResponse);
    }

    changeLikeCardStatus(id, isLiked) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: `${!isLiked ? "DELETE" : "PUT"}`,
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            }
        }).then(this._checkResponse);
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

}
const api = new Api({
    url: "http://backend.bender.mesto.nomoredomains.sbs",
});

export default api;