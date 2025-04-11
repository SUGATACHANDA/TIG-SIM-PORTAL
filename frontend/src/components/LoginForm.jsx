import React, { useState, useEffect } from "react";

import { sendOTP, verifyOTP } from "../api.js";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import logo from "../assets/images/techno_logo.png";
import img1 from "../assets/images/img1.png";
import img2 from "../assets/images/img2.png";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [showOTP, setShowOTP] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cooldown, setCooldown] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            navigate("/dashboard");
        } else {
            navigate("/");
        }
    }, [navigate]);

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
            toast.success(`OTP sent to ${email}`);
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
        <div className="login">
            {/* <link rel="stylesheet" href={styles} /> */}
            <style>
                {`
.login {
    background-size: cover;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.login::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: inherit; 
    filter: blur(2px); 
    z-index: -1; 
}

.login.active {
    background: #353232c6;
}

.header-section {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 30vh; 
    background: #ef2227;
    border-bottom-left-radius: 50% 30%;
    border-bottom-right-radius: 50% 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1; 
}

.logo-container img {
    width: 150px; 
    height: auto;
}

.container {
    position: relative;
    width: 800px;
    height: 500px;
    margin: 20px;
} 


.tBg {
    position: absolute;
    top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 420px;
    background: rgba(255,255,255, 0.2);
    border-radius: 10% 7% / 10% 7%;
    backdrop-filter: blur(10px);
}

.tBg .box {
    position: relative;
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.box h2 {
    color: black;
    font-size: 1.2em;
    font-family: '';
    margin-bottom: 10px;
}

.box img {
    width: 200px; 
    height: auto;
    display: block;
}


.form-box {
    position: absolute;
    background: #fcfbfb;
    height: 100%;
    width: 50%;
    top: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 5px 45px rgba(0,0,0,0.25);
    transition: ease-in-out .5s;
    overflow: hidden;
    border-bottom-left-radius: 10% 7% ;
    border-top-left-radius: 10% 7%;
}

.form-box.active {
    left: 50%;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 10% 7%;
    border-bottom-right-radius: 10% 7%;

}

.form-box .form {
    position: absolute;
    width: 100%;
    transition: 0.5s;
    padding: 40px;
    box-sizing: border-box;
}

.form-box .loginform {
    transition-delay: 0.25s;
}

.form-box.active .loginform {
    left: -100%;
    transition-delay: 0;
}

.form-box .signupform {
    left: 100%;
    transition-delay: 0;
}

.form-box.active .signupform {
    left: 0%;
    transition-delay: 0.25s;
}

.form-box .form form  {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    flex-direction: column;
}

.form form input {
    width: 100%;
    max-width: 300px;
    margin-bottom: 20px;
    padding: 10px;
    outline: none;
    border: 1px solid #333;
} 


.entryarea {
    position: relative;
    width: 100%;
    max-width: 300px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.entryarea input[type="text"], input[type="number"] {

    border-radius: 5px;
    
}

.entryarea input[type="text"]:focus ,input[type="number"]:focus {
    border-color: #f82a2ec7;
}
.entryarea input[type="text"].invalid, input[type="number"].invalid {
    border-color: #db0f13;
    border-width: 2px;
}

.entryarea input[type="text"].invalid + .labelline {
    color: #db0f13;
}
.entryarea input[type="number"].invalid + .labelline {
    color: #db0f13;
}


.labelline {
    position: absolute;
    top: -10px;
    left: 10px;
    font-size: 14px;
    color: #000;
    background-color: #fcfbfb;
    padding: 0 5px;
    transition: color 0.3s ease;
}


@media (max-width: 356px)  {
    .labelline {
        font-size: 8px !important; 
    }
}


@media (max-width: 470px) {
    .entryarea input[type="text"] {
        font-size: 10px;
    }
    .labelline {
        top: -7px;
        left: -12px;
        font-size: 10px;
    }
    .submit-btn {
        flex-direction: column; 
        gap: 10px; 
        align-items: center; 
    }
}


.form form h3 {
    text-align: center;
    font-size: 1.5em;
    font-weight: 500;
    margin-bottom: 20px;
}

.form form p {
    color: #333;
    font-style: italic;
    font-size: 14px;
}

.form form a {
    font-style: normal;
    font-size: 15px;
    color: #780606;
}

.form form input[type="submit"]{
    background: #db0f13;
    border: none;
    border-radius: 20px;
    max-width: 100px;
    color: #fff;
    cursor: pointer;
}

button {
    background: #db0f13;
    border: none;
    border-radius: 20px;
    max-width: 100px;
    color: #fff;
    cursor: pointer;
    padding: 8px 12px;
}

#resend {
    font-size: -5px;
}
.error-msg {
    font-size: 14px;
    color: #db0f13;
    margin-top: 5px;
    margin-bottom: 5px;
    font-weight: 500;
}

.submit-btn {
    display: flex;
    gap: 10px;
}

.submit-btn {
    display: flex;
    gap: 10px;
}

.submit-btn input[type="submit"], 
#resend {
    width: 100%;
    max-width: 100px;  
    height: 40px;  
    background: #db0f13;
    border: none;
    border-radius: 20px;
    color: #fff;
    cursor: pointer;
    text-align: center;
    padding: 8px 12px;
    white-space: nowrap;
    display: flex;
    justify-content: center;
    align-items: center;
}

#resend:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}
                `}
            </style>

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
                    <div className="w-1/2 h-full flex flex-col justify-center items-center">
                        <h2 className="text-black text-[1.2em] mb-3 text-center">
                            Welcome to Techno India Group
                        </h2>
                        <img src={img2} alt="img2" className="w-[200px] h-auto" />
                    </div>
                    <div className="form-box w-full md:w-1/2 bg-white p-4 sm:p-6 md:p-8 space-y-3 sm:space-y-4 md:space-y-6">
                        <div className="form loginform">
                            {!showOTP && (
                                <form onSubmit={handleSendOTP} className="space-y-6">
                                    <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-center text-gray-800">
                                        Log In
                                    </h3>
                                    <div className="entryarea space-y-2">
                                        <label
                                            htmlFor="email"
                                            className="labelline block text-xs sm:text-sm font-medium text-gray-700"
                                        >
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
                                    <input
                                        type="submit"
                                        value={loading ? "Sending..." : "Send OTP"}
                                    />
                                </form>
                            )}

                            {showOTP && (
                                <form onSubmit={handleVerifyOTP} className="space-y-6">
                                    <div className="entryarea space-y-2">
                                        <div
                                            htmlFor="otp"
                                            className="block labelline text-xs sm:text-sm font-medium text-gray-700"
                                        >
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
                                            {cooldown > 0
                                                ? `Resend OTP in ${cooldown}s`
                                                : "Resend OTP"}
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
