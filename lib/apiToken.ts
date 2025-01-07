// lib/tokenHandler.js

import axios from 'axios';

let token:string|null = null;
let tokenExpiration:number|null = null; // Timestamp for token expiration

export async function getTemporaryToken() {
    // Check if token exists and is not expired
    if (token && tokenExpiration && Date.now() < tokenExpiration) {
        return token;
    }

    // Fetch a new token
    const response = await axios.get('https://joinium.tgfen.com/api/v1/auth/getToken');
    token = response.data.data.token;
    tokenExpiration = Date.now() + response.data.expires_in * 1000; // Set expiration time in milliseconds

    return token;
}

export async function refreshToken(token:string = '') {
    // Call your API's refresh endpoint
    const response = await axios.post('https://joinium.tgfen.com/api/v1/auth/refresh', {
        access_token: token,
    });

    token = response.data.token;
    tokenExpiration = Date.now() + response.data.expires_in * 1000;

    return token;
}