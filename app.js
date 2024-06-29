document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById('gameBoard');
    const scoreDisplay = document.getElementById('score');
    const boardSize = 20;
    const cells = [];
    let snake = [{ x: 10, y: 10 }];
    let direction = { x: 0, y: 0 };
    let food = { x: 15, y: 15 };
    let score = 0;
    let gameInterval;
    let foodInterval;

    // Initialize the game board
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            gameBoard.appendChild(cell);
            cells.push(cell);
        }
    }

    function draw() {
        cells.forEach(cell => cell.classList.remove('snake', 'food'));
        snake.forEach(segment => {
            const index = segment.y * boardSize + segment.x;
            cells[index].classList.add('snake');
        });
        const foodIndex = food.y * boardSize + food.x;
        cells[foodIndex].classList.add('food');
    }

    function update() {
        const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

        // Check for wall collision
        if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize) {
            return gameOver();
        }

        // Check for self collision
        for (let i = 1; i < snake.length; i++) {
            if (snake[i].x === head.x && snake[i].y === head.y) {
                return gameOver();
            }
        }

        snake.unshift(head);

        // Check for food collision
        if (head.x === food.x && head.y === food.y) {
            score++;
            scoreDisplay.innerText = `Score: ${score}`;
            generateFood();
        } else {
            snake.pop();
        }

        draw();
    }

    function generateFood() {
        let newFood;
        do {
            newFood = {
                x: Math.floor(Math.random() * boardSize),
                y: Math.floor(Math.random() * boardSize)
            };
        } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
        food = newFood;
    }

    function changeDirection(event) {
        switch (event.key) {
            case 'ArrowUp':
                if (direction.y === 0) direction = { x: 0, y: -1 };
                break;
            case 'ArrowDown':
                if (direction.y === 0) direction = { x: 0, y: 1 };
                break;
            case 'ArrowLeft':
                if (direction.x === 0) direction = { x: -1, y: 0 };
                break;
            case 'ArrowRight':
                if (direction.x === 0) direction = { x: 1, y: 0 };
                break;
        }
    }

    function moveFood() {
        generateFood();
    }

    function gameOver() {
        clearInterval(gameInterval);
        clearInterval(foodInterval);
        alert(`Game Over! Your score: ${score}`);
        resetGame();
    }

    function resetGame() {
        snake = [{ x: 10, y: 10 }];
        direction = { x: 0, y: 0 };
        score = 0;
        scoreDisplay.innerText = `Score: ${score}`;
        generateFood();
        gameInterval = setInterval(update, 200);
        foodInterval = setInterval(moveFood, 5000);
    }

    document.addEventListener('keydown', changeDirection);
    resetGame();
    draw();
});
