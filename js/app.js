const container = document.querySelector(".container");

for(let i = 0; i< 16; i++){
    const el = document.createElement("div");
    el.textContent = i;
    el.classList.add("card");
    el.style.color = "black";
    el.style.backgroundColor = "white";
    container.appendChild(el);
}

const score = document.createElement("div");
score.textContent = "score";
score.classList.add("score");
container.appendChild(score);