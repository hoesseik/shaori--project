// --- SELECTIE VAN ELEMENTEN ---
// Signup Formulier
const signupForm = document.getElementById('signup-form');
const signupButton = document.getElementById('signup-button');
const signupMessageBox = document.getElementById('message-box');

// Contact Formulier
const contactForm = document.getElementById('contact-form');
const contactButton = document.getElementById('contact-button');
const contactMessageBox = document.getElementById('contact-message-box');

// --- HULPFUNCTIE: VALIDATIE ---
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// --- 1. SIGNUP LOGICA ---
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const emailField = document.getElementById('email-input');
        const emailValue = emailField ? emailField.value.trim() : "";

        // Validatie
        if (!emailValue || !validateEmail(emailValue)) {
            signupMessageBox.style.display = "block";
            signupMessageBox.style.color = "#dc3545";
            signupMessageBox.innerText = "Voer a.u.b. een geldig e-mailadres in.";
            return;
        }

        // Visuele feedback
        signupButton.disabled = true;
        signupButton.innerText = "Bezig...";
        signupMessageBox.style.display = "none";

        try {
            const response = await fetch("https://shaori-project.onrender.com/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: emailValue }),
            });

            const data = await response.json();
            signupMessageBox.style.display = "block";
            signupMessageBox.style.color = response.ok ? "#28a745" : "#dc3545";
            signupMessageBox.innerText = data.message || "Er ging iets mis.";

            if (response.ok) signupForm.reset();
        } catch (err) {
            signupMessageBox.style.display = "block";
            signupMessageBox.style.color = "#dc3545";
            signupMessageBox.innerText = "Server onbereikbaar.";
        } finally {
            signupButton.disabled = false;
            signupButton.innerText = "Aanmelden";
        }
    });
}

// --- 2. CONTACT LOGICA ---
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const message = document.getElementById('contact-message').value.trim();

        // Validatie
        if (!name || !email || !message || !validateEmail(email)) {
            contactMessageBox.style.display = "block";
            contactMessageBox.style.color = "#dc3545";
            contactMessageBox.innerText = "Vul alle velden correct in.";
            return;
        }

        // Visuele feedback
        contactButton.disabled = true;
        contactButton.innerText = "Verzenden...";
        contactMessageBox.style.display = "none";

        try {
            const response = await fetch("https://shaori-project.onrender.com/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });

            const data = await response.json();
            contactMessageBox.style.display = "block";
            contactMessageBox.style.color = response.ok ? "#28a745" : "#dc3545";
            contactMessageBox.innerText = data.message || "Bericht verzonden!";

            if (response.ok) contactForm.reset();
        } catch (err) {
            contactMessageBox.style.display = "block";
            contactMessageBox.style.color = "#dc3545";
            contactMessageBox.innerText = "Fout bij verzenden.";
        } finally {
            contactButton.disabled = false;
            contactButton.innerText = "Verstuur";
        }
    });
}