/* eslint-disable no-unused-vars */
import axios from "axios";
const API_URL = "https://tig-sim-portal-backend.vercel.app"; // Replace with your API URL
// const API_URL = "http://localhost:5000"; // Replace with your API URL

export const sendOTP = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/send-otp`, { email });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const verifyOTP = async (email, otp) => {
    try {
        const response = await axios.post(`${API_URL}/verify-otp`, { email, otp });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const verifyToken = async (token) => {
    try {
        const res = await axios.post(`${API_URL}/verify-token`, { token });
        return res.data;
    } catch (error) {
        console.log("Token verification failed:", error);
        throw error;
    }
};

export const requestEditProfile = async (email, requestText) => {
    try {
        const res = await axios.post(`${API_URL}/request-edit`, {
            email,
            request: requestText,
        });
        return res.data;
    } catch (error) {
        console.log("Request Edit failed:", error);
        throw error;
    }
};

export const logoutUser = async (email) => {
    try {
        const res = await axios.post(`${API_URL}/logout`, { email });
        return res.data;
    } catch (err) {
        console.error(err);
    }
};