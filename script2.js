const cards = {
    auto: [  
    { id: 1, img: "images_volwassen/audi.jpeg" },
    { id: 2, img: "images_volwassen/bmw.jpeg" },
    { id: 3, img: "images_volwassen/citroen.jpeg" },
    { id: 4, img: "images_volwassen/fiat.jpeg" },
    { id: 5, img: "images_volwassen/mercedes.jpeg" },
    { id: 6, img: "images_volwassen/peugot.jpeg" },
    { id: 7, img: "images_volwassen/porsche.jpeg" },
    { id: 8, img: "images_volwassen/rangerover.jpeg" },
    { id: 9, img: "images_volwassen/renault.jpeg" }
],

    duitsland: [
        { id: 10, img: "images_volwassen/berlijn.jpeg"},
        { id: 11, img: "images_volwassen/b.jpeg"},
        { id: 12, img: "images_volwassen/d.jpeg"},
        { id: 13, img: "images_volwassen/dd.jpeg"},
        { id: 14, img: "images_volwassen/duitsland.png"},
        { id: 15, img: "images_volwassen/frankfurt.jpeg"},
        { id: 16, img: "images_volwassen/hamburg.jpeg"},
        { id: 17, img: "images_volwassen/munchen.jpeg"},
        { id: 18, img: "images_volwassen/winterberg.jpeg"}
    ],

    technologie: [
        { id: 19, img: "images_volwassen/airpods.jpeg"},
        { id: 20, img: "images_volwassen/error.jpeg"},
        { id: 21, img: "images_volwassen/ipad.jpeg"},
        { id: 22, img: "images_volwassen/iphone.jpeg"},
        { id: 23, img: "images_volwassen/koptelefoon.jpeg"},
        { id: 24, img: "images_volwassen/sterrenkijker.jpeg"},
        { id: 25, img: "images_volwassen/technologie.jpeg"},
        { id: 26, img: "images_volwassen/wifi.png"},
    ],

    beroepen: [
        { id: 27, img: "images_volwassen/arts.jpeg" },
        { id: 28, img: "images_volwassen/boer.jpeg" },
        { id: 29, img: "images_volwassen/brandweer.jpeg" },
        { id: 30, img: "images_volwassen/chef.jpeg" },
        { id: 31, img: "images_volwassen/dierenarts.jpeg" },
        { id: 32, img: "images_volwassen/dj.jpeg" },
        { id: 33, img: "images_volwassen/politie.jpeg" },
        { id: 34, img: "images_volwassen/psycholoog.jpeg" },
        { id: 35, img: "images_volwassen/vlogger.jpeg" },
        { id: 36, img: "images_volwassen/woman.jpeg" }
    ],

    newyork: [
        { id: 37, img: "images_volwassen/ts.jpeg" },
        { id: 38, img: "images_volwassen/liberty.jpeg" },
        { id: 39, img: "images_volwassen/n.jpeg" },
        { id: 40, img: "images_volwassen/y.jpeg" },
        { id: 41, img: "images_volwassen/ny.jpeg" },
        { id: 42, img: "images_volwassen/u.jpeg" },
        { id: 43, img: "images_volwassen/nyc.jpeg" },
        { id: 44, img: "images_volwassen/manhatten.jpeg" },
        { id: 45, img: "images_volwassen/centralpark.jpeg" },
    ],

    f1: [
        { id: 46, img: "images_volwassen/zandvoort.png"},
        { id: 47, img: "images_volwassen/monaco.png"},
        { id: 48, img: "images_volwassen/monza.png"},
        { id: 49, img: "images_volwassen/spa.png"},
        { id: 50, img: "images_volwassen/barcelona.png"},
        { id: 51, img: "images_volwassen/abudhabi.png"},
        { id: 52, img: "images_volwassen/canada.png"},
        { id: 53, img: "images_volwassen/vegas.png"},
        { id: 54, img: "images_volwassen/silverstone.png"},
        
       
    ]
};
const urlParams = new URLSearchParams(window.location.search);
const theme = urlParams.get('theme');

let selectedCards = cards[theme];

const gameBoard = document.getElementById("gameBoard");
const startGameButton = document.getElementById("startGame");
const restartButton = document.getElementById("restartButton");

let flippedCards = [];
let matchedCards = 0;
const totalPairs = selectedCards.length ; 

function createGameBoard() {
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