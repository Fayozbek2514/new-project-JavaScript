document.addEventListener("DOMContentLoaded", function () {
    // Show modal function
    function showModal(modal) {
        modal.style.display = "flex";
    }
    
    // Close modal function
    function closeModal(modal) {
        modal.style.display = "none";
    }
    
    // Cart Modal
    const cartBtn = document.querySelector(".cart");
    const cartModal = document.createElement("div");
    cartModal.classList.add("modal");
    cartModal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Enter Card Details</h2>
            <input type="text" id="card-name" placeholder="Cardholder Name" required>
            <input type="text" id="card-number" placeholder="Card Number" maxlength="19" required>
            <input type="text" id="expiry-date" placeholder="MM/YY" maxlength="5" required>
            <button id="submit-card">Submit</button>
            <p id="card-error" class="error-msg"></p>
        </div>
    `;
    document.body.appendChild(cartModal);
    
    cartBtn.addEventListener("click", () => showModal(cartModal));
    cartModal.querySelector(".close").addEventListener("click", () => closeModal(cartModal));
    
    // Auto format card number
    document.getElementById("card-number").addEventListener("input", function (e) {
        let value = e.target.value.replace(/\D/g, "").substring(0, 16);
        value = value.match(/.{1,4}/g)?.join(" ") || "";
        e.target.value = value;
    });
    
    // Auto format expiry date
    document.getElementById("expiry-date").addEventListener("input", function (e) {
        let value = e.target.value.replace(/\D/g, "").substring(0, 4);
        if (value.length > 2) {
            value = value.slice(0, 2) + "/" + value.slice(2);
        }
        e.target.value = value;
    });
    
    // Validate card details
    document.getElementById("submit-card").addEventListener("click", function () {
        const cardNumber = document.getElementById("card-number").value.replace(/\s/g, "");
        const expiryDate = document.getElementById("expiry-date").value;
        const cardName = document.getElementById("card-name").value.trim();
        const errorMsg = document.getElementById("card-error");
        
        if (cardNumber.length !== 16 || !/\d{16}/.test(cardNumber)) {
            errorMsg.textContent = "Invalid card number.";
        } else if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
            errorMsg.textContent = "Invalid expiry date.";
        } else if (cardName === "") {
            errorMsg.textContent = "Cardholder name is required.";
        } else {
            alert("Card details submitted successfully!");
            closeModal(cartModal);
        }
    });
    
    // Login Modal
    const loginBtn = document.querySelector(".login");
    const loginModal = document.createElement("div");
    loginModal.classList.add("modal");
    loginModal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Login</h2>
            <input type="email" id="login-email" placeholder="Email" required>
            <input type="password" id="login-password" placeholder="Password" required>
            <button id="submit-login">Login</button>
            <p id="login-error" class="error-msg"></p>
        </div>
    `;
    document.body.appendChild(loginModal);
    
    loginBtn.addEventListener("click", () => showModal(loginModal));
    loginModal.querySelector(".close").addEventListener("click", () => closeModal(loginModal));
    
    // Validate login
    document.getElementById("submit-login").addEventListener("click", function () {
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;
        const errorMsg = document.getElementById("login-error");
        
        if (!email.includes("@") || email.length < 5) {
            errorMsg.textContent = "Invalid email address.";
        } else if (password.length < 6) {
            errorMsg.textContent = "Password must be at least 6 characters.";
        } else {
            alert("Login successful!");
            closeModal(loginModal);
        }
    });

    // Get Quote & Learn More buttons
    document.getElementById("quote-btn").addEventListener("click", function () {
        alert("Quote request submitted successfully!");
    });

    document.getElementById("learn-btn").addEventListener("click", function () {
        alert("Redirecting to more information...");
    });

    // Email Subscription Validation
    document.querySelector(".subscribe-btn").addEventListener("click", function () {
        const emailInput = document.querySelector(".subscription input");
        const feedback = document.createElement("p");
        feedback.classList.add("error-msg");
        
        if (!emailInput.value.includes("@") || emailInput.value.length < 5) {
            feedback.textContent = "Invalid email address.";
            feedback.style.color = "red";
        } else {
            feedback.textContent = "Subscription successful!";
            feedback.style.color = "green";
        }
        
        const existingMsg = document.querySelector(".subscription .error-msg");
        if (existingMsg) {
            existingMsg.remove();
        }
        
        document.querySelector(".subscription").appendChild(feedback);
    });
});

