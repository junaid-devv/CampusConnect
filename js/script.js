// ===== CampusConnect - JavaScript =====

// --- Mobile Navigation Toggle ---
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('nav ul');

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('show');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('nav ul li a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navMenu.classList.remove('show');
      });
    });
  }

  // --- Active Navigation Link ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav ul li a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // --- Contact Form Validation ---
  const form = document.getElementById('enquiryForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let isValid = true;

      // Clear previous errors
      document.querySelectorAll('.form-group').forEach(function (group) {
        group.classList.remove('error');
      });

      // Validate Name
      const name = document.getElementById('name');
      if (name && name.value.trim().length < 2) {
        showError(name, 'Please enter your full name (at least 2 characters).');
        isValid = false;
      }

      // Validate Email
      const email = document.getElementById('email');
      if (email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value.trim())) {
          showError(email, 'Please enter a valid email address.');
          isValid = false;
        }
      }

      // Validate Subject
      const subject = document.getElementById('subject');
      if (subject && subject.value === '') {
        showError(subject, 'Please select a subject.');
        isValid = false;
      }

      // Validate Message
      const message = document.getElementById('message');
      if (message && message.value.trim().length < 10) {
        showError(message, 'Please enter a message (at least 10 characters).');
        isValid = false;
      }

      // If all valid, show success
      if (isValid) {
        const successMsg = document.querySelector('.success-message');
        if (successMsg) {
          successMsg.classList.add('show');
          successMsg.textContent =
            '✅ Thank you, ' +
            name.value.trim() +
            '! Your enquiry has been submitted successfully. We will get back to you soon.';
        }
        form.reset();

        // Hide success message after 5 seconds
        setTimeout(function () {
          successMsg.classList.remove('show');
        }, 5000);
      }
    });
  }

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Counter Animation for Stats ---
  const counters = document.querySelectorAll('.stat-item h3');
  if (counters.length > 0) {
    const animateCounters = function () {
      counters.forEach(function (counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        if (isNaN(target)) return;
        const increment = Math.ceil(target / 80);
        let current = 0;

        const updateCounter = function () {
          current += increment;
          if (current >= target) {
            counter.textContent = target.toLocaleString() + (counter.dataset.suffix || '');
          } else {
            counter.textContent = current.toLocaleString() + (counter.dataset.suffix || '');
            requestAnimationFrame(updateCounter);
          }
        };

        updateCounter();
      });
    };

    // Use Intersection Observer to trigger animation when visible
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCounters();
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      observer.observe(statsSection);
    }
  }
});

// --- Helper: Show Error ---
function showError(input, message) {
  const formGroup = input.closest('.form-group');
  if (formGroup) {
    formGroup.classList.add('error');
    const errorMsg = formGroup.querySelector('.error-msg');
    if (errorMsg) {
      errorMsg.textContent = message;
    }
  }
}
