// Tworzymy kształty SVG oraz przypisujemy do nich kolory
const shapes = [
    { shape: 'circle', color: 'red' },
    { shape: 'rect', color: 'blue' },
    { shape: 'polygon', color: 'green' },
    { shape: 'ellipse', color: 'orange' },
    { shape: 'circle', color: 'purple' },
    { shape: 'rect', color: 'pink' }
];

// Duplikujemy kształty, aby stworzyć pary
let cardsArray = [...shapes, ...shapes];

// Tasujemy karty
cardsArray = cardsArray.sort(() => 0.5 - Math.random());

let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Tworzymy planszę
const gameBoard = document.getElementById('game-board');
cardsArray.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.index = index;
    cardElement.dataset.shape = card.shape;
    cardElement.dataset.color = card.color;

    const svgElement = createSVGShape(card.shape, card.color);
    cardElement.appendChild(svgElement);
    gameBoard.appendChild(cardElement);

    cardElement.addEventListener('click', flipCard);
});

// Funkcja tworząca element SVG dla kształtu
function createSVGShape(shape, color) {
    const svgNS = "http://www.w3.org/2000/svg";
    let svgElement = document.createElementNS(svgNS, 'svg');

    if (shape === 'circle') {
        const circle = document.createElementNS(svgNS, 'circle');
        circle.setAttribute('cx', 40);
        circle.setAttribute('cy', 40);
        circle.setAttribute('r', 30);
        circle.setAttribute('fill', color);
        svgElement.appendChild(circle);
    } else if (shape === 'rect') {
        const rect = document.createElementNS(svgNS, 'rect');
        rect.setAttribute('width', 80);
        rect.setAttribute('height', 80);
        rect.setAttribute('fill', color);
        svgElement.appendChild(rect);
    } else if (shape === 'polygon') {
        const polygon = document.createElementNS(svgNS, 'polygon');
        polygon.setAttribute('points', '40,10 70,70 10,70');
        polygon.setAttribute('fill', color);
        svgElement.appendChild(polygon);
    } else if (shape === 'ellipse') {
        const ellipse = document.createElementNS(svgNS, 'ellipse');
        ellipse.setAttribute('cx', 40);
        ellipse.setAttribute('cy', 50);
        ellipse.setAttribute('rx', 30);
        ellipse.setAttribute('ry', 20);
        ellipse.setAttribute('fill', color);
        svgElement.appendChild(ellipse);
    }

    return svgElement;
}

// Funkcja obsługująca obracanie kart
function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

// Sprawdzamy, czy karty pasują do siebie
function checkForMatch() {
    const isMatch = firstCard.dataset.shape === secondCard.dataset.shape &&
        firstCard.dataset.color === secondCard.dataset.color;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

// Funkcja dezaktywująca dopasowane karty
function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    resetBoard();
}

// Funkcja odwracająca z powrotem niedopasowane karty
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

// Resetowanie stanu planszy
function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}
