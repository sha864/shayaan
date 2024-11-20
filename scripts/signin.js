window.onload = function () {
    const returnToParam = getQueryParam('openid.return_to');
    if (returnToParam === 'SellerDashbord') {
        setupSellerAccount();
    }
};

// Toggle Display for Element
document.getElementById("a1").addEventListener("click", toggleHideSection);

function toggleHideSection(event) {
    event.preventDefault();
    this.classList.toggle('toggled');

    const hideSection = document.getElementById("hide");
    hideSection.style.display = hideSection.style.display === "block" ? "none" : "block";
}

// Get Query Parameter Value
function getQueryParam(param) {
    const params = new URLSearchParams(window.location.search.substring(1));
    return params.get(param);
}

// Setup Seller Account Page
function setupSellerAccount() {
    const signinHeader = document.getElementById("signin_heading");
    const logo = document.getElementById("logo");
    signinHeader.textContent = "Get started selling on Amazon";
    logo.src = "../background_images/amazon_seller.png";
    logo.style.width = "300px";
    logo.style.height = "40px";
}

// Logout Function
function logout() {
    fetch('https://amazon-server-1-27sp.onrender.com/auth1/logout', {
        method: 'POST'
    })
    .then(response => {
        if (response.ok) {
            console.log("Logout successful");
        } else {
            throw new Error("Logout failed");
        }
    })
    .catch(error => console.error("Logout error:", error));
}

// Handle Sign-in Process
function signInHandler() {
    const isSellerDashboard = getQueryParam('openid.return_to') === 'SellerDashbord';
    isSellerDashboard ? setupSellerSignIn() : initiateSignIn();
}

let toastTimeout;
const toast = document.getElementById("toast");

// Close Toast Notification
function closeToast() {
    toast.style.transform = "translateX(445px)";
}

// Setup Seller Sign-in (Placeholder for further actions)
function setupSellerSignIn() {
    console.log("Seller Account Setup Initiated");
}

// User Sign-in
async function initiateSignIn() {
    scrollTo(0, 0);
    toggleLoader(true);

    const email = document.getElementById("emailinput").value;
    const password = document.getElementById("password").value;

    if (isValidEmail(email) && isValidPassword(password)) {
        const loginData = { username: email, password: password };

        try {
            const response = await fetch('https://amazon-server-1-27sp.onrender.com/auth1/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) throw new Error(`Sign-in failed: ${response.statusText}`);

            const data = await response.json();
            storeUserData(data);
            showToast("Login successful", redirectToHome);
        } catch (error) {
            console.error("Sign-in Error:", error);
            alert("Failed to sign in. Please try again.");
        } finally {
            toggleLoader(false);
        }
    } else {
        alert("Invalid email or password.");
    }
}

// Validate Email Format
function isValidEmail(email) {
    const emailPattern = /\S+@\S+\.\S+/;
    return emailPattern.test(email);
}

// Validate Password (Minimum Length)
function isValidPassword(password) {
    return password.length > 5;
}

// Store User Data in Local Storage
function storeUserData(data) {
    localStorage.setItem('jwtToken', JSON.stringify({
        id: data.id,
        username: data.username,
        email: data.email,
        roles: data.roles,
        accessToken: data.accessToken,
        tokenType: data.tokenType
    }));
    setCookie('jwtToken', data.accessToken);
}

// Show Toast Notification
function showToast(message, callback) {
    toast.style.transform = "translateX(-50px)";
    document.getElementById("txt").textContent = message;

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        closeToast();
        if (callback) callback();
    }, 2000);
}

// Redirect to Home Page
function redirectToHome() {
    setTimeout(() => { window.location.href = '../index.html'; }, 500);
}

// Show or Hide Loader
function toggleLoader(isLoading) {
    const container = document.getElementById("container1");
    if (isLoading) {
        container.style.display = "none";
        // Display loader here, if any
    } else {
        container.style.display = "flex";
        // Hide loader here, if any
    }
}
