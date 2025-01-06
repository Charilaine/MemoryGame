const cards = {
    toerisme: [  
    { id: 1, img: "images_ouderen/belgie.jpeg" },
    { id: 2, img: "images_ouderen/curacao.jpeg" },
    { id: 3, img: "images_ouderen/duitsland.jpeg" },
    { id: 4, img: "images_ouderen/londen.jpeg" },
    { id: 5, img: "images_ouderen/nederland.jpeg" },
    { id: 6, img: "images_ouderen/newyork.jpeg" },
    { id: 7, img: "images_ouderen/parijs.jpeg" },
    { id: 8, img: "images_ouderen/rome.jpeg" },
    { id: 9, img: "images_ouderen/spanje.jpeg" }
],

    bloemen: [
        { id: 10, img: "images_ouderen/anemone.jpeg"},
        { id: 11, img: "images_ouderen/camelia.jpeg"},
        { id: 12, img: "images_ouderen/dahlia.jpeg"},
        { id: 13, img: "images_ouderen/hortensia.jpeg"},
        { id: 14, img: "images_ouderen/narcis.jpeg"},
        { id: 15, img: "images_ouderen/ranunculus.jpeg"},
        { id: 16, img: "images_ouderen/roos.jpeg"},
        { id: 17, img: "images_ouderen/tulp.jpeg"},
        { id: 18, img: "images_ouderen/zonnebloem.jpeg"}
    ],

    seizoenen: [
        { id: 19, img: "images_ouderen/halloween.jpeg"},
        { id: 20, img: "images_ouderen/herfst.jpeg"},
        { id: 21, img: "images_ouderen/kerst.jpeg"},
        { id: 22, img: "images_ouderen/lente.jpeg"},
        { id: 23, img: "images_ouderen/nye.jpeg"},
        { id: 24, img: "images_ouderen/sinterklaas.jpeg"},
        { id: 25, img: "images_ouderen/winter.jpeg"},
        { id: 26, img: "images_ouderen/zomer.jpeg"},
        { id: 27, img: "images_ouderen/pasen.jpeg"},
    ],

    schilderijen: [
        { id: 28, img: "images_ouderen/artello.png"},
        { id: 29, img: "images_ouderen/cipressen.jpg"},
        { id: 30, img: "images_ouderen/meisjeparel.jpeg"},
        { id: 31, img: "images_ouderen/melkmeisje.webp"},
        { id: 32, img: "images_ouderen/nachtwacht.jpeg"},
        { id: 33, img: "images_ouderen/sandro.webp"},
        { id: 34, img: "images_ouderen/sterrennacht.jpeg"},
        { id: 35, img: "images_ouderen/zonnebloemen.jpg"},
        { id: 36, img: "images_ouderen/zwaan.jpg"},
        
       
    ],

    safari: [
        { id: 37, img: "images_ouderen/arizona.webp" },
        { id: 38, img: "images_ouderen/giraffe.jpeg" },
        { id: 39, img: "images_ouderen/leeuw.jpg" },
        { id: 40, img: "images_ouderen/olifant.jpeg" },
        { id: 41, img: "images_ouderen/olifant.jpg" },
        { id: 42, img: "images_ouderen/safari.jpeg" },
        { id: 43, img: "images_ouderen/tijger.jpg" },
        { id: 44, img: "images_ouderen/zebra.webp" },
        { id: 45, img: "images_ouderen/tour.jpeg" },
    ],

    barcelona: [
        { id: 46, img: "images_ouderen/strand.jpeg"},
        { id: 47, img: "images_ouderen/fc.jpeg"},
        { id: 48, img: "images_ouderen/kathedraal.jpeg"},
        { id: 49, img: "images_ouderen/stad.jpeg"},
        { id: 50, img: "images_ouderen/park.jpeg"},
        { id: 51, img: "images_ouderen/paleis.jpeg"},
        { id: 52, img: "images_ouderen/park2.jpeg"},
        { id: 53, img: "images_ouderen/mooi.jpeg"},
        { id: 54, img: "images_ouderen/voetbal.jpeg"},
        
       
    ]
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
