const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20; // Dimensione di ogni blocco del serpente
const canvasSize = 400; // Dimensione del canvas
canvas.width = canvasSize;
canvas.height = canvasSize;

let snake = [];
snake[0] = { x: 9 * box, y: 10 * box }; // Posizione iniziale del serpente

let direction;
let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
};

let score = 0;

// Controlla la direzione del serpente
document.addEventListener("keydown", directionControl);

function directionControl(event) {
    if (event.keyCode == 37 && direction != "RIGHT") {
        direction = "LEFT";
    } else if (event.keyCode == 38 && direction != "DOWN") {
        direction = "UP";
    } else if (event.keyCode == 39 && direction != "LEFT") {
        direction = "RIGHT";
    } else if (event.keyCode == 40 && direction != "UP") {
        direction = "DOWN";
    }
}

// Controlla se il serpente ha colpito un muro o sé stesso
function collision(newHead, snake) {
    for (let i = 0; i < snake.length; i++) {
        if (newHead.x == snake[i].x && newHead.y == snake[i].y) {
            return true;
        }
    }
    return newHead.x < 0 || newHead.x >= canvasSize || newHead.y < 0 || newHead.y >= canvasSize;
}

// Disegna il serpente e il cibo
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Posizione della testa
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Direzione del serpente
    if (direction == "LEFT") snakeX -= box;
    if (direction == "UP") snakeY -= box;
    if (direction == "RIGHT") snakeX += box;
    if (direction == "DOWN") snakeY += box;

    // Se il serpente mangia il cibo
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
    } else {
        snake.pop(); // Rimuovi l'ultima parte del serpente
    }

    const newHead = {
        x: snakeX,
        y: snakeY
    };

    // Game over
    if (collision(newHead, snake)) {
        clearInterval(game);
        alert("Game Over! Score: " + score);
    }

    snake.unshift(newHead); // Aggiungi nuova testa al serpente

    // Mostra il punteggio
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2 * box, 1.6 * box);
}

// Imposta la velocità del gioco
const game = setInterval(draw, 100);