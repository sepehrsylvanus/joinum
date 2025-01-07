import axios from 'axios';

const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vam9pbml1bS50Z2Zlbi5jb20vYXBpL3YxL2F1dGgvZ2V0VG9rZW4iLCJpYXQiOjE3MzQ2OTg2NDUsImV4cCI6MTczNDkxNDY0NSwibmJmIjoxNzM0Njk4NjQ1LCJqdGkiOiJYTTFEMXBickdIUWM3RkpsIiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.w1qvXsZcdNsX371CGMRUMFqXPMMnZ3LUodtatX5C9Ig`;
const apiClient = axios.create({
    baseURL: 'https://joinium.tgfen.com',
    timeout: 5000, // 5 seconds timeout
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Secure API key
    },
});

export default apiClient;
