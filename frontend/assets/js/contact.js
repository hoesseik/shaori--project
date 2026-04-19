document.addEventListener("DOMContentLoaded", () => {
  console.log("Shaori Forms geladen!");

  // --- 1. CONTACT FORMULIER LOGICA ---
  const contactForm = document.getElementById("contactForm");
  const contactResponse = document.getElementById("contactResponse");
  const contactBtn = document.getElementById("contactBtn");

  let isSubmittingContact = false;

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Voorkom dubbel verzenden
      if (isSubmittingContact) return;

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        contactResponse.textContent = "Vul alle velden in.";
        contactResponse.style.color = "red";
        return;
      }

      // Start verzenden
      isSubmittingContact = true;
      contactBtn.disabled = true;
      contactBtn.innerText = "Bezig...";
      contactResponse.textContent = "Bericht wordt verzonden...";
      contactResponse.style.color = "#555";

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        });

        const result = await response.json();

        if (response.ok) {
          contactResponse.textContent = "✅ Bericht succesvol verzonden!";
          contactResponse.style.color = "green";
          contactForm.reset();
        } else {
          contactResponse.textContent = "❌ " + (result.message || "Er ging iets mis.");
          contactResponse.style.color = "red";
        }
      } catch (err) {
        console.error("Fout:", err);
        contactResponse.textContent = "❌ Kan geen verbinding maken met de server.";
        contactResponse.style.color = "red";
      } finally {
        // Na een korte pauze de knop weer aanzetten
        setTimeout(() => {
          isSubmittingContact = false;
          contactBtn.disabled = false;
          contactBtn.innerText = "Verstuur";
        }, 2000);
      }
    });
  }

  // --- 2. NIEUWSBRIEF FORMULIER LOGICA ---
  const signupForm = document.getElementById("signupForm");
  const signupResponse = document.getElementById("signupResponse");
  const signupBtn = document.getElementById("signupBtn");

  let isSubmittingSignup = false;

  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (isSubmittingSignup) return;

      const email = document.getElementById("signupEmail").value.trim();

      if (!email) {
        signupResponse.textContent = "Vul een e-mailadres in.";
        signupResponse.style.color = "red";
        return;
      }

      isSubmittingSignup = true;
      signupBtn.disabled = true;
      signupBtn.innerText = "Laden...";

      try {
        const response = await fetch("/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const result = await response.json();

        if (response.ok) {
          signupResponse.textContent = "✅ Je bent aangemeld!";
          signupResponse.style.color = "green";
          signupForm.reset();
        } else {
          signupResponse.textContent = "❌ " + result.message;
          signupResponse.style.color = "red";
        }
      } catch (err) {
        signupResponse.textContent = "❌ Verbindingsfout.";
        signupResponse.style.color = "red";
      } finally {
        setTimeout(() => {
          isSubmittingSignup = false;
          signupBtn.disabled = false;
          signupBtn.innerText = "Aanmelden";
        }, 2000);
      }
    });
  }

  // --- 3. JAARTAL IN FOOTER ---
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});


