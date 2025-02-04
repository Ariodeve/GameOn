/******************* Menu Burger *******************/

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

/********************* Fonctionalité AJAX **************************/

// Fonction pour récupérer et afficher les expériences

function fetchExperiences() {
  fetch("db.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Erreur lors du chargement des expériences");
      }
      return response.json();
    })
    .then(data => {
      const experiencesList = document.querySelector(".listeExp");
      if (experiencesList) {
        data.experiences.forEach((exp, index) => {
          const listItem = document.createElement("li");
          listItem.className = `exp${index + 1}`; // exp1, exp2, exp3...

          listItem.innerHTML = `
            <img src="${exp.image}" alt="${exp.alt}">
            <h3>${exp.title}</h3>
            <p>${exp.description}</p>
            <a href="${exp.link}">En savoir plus</a>
          `;
          experiencesList.appendChild(listItem);
        });
      }
    })
    .catch(error => {
      console.error("Erreur :", error);
    });
}

// Charger les expériences au chargement de la page

fetchExperiences();

/******************** Appel à une API *************************/

const apiKey = '170d7fee5ec142c396b55b76f825a417'; 
const endpoint = `https://api.rawg.io/api/games?tags=vr&key=${apiKey}`;

    // Fonction pour récupérer les jeux et les afficher

    async function fetchGames() {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des jeux VR');
        }
        const data = await response.json();
        displayGames(data.results);
      } catch (error) {
        console.error('Erreur :', error);
      }
    }

    // Afficher les jeux dans la section "games-container"

    function displayGames(games) {
      const gamesContainer = document.getElementById('games');
      if(gamesContainer){
        games.forEach(game => {
      const gameDiv = document.createElement('div');
        gameDiv.classList.add('game');
        gameDiv.setAttribute('data-game', game.name); // Ajouter un attribut pour le nom du jeu
        gameDiv.innerHTML = `
          <h3>${game.name}</h3>
          <img src="${game.background_image}" alt="${game.name}">
          <p><strong>Note :</strong> ${game.rating} / 5</p>
        `;
        gamesContainer.appendChild(gameDiv);

        // Rendre chaque carte cliquable

        gameDiv.addEventListener('click', () => openReservationModal(game.name));
      });
      }   
    }

    // Ouvrir le modal avec le jeu sélectionné

    function openReservationModal(gameName) {
      document.getElementById('selectedGame').value = gameName;
      document.getElementById('reservationModal').style.display = 'flex';
    }
    
    // Fermer le modal

    let closemodal = document.getElementById('closeModal')
    if(closemodal){
      closemodal.addEventListener('click', () => {
      document.getElementById('reservationModal').style.display = 'none';
    });
    }

    // Gestionnaire de soumission du formulaire

    const reservationForm = document.getElementById('reservationForm');
    if(reservationForm){
      
      reservationForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const selectedGame = document.getElementById('selectedGame').value;
      const selectedDate = document.getElementById('date').value;
      const selectedTime = document.getElementById('time').value;
      alert(`Réservation confirmée pour "${selectedGame}" le ${selectedDate} à ${selectedTime}.`);
      document.getElementById('reservationModal').style.display = 'none';
    });
    }

    // Appel initial

    document.addEventListener('DOMContentLoaded', () => {
      fetchGames();
    });
    
/********************** Gestion Carousel************************/

const track = document.querySelector('.carousel-track');
if(track){
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
}
 
/***************************Gestion des cookies****************************/






