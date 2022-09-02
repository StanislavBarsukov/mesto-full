export const BASE_URL = "https://backend.bender.mesto.nomoredomains.sbs";

const checkResponse = (response) => {
    return response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`)
};

const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
};

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers,
        body: JSON.stringify({password, email})
    })
        .then(checkResponse)
};

export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers,
        body: JSON.stringify({password, email})
    })
        .then(checkResponse)
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            "Authorization" : `Bearer ${token}`,
            headers,
        },
    })
        .then(checkResponse)
};