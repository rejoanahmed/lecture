// Double Pendulum Simulation
// Simple physics simulation for beginners

// Global variables
let canvas, ctx;
let length1 = 150;  // Length of first pendulum arm
let length2 = 150;  // Length of second pendulum arm
let mass1 = 20;     // Mass of first bob
let mass2 = 20;     // Mass of second bob

// Physics variables
let angle1 = Math.PI / 2;  // Initial angle of first pendulum
let angle2 = Math.PI / 2;  // Initial angle of second pendulum
let velocity1 = 0;         // Angular velocity of first pendulum
let velocity2 = 0;         // Angular velocity of second pendulum

// Animation
let animationId = null;
let isRunning = false;
let gravity = 10;  // Gravity constant

// Trail for second pendulum
let trail = [];
let maxTrailLength = 200;

// Initialize when page loads
window.addEventListener('load', function() {
    canvas = document.getElementById('pendulumCanvas');
    ctx = canvas.getContext('2d');
    
    setupEventListeners();
    draw();
});

function setupEventListeners() {
    document.getElementById('startBtn').addEventListener('click', start);
    document.getElementById('pauseBtn').addEventListener('click', pause);
    document.getElementById('resetBtn').addEventListener('click', reset);
}

function start() {
    if (!isRunning) {
        isRunning = true;
        animate();
    }
}

function pause() {
    isRunning = false;
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
}

function reset() {
    pause();
    angle1 = Math.PI / 2;
    angle2 = Math.PI / 2;
    velocity1 = 0;
    velocity2 = 0;
    trail = [];
    draw();
}

// Physics calculation using simplified equations
function updatePhysics() {
    // Simplified double pendulum equations
    // For beginners, we'll use a basic approximation
    
    let dt = 0.16; // Time step (approximately 60 FPS)
    
    // Calculate accelerations
    let acceleration1 = calculateAcceleration1();
    let acceleration2 = calculateAcceleration2();
    
    // Update velocities
    velocity1 += acceleration1 * dt;
    velocity2 += acceleration2 * dt;
    
    // Update angles
    angle1 += velocity1 * dt;
    angle2 += velocity2 * dt;
}

function calculateAcceleration1() {
    // Simplified acceleration for first pendulum
    let g = gravity;
    let m1 = mass1;
    let m2 = mass2;
    let l1 = length1;
    let l2 = length2;
    
    let cos = Math.cos(angle1 - angle2);
    let sin = Math.sin(angle1 - angle2);
    
    let numerator = -g * (2 * m1 + m2) * Math.sin(angle1) - 
                   m2 * g * Math.sin(angle1 - 2 * angle2) - 
                   2 * sin * m2 * (velocity2 * velocity2 * l2 + 
                                  velocity1 * velocity1 * l1 * cos);
    
    let denominator = l1 * (2 * m1 + m2 - m2 * Math.cos(2 * angle1 - 2 * angle2));
    
    return numerator / denominator;
}

function calculateAcceleration2() {
    // Simplified acceleration for second pendulum
    let g = gravity;
    let m1 = mass1;
    let m2 = mass2;
    let l1 = length1;
    let l2 = length2;
    
    let cos = Math.cos(angle1 - angle2);
    let sin = Math.sin(angle1 - angle2);
    
    let numerator = 2 * sin * (velocity1 * velocity1 * l1 * (m1 + m2) + 
                             g * (m1 + m2) * Math.cos(angle1) + 
                             velocity2 * velocity2 * l2 * m2 * cos);
    
    let denominator = l2 * (2 * m1 + m2 - m2 * Math.cos(2 * angle1 - 2 * angle2));
    
    return numerator / denominator;
}

function animate() {
    if (!isRunning) return;
    
    updatePhysics();
    draw();
    
    animationId = requestAnimationFrame(animate);
}

function draw() {
    // Clear canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Calculate positions
    let centerX = canvas.width / 2;
    let centerY = 100;
    
    let x1 = centerX + length1 * Math.sin(angle1);
    let y1 = centerY + length1 * Math.cos(angle1);
    
    let x2 = x1 + length2 * Math.sin(angle2);
    let y2 = y1 + length2 * Math.cos(angle2);
    
    // Add to trail
    trail.push({ x: x2, y: y2 });
    if (trail.length > maxTrailLength) {
        trail.shift();
    }
    
    // Draw trail
    drawTrail();
    
    // Draw pendulum arms
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x1, y1);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    
    // Draw pivot point
    ctx.fillStyle = '#ff6b6b';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 8, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw first bob
    ctx.fillStyle = '#4ecdc4';
    ctx.beginPath();
    ctx.arc(x1, y1, mass1, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw second bob
    ctx.fillStyle = '#45b7d1';
    ctx.beginPath();
    ctx.arc(x2, y2, mass2, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw bob outlines
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x1, y1, mass1, 0, 2 * Math.PI);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(x2, y2, mass2, 0, 2 * Math.PI);
    ctx.stroke();
}

function drawTrail() {
    if (trail.length < 2) return;
    
    ctx.strokeStyle = 'rgba(255, 107, 107, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(trail[0].x, trail[0].y);
    
    for (let i = 1; i < trail.length; i++) {
        ctx.lineTo(trail[i].x, trail[i].y);
    }
    
    ctx.stroke();
}