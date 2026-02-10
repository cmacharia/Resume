/* ===========================================
   Christopher Macharia Portfolio - Scripts
   =========================================== */

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ===========================================
   Mobile Navigation Toggle
   =========================================== */

function toggleNav() {
  document.getElementById('navHamburger').classList.toggle('open');
  document.getElementById('navLinks').classList.toggle('open');
  document.querySelector('nav').classList.toggle('open');
}

function closeNav() {
  document.getElementById('navHamburger').classList.remove('open');
  document.getElementById('navLinks').classList.remove('open');
  document.querySelector('nav').classList.remove('open');
}

/* ===========================================
   Password Gate
   =========================================== */

function checkPassword() {
  const input = document.getElementById('workPassword');
  const error = document.getElementById('passwordError');

  if (input.value === '2026work') {
    document.getElementById('workGate').style.display = 'none';
    document.getElementById('projectsGrid').classList.add('visible');

    // Initialize scroll animations for project cards after unlock
    if (!prefersReducedMotion) {
      setTimeout(() => {
        const projectCards = document.querySelectorAll('.project-card.reveal');
        projectCards.forEach(card => observer.observe(card));
      }, 100);
    }
  } else {
    error.style.display = 'block';
    input.style.borderColor = '#f87171';
    setTimeout(() => {
      error.style.display = 'none';
      input.style.borderColor = '';
    }, 2500);
  }
}

/* ===========================================
   Contact Form Handler
   =========================================== */

function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const button = form.querySelector('.form-submit');
  const originalText = button.textContent;

  button.textContent = 'Sending...';
  button.disabled = true;

  // Submit form data to Formspree
  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  })
  .then(response => {
    if (response.ok) {
      form.style.display = 'none';
      document.getElementById('formSuccess').style.display = 'block';
      form.reset();
    } else {
      throw new Error('Form submission failed');
    }
  })
  .catch(error => {
    alert('Oops! There was a problem sending your message. Please try again.');
    button.textContent = originalText;
    button.disabled = false;
  });
}

/* ===========================================
   Scroll-Triggered Animations
   =========================================== */

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

// Initialize observers on page load
document.addEventListener('DOMContentLoaded', () => {
  if (!prefersReducedMotion) {
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } else {
    // If reduced motion is preferred, show all elements immediately
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }
});
