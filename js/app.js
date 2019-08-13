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

    openCard: function(event) {
      const element = event.target;
      if (element.classList[0] === "card__face" && this.checkBox.length < 2) {
        this.checkBox.push(element);
        interface.showCard(element);

        if (this.firstClick) {
          this.setUpTimer();
          this.firstClick = false;
        }
      }
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

        interface.renderTime(time);
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

    renderTime: function(time) {
      const timeEl = document.querySelector(".time");
      timeEl.textContent = time;
    }
  };

  controller.init();
})();
