// ===== DOM ELEMENTS =====
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.navbar__hamburger');
const mobileOverlay = document.querySelector('.mobile-overlay');
const navLinks = document.querySelectorAll('.navbar__link, .mobile-overlay__link');
const fadeElements = document.querySelectorAll('.fade-in');

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== MOBILE MENU =====
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileOverlay.classList.toggle('active');
  document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
  const scrollY = window.scrollY + 150;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      document.querySelectorAll('.navbar__link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveLink);

// ===== SCROLL REVEAL ANIMATION =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

fadeElements.forEach(el => observer.observe(el));

// ===== GALLERY LIGHTBOX =====
const galleryItems = document.querySelectorAll('.gallery__item');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    const lightbox = document.createElement('div');
    lightbox.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    
    const lightboxImg = document.createElement('img');
    lightboxImg.src = img.src;
    lightboxImg.style.cssText = `
      max-width: 90%;
      max-height: 90vh;
      object-fit: contain;
      border-radius: 4px;
      transform: scale(0.9);
      transition: transform 0.3s ease;
    `;
    
    lightbox.appendChild(lightboxImg);
    document.body.appendChild(lightbox);
    
    requestAnimationFrame(() => {
      lightbox.style.opacity = '1';
      lightboxImg.style.transform = 'scale(1)';
    });
    
    lightbox.addEventListener('click', () => {
      lightbox.style.opacity = '0';
      setTimeout(() => lightbox.remove(), 300);
    });
  });
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== PARALLAX EFFECT ON HERO =====
window.addEventListener('scroll', () => {
  const heroImg = document.querySelector('.hero__bg img');
  if (heroImg && window.innerWidth > 768) {
    const scrolled = window.scrollY;
    heroImg.style.transform = `translateY(${scrolled * 0.2}px)`;
  }
});

// ===== PAGE LOAD =====
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// ===== EQUALIZER ANIMATION RANDOMIZER =====
const equalizerBars = document.querySelectorAll('.footer__equalizer span');
equalizerBars.forEach(bar => {
  const randomDelay = Math.random() * 0.5;
  const randomDuration = 0.8 + Math.random() * 0.8;
  bar.style.animationDelay = `${randomDelay}s`;
  bar.style.animationDuration = `${randomDuration}s`;
});
