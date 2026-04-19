<?php include 'header.php'; ?>

<!-- HERO -->
<section class="hero">
  <div>
    <p class="hero-label">GEFERMENTEERD RIJSTWATER – CHINESE TRADITIE</p>
    <h1>Shaori komt eraan.</h1>
    <p class="hero-text">
      Luxueuze haarverzorging, geworteld in eeuwenoude rituelen. Binnenkort beschikbaar als premium shampoo‑lijn.
    </p>
  </div>

  <div class="hero-image"></div>
</section>

<!-- ABOUT -->
<section class="about" id="over">
  <div class="about-inner">
    <h2>Wat is Shaori?</h2>
    <p>
      Shaori is een premium haarverzorgingsmerk in ontwikkeling. Onze eerste shampoo‑formule wordt zorgvuldig ontwikkeld en getest op basis van traditionele Chinese wijsheid.
    </p>
  </div>
</section>

<!-- CONTACT -->
<section class="contact" id="contact">
  <div class="contact-inner">
    <h2>Contact</h2>
    <p>Heb je vragen of wil je met Shaori samenwerken? Laat het ons weten.</p>

    <form id="contactForm" novalidate>
      <div class="field-group">
        <input type="text" id="name" placeholder="Naam" required>
      </div>

      <div class="field-group">
        <input type="email" id="email" placeholder="E‑mail" required>
      </div>

      <div class="field-group">
        <textarea id="message" rows="5" placeholder="Bericht" required></textarea>
      </div>

      <button type="submit" id="contactBtn">Verstuur</button>
      <p id="contactResponse" class="response"></p>
    </form>
  </div>
</section>

<!-- SIGNUP -->
<section class="signup">
  <div class="signup-inner">
    <h2>Blijf op de hoogte</h2>
    <p>Ontvang een melding zodra Shaori officieel lanceert.</p>

    <form id="signupForm" novalidate>
      <div class="field-group">
        <input type="email" id="signupEmail" placeholder="Jouw e‑mailadres" required>
      </div>

      <button type="submit" id="signupBtn">Aanmelden</button>
      <p id="signupResponse" class="response"></p>
    </form>
  </div>
</section>

<?php include 'footer.php'; ?>

<!-- Scripts -->
<script src="/assets/js/main.js"></script>
<script src="/assets/js/contact.js"></script>
<script src="/assets/js/signup.js"></script>


