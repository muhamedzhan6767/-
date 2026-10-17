/* ==========================================================================
   Alex Morgan — Personal Portfolio
   script.js

   Plain (vanilla) JavaScript — no libraries or frameworks required.

   Features
   1.  Project data (used by the project detail modal)
   2.  Sticky header style + active link highlighting
   3.  Mobile menu toggle
   4.  Smooth scrolling for in-page links
   5.  Scroll-reveal animations
   6.  Animated skill bars and hero counters
   7.  Skill filters + card glow effect
   8.  Typing effect in the hero subtitle
   9.  Project detail modal
   10. Contact form validation (front-end demo only)
   11. Back-to-top button
   12. Current year in the footer
   13. Toast helper
   ========================================================================== */

(function () {
  "use strict";

  /* Shortcut helpers */
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  /* True if the visitor asked their OS for reduced motion */
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------------
     1. PROJECT DATA
     CUSTOMIZE: Edit these objects to change what appears in each popup.
     The key (portfolio, ecommerce, team) must match the button's
     data-project attribute in index.html.
     ------------------------------------------------------------------------ */
  const projects = {
    portfolio: {
      icon: "i-layout",
      type: "Web Development",
      title: "Personal Portfolio Website",
      description:
        "A fully responsive personal website that presents my background, education, skills, and projects in one place. " +
        "It was designed with a modern dark theme, smooth animations, and accessibility in mind — and runs without any build tools or frameworks.",
      features: [
        "Responsive layout for desktop, tablet, and mobile",
        "Smooth scrolling and animated section reveals",
        "Interactive project popups and skill filters",
        "Contact form with client-side validation"
      ],
      learned: [
        "Semantic HTML and accessible markup",
        "CSS Grid, Flexbox, and custom properties",
        "DOM manipulation and event handling in JavaScript",
        "Designing a consistent visual system"
      ],
      tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Accessibility"],
      role: "Designer & Developer",
      timeline: "2 weeks",
      status: "Completed"
    },

    ecommerce: {
      icon: "i-cart",
      type: "UI Concept",
      title: "E-Commerce Concept",
      description:
        "A concept for an online store focused on a clean, trustworthy shopping experience. " +
        "The project explores how layout, product cards, and clear calls to action help customers find products and make decisions quickly.",
      features: [
        "Product grid with clean, consistent product cards",
        "Category filters and simple search concept",
        "Shopping cart and checkout flow outline",
        "Mobile-first layout considerations"
      ],
      learned: [
        "User-centered design and basic UX principles",
        "How online businesses present products",
        "Creating wireframes and visual mock-ups",
        "Balancing business goals with user needs"
      ],
      tags: ["UI/UX Design", "Wireframing", "Product Cards", "Business Thinking"],
      role: "Concept & UI Designer",
      timeline: "3 weeks",
      status: "Concept stage"
    },

    team: {
      icon: "i-users",
      type: "Team Project",
      title: "Student Team Project",
      description:
        "A collaborative university project in which our team researched a real-world problem, analyzed possible solutions, " +
        "and presented our recommendations to the class. I helped coordinate tasks, organize research, and design the final presentation.",
      features: [
        "Structured research on a real-world challenge",
        "Comparison of possible solutions with pros and cons",
        "Shared task board to track responsibilities",
        "Final presentation and Q&A session"
      ],
      learned: [
        "Dividing work fairly and meeting shared deadlines",
        "Communicating clearly within a team",
        "Turning research into a clear story",
        "Presenting confidently and answering questions"
      ],
      tags: ["Research", "Teamwork", "Presentation", "Problem-Solving", "Project Management"],
      role: "Team Coordinator",
      timeline: "1 semester",
      status: "Presented"
    }
  };

  /* ------------------------------------------------------------------------
     2. STICKY HEADER + ACTIVE LINK HIGHLIGHTING
     ------------------------------------------------------------------------ */
  const header = $(".site-header");
  const navLinks = $$(".nav-link");
  const sections = $$("main section[id]");

  function onScrollHeader() {
    header.classList.toggle("scrolled", window.scrollY > 20);
  }

  // Highlight the nav link for the section currently in view
  function updateActiveLink() {
    const scrollPos = window.scrollY + window.innerHeight * 0.35;
    let currentId = sections.length ? sections[0].id : "";

    sections.forEach((section) => {
      if (section.offsetTop <= scrollPos) currentId = section.id;
    });

    // When scrolled to the very bottom, highlight the last section
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      currentId = sections[sections.length - 1].id;
    }

    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === "#" + currentId;
      link.classList.toggle("active", isActive);
      if (isActive) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }

  /* ------------------------------------------------------------------------
     3. MOBILE MENU TOGGLE
     ------------------------------------------------------------------------ */
  const navToggle = $("#navToggle");
  const navMenu = $("#navMenu");

  function setMenu(open) {
    navMenu.classList.toggle("open", open);
    header.classList.toggle("menu-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("no-scroll", open);
  }

  navToggle.addEventListener("click", () => {
    setMenu(!navMenu.classList.contains("open"));
  });

  // Close the menu when clicking the dark overlay outside it
  document.addEventListener("click", (event) => {
    if (
      navMenu.classList.contains("open") &&
      !navMenu.contains(event.target) &&
      !navToggle.contains(event.target)
    ) {
      setMenu(false);
    }
  });

  // Close the menu if the window is resized to desktop width
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900 && navMenu.classList.contains("open")) setMenu(false);
  });

  /* ------------------------------------------------------------------------
     4. SMOOTH SCROLLING
     CSS "scroll-behavior: smooth" handles most browsers; this adds the
     fixed-header offset, closes the mobile menu, and moves keyboard focus.
     ------------------------------------------------------------------------ */
  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href");
      if (id.length < 2) return;
      const target = $(id);
      if (!target) return;

      event.preventDefault();
      setMenu(false);

      const offset = id === "#home" ? 0 : header.offsetHeight - 1;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top: Math.max(top, 0), behavior: prefersReducedMotion ? "auto" : "smooth" });

      // Update the URL without jumping, and move focus for screen readers
      history.pushState(null, "", id);
      if (id === "#main" || target.tagName === "SECTION") {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    });
  });

  /* ------------------------------------------------------------------------
     5. SCROLL-REVEAL ANIMATIONS
     Uses IntersectionObserver to add .visible when elements enter view.
     ------------------------------------------------------------------------ */
  const revealEls = $$(".reveal");

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // animate only once
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback: show everything immediately
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  /* ------------------------------------------------------------------------
     6. ANIMATED SKILL BARS + HERO COUNTERS
     ------------------------------------------------------------------------ */
  const skillCards = $$(".skill-card");

  function fillSkillBar(card) {
    const level = parseInt(card.dataset.level, 10) || 0;
    $(".progress-bar", card).style.width = level + "%";
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10) || 0;
    const suffix = el.dataset.suffix || "";
    if (prefersReducedMotion) {
      el.textContent = target + suffix;
      return;
    }
    const duration = 1400;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const counters = $$("[data-count]");

  if ("IntersectionObserver" in window) {
    const once = (callback, threshold = 0.4) =>
      new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              callback(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold }
      );

    const barObserver = once(fillSkillBar);
    skillCards.forEach((card) => barObserver.observe(card));

    const counterObserver = once(animateCounter, 0.6);
    counters.forEach((el) => counterObserver.observe(el));
  } else {
    skillCards.forEach(fillSkillBar);
    counters.forEach(animateCounter);
  }

  /* ------------------------------------------------------------------------
     7. SKILL FILTERS + CARD GLOW
     ------------------------------------------------------------------------ */
  const filterButtons = $$(".filter-btn");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      filterButtons.forEach((b) => {
        const isActive = b === btn;
        b.classList.toggle("active", isActive);
        b.setAttribute("aria-pressed", String(isActive));
      });

      skillCards.forEach((card) => {
        const show = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !show);
        if (show) {
          card.classList.add("visible"); // make sure filtered-in cards are revealed
          fillSkillBar(card);
        }
      });
    });
  });

  // Radial glow that follows the mouse inside each skill card
  skillCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", event.clientX - rect.left + "px");
      card.style.setProperty("--my", event.clientY - rect.top + "px");
    });
  });

  /* ------------------------------------------------------------------------
     8. TYPING EFFECT
     CUSTOMIZE: Change the phrases that rotate in the hero subtitle.
     The first phrase matches the static text in index.html.
     ------------------------------------------------------------------------ */
  const typedEl = $("#typedText");
  const phrases = [
    "Aspiring Technology Professional",
    "Creative Problem-Solver",
    "Future Entrepreneur",
    "Lifelong Learner"
  ];

  if (typedEl && !prefersReducedMotion) {
    let phraseIndex = 0;
    let charIndex = phrases[0].length;
    let deleting = true;
    typedEl.classList.add("typing");

    function typeLoop() {
      const phrase = phrases[phraseIndex];
      typedEl.textContent = phrase.slice(0, charIndex);

      let delay = deleting ? 40 : 80;

      if (deleting) {
        charIndex--;
        if (charIndex < 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          charIndex = 0;
          delay = 300;
        }
      } else {
        charIndex++;
        if (charIndex > phrases[phraseIndex].length) {
          deleting = true;
          charIndex = phrases[phraseIndex].length;
          delay = 2200; // pause on the full phrase
        }
      }
      setTimeout(typeLoop, delay);
    }

    // Wait a moment so the visitor can read the first phrase
    setTimeout(typeLoop, 3000);
  }

  /* ------------------------------------------------------------------------
     9. PROJECT DETAIL MODAL
     Accessible dialog: focus moves inside, Tab is trapped, Escape closes,
     and focus returns to the button that opened it.
     ------------------------------------------------------------------------ */
  const modal = $("#projectModal");
  const modalDialog = $(".modal-dialog", modal);
  let lastFocused = null;

  // Small helper that builds a list of <li> elements safely (no innerHTML)
  function fillList(listEl, items, className) {
    listEl.textContent = "";
    items.forEach((text) => {
      const li = document.createElement("li");
      if (className) li.className = className;
      li.textContent = text;
      listEl.appendChild(li);
    });
  }

  function openModal(key, trigger) {
    const data = projects[key];
    if (!data) return;

    $("#modalType").textContent = data.type;
    $("#modalTitle").textContent = data.title;
    $("#modalDescription").textContent = data.description;
    $("#modalRole").textContent = data.role;
    $("#modalTimeline").textContent = data.timeline;
    $("#modalStatus").textContent = data.status;
    $("#modalIcon use").setAttribute("href", "#" + data.icon);
    fillList($("#modalFeatures"), data.features);
    fillList($("#modalLearned"), data.learned);
    fillList($("#modalTags"), data.tags, "tag");

    lastFocused = trigger || document.activeElement;
    modal.hidden = false;
    modal.classList.remove("closing");
    modalDialog.scrollTop = 0;
    document.body.classList.add("no-scroll");
    $(".modal-close", modal).focus();
  }

  function closeModal() {
    if (modal.hidden) return;
    const finish = () => {
      modal.hidden = true;
      modal.classList.remove("closing");
      document.body.classList.remove("no-scroll");
      if (lastFocused) lastFocused.focus();
    };

    if (prefersReducedMotion) {
      finish();
    } else {
      modal.classList.add("closing");
      setTimeout(finish, 240); // matches the CSS closing animation
    }
  }

  $$("[data-project]").forEach((btn) => {
    btn.addEventListener("click", () => openModal(btn.dataset.project, btn));
  });

  $$("[data-close]", modal).forEach((el) => el.addEventListener("click", closeModal));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (!modal.hidden) closeModal();
      else if (navMenu.classList.contains("open")) {
        setMenu(false);
        navToggle.focus();
      }
    }

    // Keep keyboard focus inside the modal while it is open
    if (event.key === "Tab" && !modal.hidden) {
      const focusable = $$('button, a[href], input, textarea, [tabindex]:not([tabindex="-1"])', modalDialog);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  /* ------------------------------------------------------------------------
     10. CONTACT FORM VALIDATION
     IMPORTANT: This is a FRONT-END DEMONSTRATION ONLY.
     The form checks the fields in the browser and shows a success message,
     but it does NOT send an email — there is no server/backend.
     To receive real messages, connect it to a service such as Formspree,
     Netlify Forms, EmailJS, or your own backend (see README.md).
     ------------------------------------------------------------------------ */
  const form = $("#contactForm");
  const submitBtn = $("#submitBtn");
  const successBox = $("#formSuccess");
  const messageField = $("#message");
  const charCount = $("#message-count");

  // Simple, practical email pattern (something@something.tld)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  // Validation rules for each field: return an error message, or "" if valid
  const validators = {
    name(value) {
      if (!value) return "Please enter your name.";
      if (value.length < 2) return "Your name should be at least 2 characters.";
      return "";
    },
    email(value) {
      if (!value) return "Please enter your email address.";
      if (!emailPattern.test(value)) return "Please enter a valid email, e.g. name@example.com.";
      return "";
    },
    message(value) {
      if (!value) return "Please write a message.";
      if (value.length < 10) return "Your message should be at least 10 characters.";
      return "";
    }
  };

  function validateField(field) {
    const value = field.value.trim();
    const error = validators[field.name](value);
    const group = field.closest(".form-group");
    const errorEl = $("#" + field.name + "-error");

    errorEl.textContent = error;
    group.classList.toggle("invalid", Boolean(error));
    group.classList.toggle("valid", !error);
    field.setAttribute("aria-invalid", String(Boolean(error)));
    return !error;
  }

  const fields = ["name", "email", "message"].map((name) => form.elements[name]);

  fields.forEach((field) => {
    // Validate when the user leaves a field...
    field.addEventListener("blur", () => {
      if (field.value.trim() !== "") validateField(field);
    });
    // ...and re-check live once an error is showing
    field.addEventListener("input", () => {
      if (field.closest(".form-group").classList.contains("invalid")) validateField(field);
      successBox.hidden = true;
    });
  });

  // Character counter for the message box
  messageField.addEventListener("input", () => {
    charCount.textContent = messageField.value.length + " / " + messageField.maxLength;
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // stop the browser from reloading the page

    const results = fields.map(validateField);
    const allValid = results.every(Boolean);

    if (!allValid) {
      // Move focus to the first field with a problem
      const firstInvalid = fields[results.indexOf(false)];
      firstInvalid.focus();
      showToast("Please fix the highlighted fields.");
      return;
    }

    // Simulate a short "sending" delay so the interaction feels real
    const label = $(".btn-label", submitBtn);
    const icon = $(".icon", submitBtn);
    submitBtn.disabled = true;
    label.textContent = "Sending...";
    const spinner = document.createElement("span");
    spinner.className = "spinner";
    spinner.setAttribute("aria-hidden", "true");
    icon.replaceWith(spinner);

    setTimeout(() => {
      const firstName = form.elements.name.value.trim().split(/\s+/)[0];
      $("#successName").textContent = firstName ? ", " + firstName : "";
      successBox.hidden = false;

      form.reset();
      charCount.textContent = "0 / " + messageField.maxLength;
      fields.forEach((field) => {
        field.closest(".form-group").classList.remove("valid", "invalid");
        field.removeAttribute("aria-invalid");
      });

      submitBtn.disabled = false;
      label.textContent = "Send Message";
      spinner.replaceWith(icon);
      showToast("Message validated successfully (demo — not actually sent).");
    }, 1200);
  });

  /* ------------------------------------------------------------------------
     11. BACK-TO-TOP BUTTON
     ------------------------------------------------------------------------ */
  const backToTop = $("#backToTop");

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    history.pushState(null, "", "#home");
  });

  /* Combine all scroll work into one efficient, throttled handler */
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      onScrollHeader();
      updateActiveLink();
      backToTop.classList.toggle("visible", window.scrollY > 600);
      ticking = false;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // run once on load (e.g. if the page opens mid-way down)

  /* ------------------------------------------------------------------------
     12. CURRENT YEAR IN THE FOOTER
     ------------------------------------------------------------------------ */
  $("#year").textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------------
     13. TOAST HELPER
     Shows a small message at the bottom of the screen for a few seconds.
     ------------------------------------------------------------------------ */
  const toast = $("#toast");
  let toastTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
  }
})();
