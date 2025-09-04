// Bouncing Ball Animation - Beginner Friendly
// Get the canvas and its context
const canvas = document.getElementById('ballCanvas');
const ctx = canvas.getContext('2d');

// Ball properties
const ball = {
    x: 50,           // x position
    y: 50,           // y position
    radius: 20,      // ball size
    dx: 3,           // horizontal speed
    dy: 3,           // vertical speed
    color: '#ff6b6b' // ball color
};

// Animation control
let animationId;
let isAnimating = false;

// Function to draw the ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

// Function to clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Function to update ball position
function updateBall() {
    // Move the ball
    ball.x += ball.dx;
    ball.y += ball.dy;
    
    // Bounce off the walls
    // Right and left walls
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx; // Reverse horizontal direction
    }
    
    // Top and bottom walls
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy = -ball.dy; // Reverse vertical direction
    }
}

// Main animation function
function animate() {
    clearCanvas();
    drawBall();
    updateBall();
    
    if (isAnimating) {
        animationId = requestAnimationFrame(animate);
    }
}

// Start animation
function startAnimation() {
    if (!isAnimating) {
        isAnimating = true;
        animate();
    }
}

// Stop animation
function stopAnimation() {
    isAnimating = false;
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
}

// Reset ball to initial position
function resetBall() {
    stopAnimation();
    ball.x = 50;
    ball.y = 50;
    ball.dx = 3;
    ball.dy = 3;
    clearCanvas();
    drawBall();
}

// Event listeners for buttons
document.getElementById('startBtn').addEventListener('click', startAnimation);
document.getElementById('stopBtn').addEventListener('click', stopAnimation);
document.getElementById('resetBtn').addEventListener('click', resetBall);

// Draw initial ball
drawBall();