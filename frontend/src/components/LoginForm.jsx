import React, { useState, useEffect } from 'react';
import styles from '../../src/components/style.css';
import { sendOTP, verifyOTP } from "../api.js";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import logo from '../assets/images/techno_logo.png';
import img1 from '../assets/images/img1.png';
import img2 from '../assets/images/img2.png';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [showOTP, setShowOTP] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cooldown, setCooldown] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        let timer;
        if (cooldown > 0) {
            timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [cooldown]);

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await sendOTP(email);
            setShowOTP(true);
            toast.success("OTP sent to your email");
            setCooldown(60); // start cooldown
        } catch (error) {
            toast.error(error.message || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await verifyOTP(email, otp);
            toast.success("OTP verified! Logged in successfully");
            localStorage.setItem("token", data.token); // Store JWT
            navigate("/dashboard");
        } catch (error) {
            toast.error(error.message || "Invalid OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        try {
            await sendOTP(email);
            toast.success("OTP resent to your email");
            setCooldown(60); // reset cooldown
        } catch (error) {
            toast.error("Failed to resend OTP");
        }
    };

    return (
        <div>
            <link rel="stylesheet" href={styles} />

            <section className="header-section">
                <div className="logo-container">
                    <img src={logo} alt="Logo" />
                </div>
            </section>

            <div className="container">
                <div className="tBg">
                    <div className="box signin">
                        <img src={img1} alt="img1" />
                    </div>
                    <div className="box">
                        <h2>Welcome to Techno India Group</h2>
                        <img src={img2} alt="img2" />
                    </div>
                    <div className="form-box w-full md:w-1/2 bg-white p-4 sm:p-6 md:p-8 space-y-3 sm:space-y-4 md:space-y-6">
                        <div className="form loginform">
                            {!showOTP && (
                                <form onSubmit={handleSendOTP} className="space-y-6">
                                    <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-center text-gray-800">Log In</h3>
                                    <div className="entryarea space-y-2">
                                        <label htmlFor="email" className="labelline block text-xs sm:text-sm font-medium text-gray-700">
                                            Enter Email/Ph no.
                                        </label>
                                        <input
                                            type="text"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                                            required
                                        />
                                    </div>
                                    <input type="submit" value={loading ? "Sending..." : "Send OTP"} />
                                </form>
                            )}

                            {showOTP && (
                                <form onSubmit={handleVerifyOTP} className="space-y-6">
                                    <div className="entryarea space-y-2">
                                        <div htmlFor="otp" className="block labelline text-xs sm:text-sm font-medium text-gray-700">
                                            Enter OTP
                                        </div>
                                        <input
                                            type="text"
                                            id="otp"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                                            maxLength={6}
                                            required
                                        />
                                    </div>

                                    <div className="submit-btn text-center mt-2 flex items-center justify-center gap-4">
                                        <button
                                            type="submit"
                                            className="submit-btn bg-red-500 text-white  rounded-lg font-semibold hover:bg-red-600 transition duration-300 flex items-center justify-center gap-2 text-sm"
                                        >
                                            {loading ? "Verifying..." : "Verify OTP"}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={handleResendOTP}
                                            disabled={cooldown > 0}
                                            className={`text-sm font-medium rounded-lg ${cooldown > 0
                                                ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                                                : "bg-blue-500 text-white hover:bg-blue-600"
                                                }`}
                                            style={{
                                                whiteSpace: "nowrap", // Prevent text wrapping
                                                minWidth: "150px", // Set a minimum width to accommodate the text
                                            }}
                                        >
                                            {cooldown > 0 ? `Resend OTP in ${cooldown}s` : "Resend OTP"}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
