let startTime;
let timerInterval;
let timeElapsed = 0;

const difficultyBtns = document.querySelectorAll(".difficulty-btn");
const rulesBtn = document.querySelector(".rules-btn");
const startBtn = document.querySelector(".start-btn");
const playerNameInput = document.querySelector(".name-input");
const playerNameDisplay = document.querySelector(".player-info span");
const mainMenu = document.querySelector(".menu-screen");
const gameScreen = document.querySelector(".game-screen");
const elapsedTimeDisplay = document.querySelector(".player-info #elapsed-time");


function showRulesModal() {
    const rulesModal = document.querySelector('.rules-modal');
    rulesModal.classList.remove('hidden'); 
}

document.querySelector('.rules-btn').addEventListener('click', showRulesModal);

function closeRulesModal() {
    const rulesModal = document.querySelector('.rules-modal');
    rulesModal.classList.add('hidden'); 
}

document.querySelector('#close-rules-btn').addEventListener('click', closeRulesModal);

timerInterval = setInterval(() => {
    timeElapsed++;
}, 1000);

document.querySelector('#go-back-btn-win').addEventListener('click', () => {
    console.log('Go Back from Win');
    document.querySelector('.game-screen').classList.add('hidden');
    document.querySelector('#main-menu').classList.remove('hidden');
    document.querySelector('#game-win-modal').classList.add('hidden');
});

document.querySelector('#go-back-btn-over').addEventListener('click', () => {
    console.log('Go Back from Game Over');
    document.querySelector('.game-screen').classList.add('hidden');
    document.querySelector('#main-menu').classList.remove('hidden');
    document.querySelector('#game-over-modal').classList.add('hidden');
});


difficultyBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        difficultyBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
    });
});

rulesBtn.addEventListener("click", () => {
});

startBtn.addEventListener("click", () => {
    const playerName = playerNameInput.value.trim();
    const selectedDifficulty = document.querySelector(".difficulty-btn.active").textContent;

    if (!playerName) {
        return;
    }

    playerNameDisplay.textContent = playerName.toUpperCase();
    mainMenu.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    startGame(selectedDifficulty.includes("7") ? 7 : 5);
    startTimer();
});

function startTimer() {
    let minutes = 2;
    let seconds = 0;
    
    const timing = setInterval(() => {
        if (minutes === 0 && seconds === 0) {
            clearInterval(timing);
            endGame2();
            return;
        }

        if (seconds === 0) {
            seconds = 59;
            minutes--;
        } else {
            seconds--;
        }

        elapsedTimeDisplay.textContent = 
            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}

function showGameWinModal(timeTaken) {
    const gameWinModal = document.querySelector('#game-win-modal');
    const totalTime = gameWinModal.querySelector('#total-time');
    totalTime.textContent = timeTaken; 
    gameWinModal.classList.remove('hidden'); 
}

function showGameOverModal () {
    const gameOverModal = document.querySelector('#game-over-modal');
    gameOverModal.classList.remove('hidden');
}

function calculateTimeTaken(startTime, endTime) {
    const timeDifference = endTime - startTime; 

    const seconds = Math.floor(timeDifference / 1000);
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes} minutes and ${remainingSeconds} seconds`;
}

function endGame1() {
    const endTime = new Date(); 
    const timeTaken = calculateTimeTaken(startTime, endTime); 
    showGameWinModal(timeTaken);
}

function endGame2() {
    showGameOverModal();
}

function startGame(gridSize) {
    startTime = new Date();
    //showGameWinModal(startTime);
    const canvas = document.querySelector(".game-board");
    const ctx = canvas.getContext("2d");
    
    let mapData = {};
    let rotateData = {};

    const cellSize = 500 / gridSize;

    canvas.height = 500;
    canvas.width = 500;

    const railwayImages = [
        'starter_eng/pics/tiles/curve_rail.png',
        'starter_eng/pics/tiles/straight_rail.png',
        'starter_eng/pics/tiles/bridge_rail.png',
        'starter_eng/pics/tiles/mountain_rail.png'
    ];

    const validReplacementsByType = {
        0: [railwayImages[0], railwayImages[1], railwayImages[2], railwayImages[3]],    
        1: [railwayImages[2]],
        2: [railwayImages[3]],
        3: []
    };

    const cellStates = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));
    const cellRotates = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));
    const maps5x5 = [
        'starter_eng/pics/levels/easy/level_e1.png',
        'starter_eng/pics/levels/easy/level_e2.png',
        'starter_eng/pics/levels/easy/level_e3.png',
        'starter_eng/pics/levels/easy/level_e4.png',
        'starter_eng/pics/levels/easy/level_e5.png',
    ];
    
    const maps7x7 = [
        'starter_eng/pics/levels/hard/level_d1.png',
        'starter_eng/pics/levels/hard/level_d2.png',
        'starter_eng/pics/levels/hard/level_d3.png',
        'starter_eng/pics/levels/hard/level_d4.png',
        'starter_eng/pics/levels/hard/level_d5.png',
    ];

    const selectedMap = gridSize === 5 
        ? maps5x5[Math.floor(Math.random() * maps5x5.length)]
        : maps7x7[Math.floor(Math.random() * maps7x7.length)];

    switch (selectedMap) {
        case 'starter_eng/pics/levels/easy/level_e1.png':
            mapData = [
                [0, 2, 0, 0, 3],
                [0, 0, 0, 1, 3],
                [1, 0, 2, 0, 0],
                [0, 0, 0, 3, 0],
                [0, 0, 2, 0, 0]
            ];
            rotateData = [
                [0, 90, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 180, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 270, 0, 0]
            ];
            break;
        case 'starter_eng/pics/levels/easy/level_e2.png':
            mapData = [
                [3, 0, 1, 0, 0],
                [0, 2, 0, 0, 2],
                [1, 3, 2, 0, 0],
                [0, 0, 0, 3, 0],
                [0, 0, 0, 0, 0]
            ];
            rotateData = [
                [0, 0, 90, 0, 0],
                [0, 180, 0, 0, 180],
                [0, 0, 270, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ];
            break;
        case 'starter_eng/pics/levels/easy/level_e3.png':
            mapData = [
                [0, 0, 1, 0, 0],
                [0, 0, 0, 0, 1],
                [0, 2, 1, 0, 0],
                [0, 3, 0, 0, 0],
                [0, 1, 0, 0, 2]
            ];
            rotateData = [
                [0, 0, 90, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 180, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 90, 0, 0, 180]
            ];
            break;
        case 'starter_eng/pics/levels/easy/level_e4.png':
            mapData = [
                [0, 0, 0, 1, 0],
                [0, 0, 0, 0, 0],
                [1, 0, 2, 0, 2],
                [0, 0, 0, 0, 0],
                [0, 0, 3, 2, 0]
            ];
            rotateData = [
                [0, 0, 0, 90, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 90, 0, 90],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 270, 0]
            ];
            break;
        case 'starter_eng/pics/levels/easy/level_e5.png':
            mapData = [
                [0, 0, 1, 0, 0],
                [0, 2, 0, 0, 0],
                [1, 0, 0, 2, 0],
                [0, 0, 1, 3, 0],
                [0, 2, 0, 0, 0]
            ];
            rotateData = [
                [0, 0, 90, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 270, 0],
                [0, 0, 0, 0, 0],
                [0, 180, 0, 0, 0]
            ];
            break;

        case 'starter_eng/pics/levels/hard/level_d1.png':
            mapData = [
                [0, 2, 3, 3, 0, 1, 0],
                [1, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0, 0, 0],
                [0, 0, 0, 2, 0, 0, 0],
                [2, 0, 2, 0, 1, 0, 3],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 0, 0]
            ];
            rotateData = [
                [0, 90, 0, 0, 0, 90, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 270, 0, 0, 0],
                [270, 0, 90, 0, 90, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 90, 0, 0, 0]
            ];
            break;
        case 'starter_eng/pics/levels/hard/level_d2.png':
            mapData = [
                [0, 0, 3, 0, 0, 0, 0],
                [1, 0, 1, 0, 0, 2, 0],
                [0, 0, 1, 0, 0, 0, 1],
                [2, 0, 0, 0, 0, 0, 0],
                [0, 3, 0, 2, 0, 0, 0],
                [0, 2, 0, 0, 0, 0, 0],
                [0, 0, 3, 0, 0, 0, 0]
            ];
            rotateData = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 90, 0, 0, 180, 0],
                [0, 0, 90, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 90, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ];
            break;
        case 'starter_eng/pics/levels/hard/level_d3.png':
            mapData = [
                [0, 0, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 1],
                [3, 0, 2, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 3, 2, 0, 1, 0, 0],
                [1, 0, 0, 0, 0, 2, 0],
                [0, 0, 3, 2, 0, 0, 0]
            ];
            rotateData = [
                [0, 0, 90, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [3, 0, 270, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 270, 0, 90, 0, 0],
                [0, 0, 0, 0, 0, 90, 0],
                [0, 0, 0, 270, 0, 0, 0]
            ];
            break;
        case 'starter_eng/pics/levels/hard/level_d4.png':
            mapData = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 2, 0],
                [0, 0, 2, 0, 0, 0, 0],
                [0, 1, 0, 3, 0, 1, 0],
                [0, 0, 2, 0, 2, 0, 0],
                [1, 0, 0, 0, 0, 2, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ];
            rotateData = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 180, 0],
                [0, 0, 270, 0, 0, 0, 0],
                [0, 90, 0, 0, 0, 90, 0],
                [0, 0, 180, 0, 90, 0, 0],
                [0, 0, 0, 0, 0, 270, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ];
            break;
        case 'starter_eng/pics/levels/hard/level_d5.png':
            mapData = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 2, 0],
                [0, 1, 1, 0, 2, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 2, 0, 3, 0, 0],
                [0, 2, 0, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ];
            rotateData = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 90, 90, 0, 90, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 180, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ];
            break;
    }

    //console.log(selectedMap)
    const backgroundImage = new Image();
    backgroundImage.src = selectedMap;
    backgroundImage.onload = () => {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        //drawGrid();
        //drawAllCells();
    };


    function drawCell(x, y, state, rotateSt) {
        ctx.clearRect(x * cellSize, y * cellSize, cellSize, cellSize);
        if (state > 0) {
            const railwayImage = new Image();
            railwayImage.src = validReplacementsByType[mapData[y][x]][state-1];
            railwayImage.onload = () => {
                ctx.save();
                const centerX = x*cellSize + cellSize/2;
                const centerY = y*cellSize + cellSize/2;
                ctx.translate(centerX, centerY);
                ctx.rotate((rotateSt*Math.PI)/180);
                ctx.drawImage(
                    railwayImage,
                    -cellSize/2,
                    -cellSize/2,
                    cellSize,
                    cellSize
                );
                ctx.restore();
            };
        }
        else {
            ctx.drawImage(
                backgroundImage,
                x * 100, y * 100,
                100, 100,
                x * cellSize, y * cellSize,
                cellSize, cellSize
            );
        }
    }

    canvas.addEventListener("click", (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((event.clientX - rect.left) / cellSize);
        const y = Math.floor((event.clientY - rect.top) / cellSize);
        if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
            cellStates[y][x] = (cellStates[y][x] + 1) % (validReplacementsByType[mapData[y][x]].length+1);
            if (mapData[y][x] === 1 || mapData[y][x] === 2) {
                cellRotates[y][x] = rotateData[y][x];
            }
            drawCell(x, y, cellStates[y][x], cellRotates[y][x]);
        }
        if (checkWinning()) {
            canvas.style.pointerEvents = "none"; 
            clearInterval(timerInterval);
            timerInterval = null;
            endGame1();
        }
    });

    canvas.addEventListener("contextmenu", (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((event.clientX - rect.left) / cellSize);
        const y = Math.floor((event.clientY - rect.top) / cellSize);
        
        if (mapData[y][x] == 1 || mapData[y][x] == 2) {
            return;
        }
        event.preventDefault();
    
        if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
            if (cellStates[y][x] > 0) {
                cellRotates[y][x] = (cellRotates[y][x] + 90) % 360;
    
                drawCell(x, y, cellStates[y][x], cellRotates[y][x]);
            }
        }
        if (checkWinning()) {
            canvas.style.pointerEvents = "none"; 
            clearInterval(timerInterval);
            timerInterval = null;
            endGame1();
        }
    });
    
    function checkWinning () {
        const visited = Array.from({ length: gridSize }, () => Array(gridSize).fill(false));

        function inside (x, y) {
            return (0 <= x && x < gridSize && 0 <= y && y < gridSize && mapData[x][y] != 3);
        }

        let startX = 0;
        let startY = 0;
        
        let find = false;

        for (let i = 0; i < gridSize && !find; i++) {
            for (let j = 0; j < gridSize && !find; j++) {
                if (mapData[i][j] != 3) {
                    startX = i;
                    startY = j;
                    find = true;
                }
            }
        }

        const queue = [[startX, startY]]
        // const railwayImages = [
        //     'starter_eng/pics/tiles/curve_rail.png',
        //     'starter_eng/pics/tiles/straight_rail.png',
        //     'starter_eng/pics/tiles/bridge_rail.png',
        //     'starter_eng/pics/tiles/mountain_rail.png'
        // ];

        while (queue.length > 0) {
            const [x, y] = queue.shift();
            const state = cellStates[x][y];
            const rotate = cellRotates[x][y];
            //console.log(x, y, state);
            if (state === 0) return false;
            let newX1, newY1, newX2, newY2;
            switch (validReplacementsByType[mapData[x][y]][state-1]) {
                case (railwayImages[3]):
                case (railwayImages[0]):
                    if (rotate === 0) {
                        newX1 = x+1;
                        newY1 = y;
                        newX2 = x;
                        newY2 = y+1;
                    }
                    else if (rotate === 90) {
                        newX1 = x+1;
                        newY1 = y;
                        newX2 = x;
                        newY2 = y-1;
                    }
                    else if (rotate === 180) {
                        newX1 = x;
                        newY1 = y-1;
                        newX2 = x-1;
                        newY2 = y;
                    }
                    else {
                        newX1 = x-1;
                        newY1 = y;
                        newX2 = x;
                        newY2 = y+1;
                    }
                    break;
                case (railwayImages[1]):
                case (railwayImages[2]):
                    if (rotate === 0 || rotate === 180) {
                        newX1 = x-1;
                        newY1 = y;
                        newX2 = x+1;
                        newY2 = y;
                    }
                    if (rotate === 90 || rotate === 270) {
                        newX1 = x;
                        newY1 = y-1;
                        newX2 = x;
                        newY2 = y+1;
                    }
                    break;
            }
            // console.log(visited[x][y], newX1, newY1, newX2, newY2, rotate, mapData[x][y], state, validReplacementsByType[mapData[x][y]][state-1]);
            // console.log(inside(newX1, newY1), inside(newX2, newY2), visited[newX1][newY1], visited[newX2][newY2]);
            if (!inside(newX1, newY1) || !inside(newX2, newY2)) return false;
            if (x === startX && y === startY) {
                visited[newX1][newY1] = true;
                queue.push([newX1, newY1]);
            }
            else if (!visited[newX1][newY1] && !visited[newX2][newY2] && ((newX1 != startX || newY1 != startY) && (newX2 != startX || newY2 != startY))) return false;
            else {
                if (newX1 === startX && newY1 === startY) {
                    if (!visited[newX2][newY2]) {
                        visited[newX2][newY2] = true;
                        queue.push([newX2, newY2]);
                    }
                    else {
                        visited[startX][startY] = true;
                        break;
                    }
                }
                else if (newX2 === startX && newY2 === startY) {
                    if (!visited[newX1][newY1]) {
                        visited[newX1][newY1] = true;
                        queue.push([newX1, newY1]);
                    }
                    else {
                        visited[startX][startY] = true;
                        break;
                    }
                }
                else {
                    if (!visited[newX1][newY1]) {
                        visited[newX1][newY1] = true;
                        queue.push([newX1, newY1]);
                    }
                    else if (!visited[newX2][newY2]) {
                        visited[newX2][newY2] = true;
                        queue.push([newX2, newY2]);
                    }
                    else break;
                }
            }
        }
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (mapData[i][j] != 3 && !visited[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }
}

