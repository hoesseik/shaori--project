document.addEventListener("DOMContentLoaded", () => {
  console.log("signup.js geladen!");   // ← bevestigt dat signup.js draait

  const form = document.getElementById("signupForm");
  const responseMessage = document.getElementById("signupResponse");

  console.log("signupForm gevonden?", form); // ← check of formulier bestaat

  if (!form) {
    console.warn("signupForm niet gevonden — script gestopt.");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("SIGNUP SUBMIT TRIGGERED"); // ← bevestigt dat submit werkt

    const emailField = document.getElementById("signupEmail");
    console.log("signupEmail gevonden?", emailField); // ← check input

    const email = emailField.value.trim();
    console.log("Ingevoerde email:", email); // ← toont email

    if (!email) {
      responseMessage.textContent = "Vul een geldig e‑mailadres in.";
      responseMessage.style.color = "red";
      return;
    }

    responseMessage.textContent = "Bezig met aanmelden...";
    responseMessage.style.color = "#555";

    try {
      console.log("Verstuur signup request naar /api/signup...");

      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      console.log("HTTP status:", response.status); // ← toont 200, 409, etc.

      const result = await response.json();
      console.log("Signup response JSON:", result); // ← toont backend message

      if (response.ok) {
        responseMessage.textContent = "Je bent aangemeld! Bedankt 🙌";
        responseMessage.style.color = "green";
        form.reset();
      } else {
        responseMessage.textContent = result.message || "Er ging iets mis.";
        responseMessage.style.color = "red";
      }
    } catch (err) {
      console.error("Signup fout:", err);
      responseMessage.textContent = "Kan geen verbinding maken met de server.";
      responseMessage.style.color = "red";
    }
  });
});

