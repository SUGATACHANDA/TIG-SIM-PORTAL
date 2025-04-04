/* eslint-disable no-unused-vars */
const sendOtpBtn = document.querySelector('.loginform input[type="submit"]');
const formbox = document.querySelector('.form-box');
const body = document.querySelector('.background');

// otp page transition
sendOtpBtn.onclick = function (event) {
    event.preventDefault();
    if (validateInput()) {
        formbox.classList.add('active');
        body.classList.add('active');
    }
};


//Validate email/phone no.
function validateInput() {
    const input = document.querySelector('.loginform input[type="text"]');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;

    if (!emailPattern.test(input.value) && !phonePattern.test(input.value)) {
        console.log("Invalid email or phone number");
        showError(`<i class="fa-solid fa-circle-exclamation"></i> Enter Valid Email/Ph no.`, input);
        return false;
    } else {
        console.log("Valid email/ph no.");
        clearError(input);
        return true;
    }
}

// login error message show 
function showError(message, input) {
    clearError(input);

    let errorBox = document.createElement('div');
    errorBox.classList.add('error-msg');
    errorBox.innerHTML = message;

    input.classList.add('invalid');
    input.parentNode.insertBefore(errorBox, input.nextSibling);

    input.addEventListener('input', () => clearError(input), { once: true });
}
// clear login error message
function clearError(input) {
    const errorBox = input.parentNode.querySelector('.error-msg');
    if (errorBox) {
        errorBox.remove();
    }
    input.classList.remove('invalid');
}


document.addEventListener("DOMContentLoaded", function () {
    let countdown = 60;
    let timer = null; // To track the interval
    let resendOtpBtn = document.getElementById("resend");
    let sendOtpBtn = document.querySelector("input[type='submit'][value='Send OTP']");

    function startTimer() {
        resendOtpBtn.disabled = true;
        resendOtpBtn.textContent = `Resend in ${countdown}s`;

        timer = setInterval(() => {
            countdown--;
            resendOtpBtn.textContent = `Resend in ${countdown}s`;

            if (countdown <= 0) {
                clearInterval(timer);
                timer = null;
                resendOtpBtn.disabled = false;
                resendOtpBtn.textContent = "Resend OTP";
            }
        }, 1000);
    }

    sendOtpBtn.addEventListener("click", function (event) {
        event.preventDefault();

        if (timer !== null) {
            clearInterval(timer);
        }

        countdown = 60;
        startTimer();
    });

    resendOtpBtn.addEventListener("click", function (event) {
        event.preventDefault();

        if (timer !== null) {
            clearInterval(timer);
        }

        countdown = 60;
        startTimer();
    });
});


// Validate OTP
function validateOTP(event) {
    event.preventDefault(); // Prevent page navigation or form submission

    const otpInput = document.querySelector('.signupform input[type="number"]'); // Select OTP input field
    const otpPattern = /^[0-9]{6}$/; // Assuming OTP is a 6-digit number

    if (!otpPattern.test(otpInput.value)) {
        console.log("Invalid OTP");
        showError(`<i class="fa-solid fa-circle-exclamation"></i> Invalid OTP. Please try again.`, otpInput);
        return false;
    } else {
        console.log("Valid OTP");
        clearError(otpInput);
        // Proceed with form submission or next step (replace with your actual logic)
        alert("OTP Verified Successfully!");
        return true;
    }
}

