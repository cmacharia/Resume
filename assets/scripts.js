/* ===========================================
   Christopher Macharia Portfolio - Scripts
   =========================================== */

// Contact Form Handler (index.html)
const contactForm = document.querySelector('[data-contact-form]');
if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const button = form.querySelector('button');
    const originalText = button.textContent;
    
    button.textContent = 'Sending...';
    button.disabled = true;
    
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      
      if (response.ok) {
        form.style.display = 'none';
        document.querySelector('[data-form-success]').classList.add('visible');
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      alert('Oops! There was a problem sending your message. Please try again.');
      button.textContent = originalText;
      button.disabled = false;
    }
  });
}

// Password Gate Handler (work.html)
const passwordForm = document.querySelector('[data-password-form]');
if (passwordForm) {
  const passwordGate = document.querySelector('[data-password-gate]');
  const passwordInput = document.querySelector('[data-password-input]');
  const errorMessage = document.querySelector('[data-error-message]');
  const workContent = document.querySelector('[data-work-content]');

  passwordForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const password = passwordInput.value;
    
    if (password === 'beautifulpixels') {
      passwordGate.style.display = 'none';
      workContent.classList.add('visible');
    } else {
      errorMessage.style.display = 'block';
      passwordInput.value = '';
      passwordInput.focus();
    }
  });
}
