const cards = {
    dieren: [
        { id: 1, img: "images_kids/beer.png" },
        { id: 2, img: "images_kids/dolfijn.webp" },
        { id: 3, img: "images_kids/herdershond.webp" },
        { id: 4, img: "images_kids/huski.jpg" },
        { id: 5, img: "images_kids/kittens.jpg" },
        { id: 6, img: "images_kids/nemo.jpg" },
        { id: 7, img: "images_kids/olifant.jpg" },
        { id: 8, img: "images_kids/puppy.jpg" },
        { id: 9, img: "images_kids/tijger.jpg" }
    ],
    colors: [
        { id: 10, img: "images_kids/blauw.png" },
        { id: 11, img: "images_kids/geel.jpeg" },
        { id: 12, img: "images_kids/grijs.png" },
        { id: 13, img: "images_kids/groen.jpeg" },
        { id: 14, img: "images_kids/oranje.jpeg" },
        { id: 15, img: "images_kids/paars.jpeg" },
        { id: 16, img: "images_kids/rood.jpg" },
        { id: 17, img: "images_kids/roze.png" },
        { id: 18, img: "images_kids/turquoise.jpeg" },
        { id: 19, img: "images_kids/lichtblauw.png"},
        { id: 20, img: "images_kids/pastelgroen.jpeg" },
    ],
    fruit: [
        { id: 24, img: "images_kids/aardbei.jpeg" },
        { id: 25, img: "images_kids/ananas.jpeg" },
        { id: 26, img: "images_kids/appel.jpeg" },
        { id: 27, img: "images_kids/banaan.jpeg" },
        { id: 28, img: "images_kids/kiwi.jpeg" },
        { id: 29, img: "images_kids/perzik.jpeg" },
        { id: 30, img: "images_kids/mango.jpeg" },
        { id: 31, img: "images_kids/meloen.jpeg" },
        { id: 32, img: "images_kids/watermeloen.jpeg" },
        { id: 33, img: "images_kids/meloen..jpeg" },
        { id: 34, img: "images_kids/nectarine.jpeg" },
    ],
    sporten: [
        { id: 35, img: "images_kids/atletiek.jpeg" },
        { id: 36, img: "images_kids/basketbal.jpeg" },
        { id: 37, img: "images_kids/dansen.jpeg" },
        { id: 38, img: "images_kids/hockey.jpeg" },
        { id: 39, img: "images_kids/honkbal.jpeg" },
        { id: 40, img: "images_kids/tennis.jpeg" },
        { id: 41, img: "images_kids/voetbal.jpg" },
        { id: 42, img: "images_kids/zwemmen.jpeg" },
    ],
    ruimte: [
        { id: 43, img: "images_kids/venus.jpeg" },
        { id: 44, img: "images_kids/mars.jpeg" },
        { id: 45, img: "images_kids/aarde.jpeg" },
        { id: 46, img: "images_kids/saturnus.jpeg"},
        { id: 47, img: "images_kids/neptunus.jpeg"},
        { id: 48, img: "images_kids/pluto.jpeg"},
        { id: 49, img: "images_kids/uranus.jpeg"},
        { id: 50, img: "images_kids/jupiter.jpeg"},
        { id: 51, img: "images_kids/asteroid.jpeg"},
        { id: 52, img: "images_kids/maan.jpeg"},
        { id: 53, img: "images_kids/zon.jpeg"},
        { id: 54, img: "images_kids/mercurius.jpeg"},
        { id: 55, img: "images_kids/galaxy.jpeg"},
        { id: 56, img: "images_kids/comet.jpeg"},
        { id: 57, img: "images_kids/blackhole.jpeg"},
    ],
    pizza: [
        { id: 58, img: "images_kids/pizza.bqqchicken.jpeg" },
        { id: 59, img: "images_kids/pizza.funghi.jpeg" },
        { id: 60, img: "images_kids/pizza.hawaii.jpeg" },
        { id: 61, img: "images_kids/pizza.margherita.jpeg" },
        { id: 62, img: "images_kids/pizza.pepperoni.jpeg" },
        { id: 63, img: "images_kids/pizza.quattroformaggi.jpeg" },
        { id: 64, img: "images_kids/pizza.quattrostagioni.jpeg" },
        { id: 65, img: "images_kids/pizza.salami.jpeg" },
    ],
};

const urlParams = new URLSearchParams(window.location.search);
const theme = urlParams.get('theme');

let selectedCards = cards[theme];

console.log('Gekozen thema:', theme);
console.log('Selected cards:', selectedCards);

const gameBoard = document.getElementById("gameBoard");
const startGameButton = document.getElementById("startGame");
const restartButton = document.getElementById("restartButton");

let flippedCards = [];
let matchedCards = 0;
const totalPairs = selectedCards ? selectedCards.length : 0; 

function createGameBoard() {
    if (!selectedCards);

    const shuffledCards = [...selectedCards, ...selectedCards].sort(() => Math.random() - 0.5); 
    gameBoard.innerHTML = ""; 

    shuffledCards.forEach((card) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.dataset.id = card.id;

        const frontFace = document.createElement("img");
        frontFace.src = card.img;
        frontFace.classList.add("front-face");

        const backFace = document.createElement("div");
        backFace.classList.add("back-face");

        cardElement.appendChild(frontFace);
        cardElement.appendChild(backFace);
        gameBoard.appendChild(cardElement);

        cardElement.addEventListener("click", () => flipCard(cardElement));
    });
}

function flipCard(card) {
    if (card.classList.contains("flipped") || card.classList.contains("matched")) return;
    card.classList.add("flipped");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.id === card2.dataset.id) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedCards += 1; 
        checkGameOver();  
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
        }, 1000);
    }
    flippedCards = [];  
}

function checkGameOver() {
    if (matchedCards === totalPairs) { 
        startGameButton.style.display = "none";
        restartButton.style.display = "inline-block";
    }
}

startGameButton.addEventListener("click", () => {
    createGameBoard();
    startGameButton.style.display = "none";  
    restartButton.style.display = "inline-block";  
});

restartButton.addEventListener("click", () => {
    flippedCards = [];
    matchedCards = 0;
    createGameBoard();  
});
