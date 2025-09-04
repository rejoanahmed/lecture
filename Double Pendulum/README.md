# Double Pendulum Simulation

A simple HTML, CSS, and JavaScript simulation of a double pendulum's chaotic motion, perfect for bootcamp beginners to learn physics, programming, and mathematical concepts.

## 🎯 Project Overview

This project demonstrates the fascinating chaotic motion of a double pendulum - two simple pendulums connected end-to-end. The simulation shows how small changes in initial conditions can lead to dramatically different outcomes, making it a perfect example of chaos theory in action.

## 🚀 Features

- **Visual Physics Simulation**: Real-time double pendulum motion with beautiful graphics
- **Interactive Controls**: Start, Pause, and Reset buttons
- **Trail Effect**: Shows the path of the second pendulum bob
- **Modern UI**: Gradient design with glassmorphism effects
- **Beginner-Friendly Code**: Well-commented, no classes, simple functions

## 📁 Files

- `index.html` - HTML structure with canvas and controls
- `style.css` - Modern CSS styling with gradients and animations
- `script.js` - Physics simulation using simplified equations
- `README.md` - This documentation file

## 🎮 How to Use

1. Open `index.html` in your web browser
2. Click **Start** to begin the simulation
3. Click **Pause** to stop the animation
4. Click **Reset** to return to initial position
5. Watch the beautiful chaotic motion unfold!

## 🧮 The Math Behind the Motion

### What is a Double Pendulum?

A double pendulum consists of two simple pendulums connected end-to-end:
- **First pendulum**: Fixed at one end, free to swing
- **Second pendulum**: Attached to the first pendulum's bob, also free to swing

### Why is it Chaotic?

The double pendulum exhibits **chaotic motion** because:
- Small changes in initial conditions lead to dramatically different outcomes
- The motion is highly sensitive to initial angles and velocities
- It's impossible to predict the exact path after a short time

### Key Mathematical Concepts

#### A. Angular Position and Velocity
```javascript
let angle1 = Math.PI / 2;  // First pendulum angle (90 degrees)
let angle2 = Math.PI / 2;  // Second pendulum angle (90 degrees)
let velocity1 = 0;         // Angular velocity of first pendulum
let velocity2 = 0;         // Angular velocity of second pendulum
```

- **Angles** are measured in radians (π/2 = 90°)
- **Angular velocity** is how fast the angle changes over time

#### B. Position Calculations
```javascript
let x1 = centerX + length1 * Math.sin(angle1);
let y1 = centerY + length1 * Math.cos(angle1);
let x2 = x1 + length2 * Math.sin(angle2);
let y2 = y1 + length2 * Math.cos(angle2);
```

**Trigonometry explanation:**
- `Math.sin(angle)` gives the horizontal component
- `Math.cos(angle)` gives the vertical component
- The second pendulum's position depends on the first pendulum's position

### The Physics Equations

#### A. Lagrangian Mechanics
The double pendulum follows **Lagrangian mechanics**, which uses energy instead of forces:

**Kinetic Energy (T):**
- Energy due to motion of both bobs
- Depends on masses, lengths, angles, and velocities

**Potential Energy (V):**
- Energy due to height above ground
- Depends on masses, lengths, and angles

#### B. The Differential Equations
The motion is described by two coupled differential equations:

```javascript
// First pendulum acceleration
let numerator = -g * (2 * m1 + m2) * Math.sin(angle1) - 
               m2 * g * Math.sin(angle1 - 2 * angle2) - 
               2 * sin * m2 * (velocity2² * l2 + velocity1² * l1 * cos);

let denominator = l1 * (2 * m1 + m2 - m2 * Math.cos(2 * angle1 - 2 * angle2));
let acceleration1 = numerator / denominator;
```

**Breaking down the equation:**
- **First term**: `-g * (2 * m1 + m2) * Math.sin(angle1)` - Gravity pulling down
- **Second term**: `-m2 * g * Math.sin(angle1 - 2 * angle2)` - Interaction with second pendulum
- **Third term**: `2 * sin * m2 * (velocity2² * l2 + velocity1² * l1 * cos)` - Centrifugal forces

### Numerical Integration

#### A. Euler's Method
We use **Euler's method** to solve the differential equations:

```javascript
let dt = 0.16; // Time step (small increment)

// Update velocities
velocity1 += acceleration1 * dt;
velocity2 += acceleration2 * dt;

// Update angles
angle1 += velocity1 * dt;
angle2 += velocity2 * dt;
```

**Why this works:**
- We can't solve the equations exactly
- We approximate by taking small time steps
- Each step uses the current state to predict the next state

#### B. Time Step (dt)
- **Smaller dt** = more accurate but slower
- **Larger dt** = faster but less accurate
- `dt = 0.16` gives us about 60 FPS animation

### Energy Conservation

#### A. Total Energy
```javascript
// Kinetic energy
let KE = 0.5 * m1 * (velocity1 * l1)² + 0.5 * m2 * (velocity1² * l1² + velocity2² * l2² + 2 * velocity1 * velocity2 * l1 * l2 * cos);

// Potential energy
let PE = -m1 * g * l1 * Math.cos(angle1) - m2 * g * (l1 * Math.cos(angle1) + l2 * Math.cos(angle2));

// Total energy (should be constant)
let totalEnergy = KE + PE;
```

#### B. Why Energy Matters
- **Energy conservation** keeps the pendulum swinging
- **Gravity** converts potential energy to kinetic energy
- **Friction** (not included) would gradually reduce total energy

### The Chaos Factor

#### A. Sensitivity to Initial Conditions
```javascript
// Try changing these initial values slightly:
let angle1 = Math.PI / 2 + 0.01;  // Just 0.01 radians different!
let angle2 = Math.PI / 2;
```

**Result:** Completely different motion pattern!

#### B. Why It's Unpredictable
- **Non-linear equations** - small changes amplify over time
- **Coupled motion** - each pendulum affects the other
- **No closed-form solution** - can't write a simple formula

## 🎓 Learning Objectives

### What Students Learn
1. **Trigonometry** - sin, cos for position calculations
2. **Calculus** - derivatives and integration
3. **Physics** - energy, forces, motion
4. **Programming** - loops, functions, variables
5. **Numerical methods** - approximating solutions

### Real-World Applications
- **Robotics** - arm movement, balance
- **Engineering** - bridge design, earthquake simulation
- **Gaming** - realistic physics engines
- **Research** - chaos theory, complex systems

## 💻 Code Structure

The code is organized into simple, beginner-friendly functions:

```javascript
// 1. Define variables
let angle1, angle2, velocity1, velocity2;

// 2. Calculate accelerations (physics)
function calculateAcceleration1() { /* math here */ }

// 3. Update positions (integration)
function updatePhysics() {
    velocity1 += acceleration1 * dt;
    angle1 += velocity1 * dt;
}

// 4. Draw the result (visualization)
function draw() { /* canvas drawing */ }
```

## 🔧 Customization

### Easy Modifications for Students

1. **Change pendulum properties:**
```javascript
let length1 = 200;  // Make first arm longer
let length2 = 100;  // Make second arm shorter
let mass1 = 30;     // Make first bob heavier
let mass2 = 10;     // Make second bob lighter
```

2. **Adjust gravity:**
```javascript
let gravity = 15;  // Stronger gravity = faster motion
```

3. **Modify initial conditions:**
```javascript
let angle1 = Math.PI / 4;  // Start at 45 degrees
let angle2 = Math.PI / 6;  // Start at 30 degrees
```

4. **Change trail length:**
```javascript
let maxTrailLength = 500;  // Longer trail
```

## 🎨 Visual Elements

- **Pivot Point**: Red circle at the top
- **First Bob**: Teal circle
- **Second Bob**: Blue circle
- **Trail**: Red fading line showing second bob's path
- **Arms**: White lines connecting the components

## 🚀 Getting Started

1. **Download** all files to a folder
2. **Open** `index.html` in any modern web browser
3. **Click Start** to see the simulation
4. **Experiment** with different initial conditions
5. **Modify** the code to learn how it works

## 📚 Further Reading

- [Double Pendulum on Wikipedia](https://en.wikipedia.org/wiki/Double_pendulum)
- [Chaos Theory](https://en.wikipedia.org/wiki/Chaos_theory)
- [Lagrangian Mechanics](https://en.wikipedia.org/wiki/Lagrangian_mechanics)
- [Canvas API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

## 🤝 Contributing

This is a learning project! Feel free to:
- Add new features
- Improve the physics
- Enhance the visuals
- Fix bugs
- Add more educational content

## 📄 License

This project is open source and available for educational use.

---

**Happy Learning!** 🎉 

The double pendulum is a beautiful example of how simple rules can create complex, unpredictable behavior. It's a perfect introduction to the fascinating world of chaos theory and mathematical modeling!