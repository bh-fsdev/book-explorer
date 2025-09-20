import axios from 'axios';

// Use Vite environment variables (must be prefixed with VITE_)
const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:3000'

const apiClient = axios.create({
    baseURL: baseUrl,
    timeout: 10000, 
    headers: {
        'Content-Type': 'application/json',
    }
})

const get = async (endpoint, params = {}) => {
    try {
        const response = await apiClient.get(endpoint, { params });
        // console.log(response);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || error.message,
        };
    }
}

export const booksApi={
    getAll:(params)=>get('/books',params),
    getById:(id)=>get(`/books/${id}`),
    
}