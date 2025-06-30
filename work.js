document.addEventListener("DOMContentLoaded", () => {

  // ==== Hamburger Menu ====
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.querySelector(".navigation"); // Assuming 'navigation' is your nav container

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  // ==== Animate Skill Cards on Scroll ====
  const cards = document.querySelectorAll('.skill-card');

  if (cards.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });

    cards.forEach(card => observer.observe(card));
  }

  // ==== Modal Logic ====
  document.querySelectorAll('.details-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-target');
      const modal = document.getElementById(modalId);
      if (modal) modal.style.display = 'flex';
    });
  });

  document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      if (modal) modal.style.display = 'none';
    });
  });

  window.addEventListener('click', e => {
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
    }
  });

  // ==== Contact Form Submission ====
  const form = document.getElementById('contact-form');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const scriptURL = 'https://script.google.com/macros/s/AKfycbwNZqtICpsccBHIOJ0yUofrJKoCW5uArPjbx064kFiHC1GgD5cAuf7wS2tpbUXuM7q4IA/exec';
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.ok) {
            alert('Message sent successfully!');
            form.reset();
          } else {
            alert('Something went wrong. Please try again.');
          }
        })
        .catch(error => {
          alert('Error: ' + error.message);
        });
    });
  }

});
