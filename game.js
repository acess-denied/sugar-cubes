// Game State
let gameState = {
    isRunning: false,
    isPaused: false,
    glucose: 120,
    score: 0,
    timeLeft: 60,
    normalGlucoseTimer: 0,
    activebubbles: 0,
    maxBubbles: 8
};

const gameArea = document.getElementById('game-area');
const glucoseDisplay = document.getElementById('glucose-display');
const scoreDisplay = document.getElementById('score-display');
const timeDisplay = document.getElementById('time-display');
const glucoseMarker = document.getElementById('glucose-marker');
const warningBox = document.getElementById('warning-box');

let gameLoopInterval;
let spawnInterval;
let updateInterval;
let glucoseCheckInterval;

// Start Game
document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('pause-btn').addEventListener('click', togglePause);
document.getElementById('restart-btn').addEventListener('click', restartGame);

function startGame() {
    gameState.isRunning = true;
    gameState.isPaused = false;
    document.getElementById('start-btn').disabled = true;
    document.getElementById('pause-btn').disabled = false;
    document.getElementById('restart-btn').disabled = false;
    
    // Clear any existing bubbles
    gameArea.innerHTML = '';
    gameState.activebubbles = 0;
    
    // Start game loops
    spawnInterval = setInterval(spawnBubble, 2000);
    updateInterval = setInterval(updateGame, 100);
    glucoseCheckInterval = setInterval(checkGlucoseStatus, 500);
}

function togglePause() {
    gameState.isPaused = !gameState.isPaused;
    document.getElementById('pause-btn').textContent = gameState.isPaused ? 'RESUME' : 'PAUSE';
}

function restartGame() {
    clearAllIntervals();
    gameState = {
        isRunning: false,
        isPaused: false,
        glucose: 120,
        score: 0,
        timeLeft: 60,
        normalGlucoseTimer: 0,
        activebubbles: 0,
        maxBubbles: 8
    };
    
    gameArea.innerHTML = '';
    updateDisplay();
    document.getElementById('start-btn').disabled = false;
    document.getElementById('pause-btn').disabled = true;
    document.getElementById('restart-btn').disabled = true;
    warningBox.style.display = 'none';
    document.getElementById('game-over-screen').style.display = 'none';
}

function spawnBubble() {
    if (!gameState.isRunning || gameState.isPaused) return;
    
    if (gameState.activebubbles < gameState.maxBubbles) {
        const bubbleData = getRandomBubble();
        const bubbleElement = createBubbleElement(bubbleData);
        gameArea.appendChild(bubbleElement);
        gameState.activeBubbles = gameArea.children.length;
    }
}

function popBubble(element, bubbleData) {
    if (!gameState.isRunning || gameState.isPaused) return;
    
    // Remove bubble
    element.remove();
    gameState.activebubbles = gameArea.children.length;
    
    // Apply glucose effect
    gameState.glucose += bubbleData.effect;
    gameState.glucose = Math.max(0, Math.min(400, gameState.glucose));
    
    // Award points
    gameState.score += 10;
    
    // Show explanation popup
    showExplanationPopup(bubbleData);
    
    // Update display
    updateDisplay();
}

function showExplanationPopup(bubbleData) {
    document.getElementById('popup-title').textContent = bubbleData.label;
    document.getElementById('popup-explanation').textContent = bubbleData.explanation;
    
    const effectSign = bubbleData.effect > 0 ? '+' : '';
    document.getElementById('popup-effect').textContent = `Effect: ${effectSign}${bubbleData.effect} mg/dL`;
    
    document.getElementById('explanation-popup').style.display = 'flex';
    
    setTimeout(() => {
        document.getElementById('explanation-popup').style.display = 'none';
    }, 3000);
}

function closePopup() {
    document.getElementById('explanation-popup').style.display = 'none';
}

function updateGame() {
    if (!gameState.isRunning || gameState.isPaused) return;
    
    gameState.timeLeft -= 0.1;
    
    if (gameState.timeLeft <= 0) {
        endGame('Time\'s up! Final glucose level: ' + Math.round(gameState.glucose) + ' mg/dL');
    }
    
    updateDisplay();
}

function checkGlucoseStatus() {
    if (!gameState.isRunning || gameState.isPaused) return;
    
    // Check if glucose is in normal range
    if (gameState.glucose >= 70 && gameState.glucose <= 140) {
        gameState.normalGlucoseTimer += 0.5;
        
        // Bonus every 10 seconds in normal range
        if (gameState.normalGlucoseTimer >= 10) {
            gameState.score += 20;
            gameState.normalGlucoseTimer = 0;
        }
    } else {
        gameState.normalGlucoseTimer = 0;
    }
    
    // Check for critical conditions
    if (gameState.glucose > 300) {
        endGame('CRITICAL HYPERGLYCEMIA! Glucose exceeded 300 mg/dL. Game Over!');
    }
    
    if (gameState.glucose < 40) {
        endGame('CRITICAL HYPOGLYCEMIA! Glucose dropped below 40 mg/dL. Game Over!');
    }
    
    // Show warnings
    if (gameState.glucose < 70 && gameState.glucose > 40) {
        showWarning('hypoglycemia', '⚠️ WARNING: HYPOGLYCEMIA - Glucose below 70 mg/dL');
    } else if (gameState.glucose > 250) {
        showWarning('hyperglycemia', '⚠️ WARNING: HYPERGLYCEMIA - Glucose above 250 mg/dL');
    } else {
        warningBox.style.display = 'none';
    }
}

function showWarning(type, message) {
    warningBox.textContent = message;
    warningBox.className = `warning-box ${type}`;
    warningBox.style.display = 'block';
}

function updateDisplay() {
    glucoseDisplay.textContent = Math.round(gameState.glucose);
    scoreDisplay.textContent = gameState.score;
    timeDisplay.textContent = Math.max(0, Math.ceil(gameState.timeLeft));
    
    // Update glucose marker position
    const glucosePercent = (gameState.glucose / 400) * 100;
    glucoseMarker.style.left = glucosePercent + '%';
}

function endGame(reason) {
    gameState.isRunning = false;
    clearAllIntervals();
    
    const gameOverScreen = document.getElementById('game-over-screen');
    document.getElementById('game-over-reason').textContent = reason;
    document.getElementById('final-score').textContent = gameState.score;
    document.getElementById('final-glucose').textContent = Math.round(gameState.glucose);
    gameOverScreen.style.display = 'flex';
    
    document.getElementById('pause-btn').disabled = true;
}

function clearAllIntervals() {
    clearInterval(spawnInterval);
    clearInterval(updateInterval);
    clearInterval(glucoseCheckInterval);
}

// Initialize display on load
window.addEventListener('load', updateDisplay);