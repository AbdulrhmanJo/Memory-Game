(function() {
  //------------DATA MODEL-----------

  var data = {
    moves: 0,
    cards: [],

    addcard: function(card) {
      this.cards.push(card);
    },

    getAllcards: function() {
      return cards;
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
      interface.render();
    },

    // 3- add the card to UI

    getCards: function() {
      return data.cards;
    },

    init: function() {
      this.createCards();
      //   interface.init();
      //   data.init();
    }
  };

  //------------interface MODEL-----------

  var interface = {
    init: function() {},

    render: function() {
      const container = document.querySelector(".container");
      const cards = controller.getCards();
      cards.forEach(card => {
        container.appendChild(card);
      });
    }
  };

  controller.init();
})();

const container = document.querySelector(".container");

// for (let i = 0; i < 16; i++) {
//   const el = document.createElement("div");
//   el.classList.add("card");
//   el.style.color = "black";
//   el.style.backgroundColor = "white";
//   el.style.backgroundImage = "url('img/025-cat.png')";
//   container.appendChild(el);
// }

// // const score = document.createElement("div");
// score.textContent = "score";
// score.classList.add("score");
// container.appendChild(score);
