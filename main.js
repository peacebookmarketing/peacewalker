/* =============================================
   PEACE WALKER
   Premium Book Marketing
   Main JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* -------------------------------------------
     1. MOBILE NAVIGATION TOGGLE
     ------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-link, .nav-cta');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');

      const isExpanded = navLinks.classList.contains('active');
      hamburger.setAttribute('aria-expanded', isExpanded);
      document.body.style.overflow = isExpanded ? 'hidden' : '';
    });

    // Close menu on link click
    navItems.forEach(function (item) {
      item.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
      if (
        navLinks.classList.contains('active') &&
        !navLinks.contains(event.target) &&
        !hamburger.contains(event.target)
      ) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /* -------------------------------------------
     2. NAVBAR SCROLL EFFECT
     ------------------------------------------- */
  const navbar = document.getElementById('navbar');

  if (navbar) {
    function handleScroll() {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* -------------------------------------------
     3. ACTIVE NAV LINK HIGHLIGHT
     ------------------------------------------- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-link');

  links.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    } else if (currentPath === '' && href === 'index.html') {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  /* -------------------------------------------
     4. FAQ ACCORDION
     ------------------------------------------- */
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(function (question) {
    question.addEventListener('click', function () {
      const faqItem = this.parentElement;
      const isActive = faqItem.classList.contains('active');

      // Close all other FAQ items
      document.querySelectorAll('.faq-item.active').forEach(function (item) {
        item.classList.remove('active');
      });

      // Toggle current
      if (!isActive) {
        faqItem.classList.add('active');
      }
    });
  });

  /* -------------------------------------------
     5. SMOOTH SCROLLING FOR ANCHOR LINKS
     ------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (event) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        event.preventDefault();
        const navOffset = navbar ? navbar.offsetHeight : 80;
        const targetPosition =
          targetElement.getBoundingClientRect().top + window.pageYOffset - navOffset - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* -------------------------------------------
     6. FORM SUBMISSION FEEDBACK
     ------------------------------------------- */
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function () {
      const submitButton = contactForm.querySelector('button[type="submit"]');

      if (submitButton) {
        submitButton.textContent = 'Sending Message...';
        submitButton.disabled = true;
        submitButton.style.opacity = '0.75';
      }
    });
  }

  /* -------------------------------------------
     7. DYNAMIC COPYRIGHT YEAR
     ------------------------------------------- */
  const yearElements = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();

  yearElements.forEach(function (element) {
    element.textContent = currentYear;
  });

  /* -------------------------------------------
     8. OPTIONAL SCROLL REVEAL (Safe)
     ------------------------------------------- */
  if ('IntersectionObserver' in window) {
    const revealElements = document.querySelectorAll(
      '.service-row, .why-card, .value-card, .package-card, .timeline-step'
    );

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
      }
    );

    revealElements.forEach(function (element) {
      observer.observe(element);
    });
  }

});