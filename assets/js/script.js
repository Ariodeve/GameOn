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
async function fetchExperiences() {
  try {
      const response = await fetch("http://localhost:3000/experiences");
      if (!response.ok) throw new Error("Erreur lors du chargement des expériences");
      const experiences = await response.json();

      // Insérer les expériences dans la liste
      const experiencesList = document.querySelector(".listeExp");
      experiences.forEach((exp, index) => {
          // Ajouter une classe dynamique comme "exp1", "exp2", etc.
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
  } catch (error) {
      console.error("Erreur :", error);
  }
}

// Charger les expériences au chargement de la page
fetchExperiences();

/******************** Appel à une API *************************/
const apiKey = '170d7fee5ec142c396b55b76f825a417'; // Remplace par ta clé API RAWG
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

    // Ouvrir le modal avec le jeu sélectionné
    function openReservationModal(gameName) {
      document.getElementById('selectedGame').value = gameName;
      document.getElementById('reservationModal').style.display = 'flex';
    }

    // Fermer le modal
    document.getElementById('closeModal').addEventListener('click', () => {
      document.getElementById('reservationModal').style.display = 'none';
    });

    // Gestionnaire de soumission du formulaire
    const reservationForm = document.getElementById('reservationForm');
    reservationForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const selectedGame = document.getElementById('selectedGame').value;
      const selectedDate = document.getElementById('date').value;
      const selectedTime = document.getElementById('time').value;

      alert(`Réservation confirmée pour "${selectedGame}" le ${selectedDate} à ${selectedTime}.`);
      document.getElementById('reservationModal').style.display = 'none';
    });

    // Appel initial
    fetchGames();
    



/***************************Gestion des cookies****************************/
// Vérifie si le consentement a déjà été donné
if (document.cookie.includes('cookies-accepted=true') || document.cookie.includes('cookies-accepted=false')) {
    document.getElementById('cookie-banner').style.display = 'none';
}
              
// Fonction pour gérer l'acceptation des cookies
  document.getElementById('accept-cookies').addEventListener('click', function () {
  document.cookie = "cookies-accepted=true; path=/; max-age=" + 60 * 60 * 24 * 365; // 1 an
  document.getElementById('cookie-banner').style.display = 'none';
  alert('Merci d’avoir accepté les cookies !');
});
              
// Fonction pour refuser les cookies
  document.getElementById('decline-cookies').addEventListener('click', function () {
  document.cookie = "cookies-accepted=false; path=/; max-age=" + 60 * 60 * 24 * 365; // 1 an
  document.getElementById('cookie-banner').style.display = 'none';
  alert('Vous avez refusé les cookies.');
});
if (document.cookie.includes('cookies-accepted=true')) {
// Charger Google Analytics ou tout autre script
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-XXXXXXXXX-X', 'auto');
ga('send', 'pageview');
}










