(function() {
  //------------DATA MODEL-----------

  var data = {
    moves: 0,
    cards: [],

    addcard: function(card) {
      this.cards.push(card);
    },

    getAllcards: function() {
      return this.cards;
    },

    init: function() {
      console.log(this.cards);
    }
  };

  //------------controller MODEL-----------

  var controller = {
    // 1- create card
    createCards: function() {
      let counter = 0;
      while (counter < 2) {
        for (let i = 1; i <= 8; i++) {
          const cardContainer = document.createElement("div");
          cardContainer.classList.add("card__container");
          cardContainer.innerHTML = `<div class="card__face card__face--front"></div>
                                           <div class="card__face card__face--back">
                                                <img src="img/${i}-cat.png" alt="cat">
                                           </div>`;
          // 2- add cards to card array
          data.addcard(cardContainer);
        }
        counter++;
      }
    },

    getCards: function() {
      return data.cards;
    },

    shuffleCards: function(cards) {
      let currentIndex = cards.length,
        tempValue,
        randomIndex;

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        tempValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = tempValue;
      }
    },

    init: function() {
      this.createCards();

      document
        .querySelector(".container")
        .addEventListener("click", function(event) {
          if (event.target.classList[0] === "card__face") {
            event.target.parentElement.classList.add("open");
          }
        });
      //shuffle the cards
      this.shuffleCards(data.getAllcards());
      interface.init();
      //   data.init();
    }
  };

  //------------interface MODEL-----------

  var interface = {
    init: function() {
      const container = document.querySelector(".container");
      const cards = controller.getCards();
      cards.forEach(card => {
        container.appendChild(card);
      });
    },

    render: function() {}
  };

  controller.init();
})();
