/* eslint-disable no-unused-vars */
import axios from "axios";
const API_URL = "https://tig-sim-portal-backend.vercel.app"

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