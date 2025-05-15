// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.progress');
const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        
        if (barPosition < screenPosition) {
            bar.style.width = bar.style.width;
        }
    });
};

window.addEventListener('scroll', animateSkillBars);
window.addEventListener('load', animateSkillBars);

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Message envoyé avec succès !');
        contactForm.reset();
    });
}

// Add hover effect to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    observer.observe(section);
});

// Effet wave-in sur la section about-section
const aboutSection = document.querySelector('.about-section');
if (aboutSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        aboutSection.classList.add('wave-in');
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });
  observer.observe(aboutSection);
}

// === Parcours scolaire : slider animé ===
const showSliderBtn = document.getElementById('showSliderBtn');
const schoolSlider = document.getElementById('schoolSlider');
const sliderTrack = schoolSlider ? schoolSlider.querySelector('.slider-track') : null;
const sliderLeft = document.getElementById('sliderLeft');
const sliderRight = document.getElementById('sliderRight');

if (showSliderBtn && schoolSlider) {
  showSliderBtn.addEventListener('click', () => {
    schoolSlider.classList.add('active');
    setTimeout(() => {
      schoolSlider.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 350);
  });
}
if (sliderLeft && sliderTrack) {
  sliderLeft.addEventListener('click', () => {
    sliderTrack.scrollBy({ left: -650, behavior: 'smooth' });
  });
}
if (sliderRight && sliderTrack) {
  sliderRight.addEventListener('click', () => {
    sliderTrack.scrollBy({ left: 650, behavior: 'smooth' });
  });
}

// === Overlay Parcours GTA VI Fullscreen & Horizontal ===
const openCardBtn = document.getElementById('openCardBtn');
const schoolCardOverlay = document.getElementById('schoolCardOverlay');
const backCardBtn = document.getElementById('backCardBtn');
const horizontalTrack = document.querySelector('.school-card-horizontal-track');
const schoolImgWrapper = document.getElementById('schoolImgWrapper');

if (schoolImgWrapper && openCardBtn && schoolCardOverlay && backCardBtn) {
  const openOverlay = () => {
    schoolCardOverlay.classList.add('active');
    if (horizontalTrack) horizontalTrack.scrollTo({ left: 0 });
  };
  schoolImgWrapper.addEventListener('click', openOverlay);
  schoolImgWrapper.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') openOverlay();
  });
  openCardBtn.addEventListener('click', openOverlay);
  backCardBtn.addEventListener('click', () => {
    schoolCardOverlay.classList.remove('active');
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') schoolCardOverlay.classList.remove('active');
  });
}
// Scroll horizontal à la molette (sans shift)
if (horizontalTrack) {
  horizontalTrack.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      horizontalTrack.scrollBy({ left: e.deltaY * 4, behavior: 'smooth' });
    }
  }, { passive: false });
}

// Polyfill smooth scroll pour anciens navigateurs
(function() {
  if ('scrollBehavior' in document.documentElement.style) return;
  var originalScrollTo = window.scrollTo;
  window.scrollTo = function(options) {
    if (typeof options === 'object' && options.behavior === 'smooth') {
      window.scroll({ top: options.top, left: options.left, behavior: 'smooth' });
    } else {
      originalScrollTo.apply(window, arguments);
    }
  };
})();

// Effet dynamique sur le background de l'overlay au scroll horizontal (fix)
if (horizontalTrack) {
  horizontalTrack.addEventListener('scroll', () => {
    const maxScroll = horizontalTrack.scrollWidth - horizontalTrack.clientWidth;
    const scrollLeft = horizontalTrack.scrollLeft;
    const ratio = Math.min(Math.max(scrollLeft / maxScroll, 0), 1);
    // Image code.png disparaît progressivement (max 0.35)
    document.documentElement.style.setProperty('--code-bg-opacity', (0.35 - 0.35 * ratio).toString());
    // Overlay bleu clair devient plus transparent, couleur secondaire plus visible (max 0.5)
    document.documentElement.style.setProperty('--overlay-opacity', (0.5 - 0.5 * ratio).toString());
  });
  // Init à l'ouverture
  horizontalTrack.dispatchEvent(new Event('scroll'));
}

// === Menu Burger Rockstar VI Style ===
// ... existing code ...
