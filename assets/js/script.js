// Gestion des clics pour afficher/masquer les réponses
document.querySelectorAll('.faq li').forEach(item => {
    item.addEventListener('click', () => {
        // Ajouter ou retirer la classe "active"
        item.classList.toggle('active');
    });
});
const menuToggle = document.getElementById('menu-toggle');
const header = document.querySelector('header');

menuToggle.addEventListener('click', () => {
    header.classList.toggle('menu-open');
});
/********* Gestion Carousel************/
const track = document.querySelector('.carousel-track');
const images = Array.from(track.children);
const nextButton = document.querySelector('.carousel-button.next');
const prevButton = document.querySelector('.carousel-button.prev');

let currentIndex = 0;

function updateCarousel(index) {
  const imageWidth = images[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${index * imageWidth}px)`;
}

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateCarousel(currentIndex);
});

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateCarousel(currentIndex);
});








