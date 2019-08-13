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
    checkBox: [],
    firstClick: true,
    mataches: 0,

    createCards: function() {
      let counter = 0;
      while (counter < 2) {
        for (let i = 1; i <= 8; i++) {
          const cardContainer = document.createElement("div");
          cardContainer.classList.add("card__container");
          cardContainer.innerHTML = `<div class="card__face card__face--front"></div><div class="card__face card__face--back"><img src="img/${i}-cat.png" alt="cat"></div>`;
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

    openCard: function(event) {
      const element = event.target;
      if (element.classList[0] === "card__face" && this.checkBox.length < 2) {
        this.checkBox.push(element.nextSibling);
        interface.showCard(element);

        if (this.firstClick) {
          this.setUpTimer();
          this.firstClick = false;
        }

        if (this.checkBox.length === 2) {
          this.checkCard();
        }
      }
    },

    checkCard: function() {
      const firstCard = this.checkBox[0].firstChild;
      const secondCard = this.checkBox[1].firstChild;

      if (firstCard.getAttribute("src") === secondCard.getAttribute("src")) {
        console.log("match");
        this.mataches++;
      } else {
        interface.closeCard(this.checkBox);
      }
      this.checkBox = [];
      interface.updateMoves(this.incrementMoves());
    },

    incrementMoves: function() {
      return ++data.moves;
    },

    setUpTimer: function() {
      sec = 0;
      min = 0;

      const counter = function() {
        if (++sec === 60) {
          sec = 0;
          if (++min === 60) {
            min = 0;
          }
        }

        time =
          (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);

        interface.updateTime(time);
      };

      setInterval(counter, 1000);
    },

    setUpEventListener: function() {
      document
        .querySelector(".container")
        .addEventListener("click", this.openCard.bind(this));

      // if(element.classList[0] === "score__reset--img"){
      //   //reset()
      //   console.log('reset');
      // }
    },

    init: function() {
      //create cards
      this.createCards();
      //shuffle the cards
      this.shuffleCards(data.getAllcards());
      //add the interface to the page
      interface.init();
      //add All the Event Listener in the game
      this.setUpEventListener();
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

      const timeEl = document.querySelector(".time");
      timeEl.textContent = "00:00";

      const movesEl = document.querySelector(".moves");
      movesEl.textContent = "0";
    },

    showCard: function(card) {
      card.parentElement.classList.add("open");
    },

    closeCard: function(openCards) {
      openCards.forEach(card => {
        setTimeout(() => {
          card.parentElement.classList.add("animated", "shake");
        }, 800);

        setTimeout(() => {
          card.parentElement.classList.remove("open");
          card.parentElement.classList.remove("shake");
        }, 1800);
      });
    },

    updateTime: function(time) {
      const timeEl = document.querySelector(".time");
      timeEl.textContent = time;
    },

    updateMoves: function(moves) {
      const movesEl = document.querySelector(".moves");
      movesEl.textContent = moves;
    }
  };

  controller.init();
})();
