import React, { useState } from "react";
import { sendOTP, verifyOTP } from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const handleSendOTP = async () => {
        setLoading(true);
        try {
            await sendOTP(email);
            toast.success("OTP sent to your email");
            setStep(2);
        } catch (error) {
            toast.error(error.message || "Failed to send OTP");
        }
        setLoading(false);
    };

    const handleVerifyOTP = async () => {
        setLoading(true);
        try {
            const data = await verifyOTP(email, otp);
            toast.success("OTP verified! Logged in successfully");
            localStorage.setItem("token", data.token); // Store JWT
            setStep(3);
        } catch (error) {
            toast.error(error.message || "Invalid OTP");
        }
        setLoading(false);
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
            {step === 1 && (
                <>
                    <h2>Login with Email</h2>
                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button onClick={handleSendOTP} disabled={loading}>
                        {loading ? "Sending..." : "Send OTP"}
                    </button>
                </>
            )}

            {step === 2 && (
                <>
                    <h2>Enter OTP</h2>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                    <button onClick={handleVerifyOTP} disabled={loading}>
                        {loading ? "Verifying..." : "Verify OTP"}
                    </button>
                </>
            )}

            {step === 3 && <h2>✅ Successfully Logged In</h2>}
        </div>
    );
};

export default AuthForm;
