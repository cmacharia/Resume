/* ===========================================
   Christopher Macharia Portfolio - Scripts
   =========================================== */

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ===========================================
   Page Transitions
   =========================================== */

if (!prefersReducedMotion) {
  // Fade in on page load
  document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('page-entering');

    // Remove class after animation completes
    setTimeout(() => {
      document.body.classList.remove('page-entering');
    }, 400);
  });

  // Fade out when navigating to internal links
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');

    if (link &&
        link.href &&
        link.href.startsWith(window.location.origin) &&
        !link.href.includes('#') &&
        !link.hasAttribute('target') &&
        !e.ctrlKey && !e.metaKey && !e.shiftKey) {

      e.preventDefault();
      const destination = link.href;

      document.body.classList.add('page-transitioning');

      setTimeout(() => {
        window.location.href = destination;
      }, 250);
    }
  });
}

/* ===========================================
   Scroll-Triggered Animations
   =========================================== */

if (!prefersReducedMotion) {
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
      animationObserver.observe(el);
    });
  });
}

/* ===========================================
   Contact Form Handler (index.html)
   =========================================== */

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

    if (password === '2026work') {
      passwordGate.style.display = 'none';
      workContent.classList.add('visible');

      // Initialize scroll animations for project cards after password unlock
      if (!prefersReducedMotion) {
        const projectObserverOptions = {
          root: null,
          rootMargin: '0px 0px -50px 0px',
          threshold: 0.1
        };

        const projectObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        }, projectObserverOptions);

        // Small delay to let the page-header animation start first
        setTimeout(() => {
          const projects = document.querySelectorAll('.project.animate-on-scroll');
          projects.forEach(project => {
            projectObserver.observe(project);
          });
        }, 100);
      }
    } else {
      errorMessage.style.display = 'block';
      passwordInput.value = '';
      passwordInput.focus();
    }
  });
}
