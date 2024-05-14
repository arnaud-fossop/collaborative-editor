const fetch = require('fetch-retry')(global.fetch);

const RETRY_DELAY = process.env.REACT_APP_API_RETRY_DELAY | 1000;
const RETRIES = process.env.REACT_APP_API_RETRIES | 3;

const retryOptions = {
    retries: RETRIES,
    retryDelay: (attempt, error, response) => {
        return Math.pow(2, attempt) * RETRY_DELAY;
    }
}

const runCode = (language, code) => {
    return fetch(process.env.REACT_APP_BACKEND_URL + "/run",
        {
            ...retryOptions,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                language: language,
                code: code,
            })
        }
    )
        .then((res) => res.json())
        .then((data) => data.output)
}

const login = (username, password) => {
    return fetch(process.env.REACT_APP_BACKEND_URL + "/login",
        {
            ...retryOptions,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        }
    )
        .then((res) => res.json())
}

module.exports = {
    runCode: runCode,
    login: login
}