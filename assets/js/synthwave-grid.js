let gridOffset = 0;
let isDarkTheme = false;

function setup() {

  
  // Create canvas that fills the entire window
  let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  
  // Configure 3D camera
  configurePerspective();
  
  // Try to attach directly to body instead of container
  canvas.parent(document.body);
  canvas.style('position', 'fixed');
  canvas.style('top', '0');
  canvas.style('left', '0');
  canvas.style('z-index', '2');
  canvas.style('pointer-events', 'none');
  
  // console.log('Canvas created and attached to body');
  // console.log('Canvas size:', width, 'x', height);
  
  // Check if dark theme is active
  checkTheme();
}

function draw() {
  clear(); // Transparent background
  
  // Only draw if dark theme is active
  if (!isDarkTheme) {
    return;
  }
  
  // Configure 3D grid settings
  let gridConfig = configure3DGrid();
  
  // Update grid animation with configurable speed
  gridOffset += gridConfig.animationSpeed;
  if (gridOffset >= 150) {
    gridOffset = 0;
  }
  
  // console.log('Drawing grid - gridOffset:', gridOffset, 'isDarkTheme:', isDarkTheme);
  
  // Set up 3D perspective
  push();
  
  // Position camera using configuration
  translate(0, height * gridConfig.cameraHeight, 0);
  rotateX(gridConfig.perspectiveAngle);
  
  // Grid properties optimized for WEBGL
  let gridSize = 150;
  let gridWidth = width * 2;
  let gridHeight = 1000;
  let startX = -gridWidth / 2;
  let startY = -gridOffset;
  
  // Calculate fade range in 3D space
  let fadeRange = height * gridConfig.fadeRangePercent;
  
  strokeWeight(2);
  noFill();
  
  // Draw horizontal lines with fade effect
  for (let y = startY; y < startY + gridHeight; y += gridSize) {
    let alpha = calculateFadeAlpha(y, 0, fadeRange, gridConfig.maxOpacity, gridConfig.minOpacity);
    stroke(9, 226, 44, alpha);
    line(startX, y, startX + gridWidth, y);
  }
  
  // Draw vertical lines with fade effect
  for (let x = startX; x <= startX + gridWidth; x += gridSize) {
    // Draw vertical lines in small segments for smooth fade
    for (let y = startY; y < startY + gridHeight; y += 20) {
      let alpha = calculateFadeAlpha(y, 0, fadeRange, gridConfig.maxOpacity, gridConfig.minOpacity);
      stroke(9, 226, 44, alpha);
      line(x, y, x, y + 20);
    }
  }
  
  pop();
}

function configurePerspective() {
  // Configure WEBGL camera for deep perspective
  perspective(PI/3.0, width/height, 0.1, 10000);
}

function configure3DGrid() {
  // Centralized configuration for 3D grid settings
  return {
    // Camera settings
    cameraHeight: 0.3, // Position camera at 30% of screen height
    perspectiveAngle: PI * 0.48, // 86 degrees - ground level view
    
    // Animation settings
    animationSpeed: 1.0, // Speed of grid movement
    
    // Fade settings (restored from previous configuration)
    fadeRangePercent: 1.0, // 300% of screen height for fade effect
    maxOpacity: 180, // Maximum opacity level (0-255)
    minOpacity: 0 // Minimum opacity (fully transparent)
  };
}

function calculateFadeAlpha(position, startPos, fadeRange, maxAlpha = 150, minAlpha = 0) {
  // Returns alpha value based on position within fade range
  // position: current Y position
  // startPos: where fade should start
  // fadeRange: distance over which to fade (in pixels)
  // maxAlpha: maximum opacity level (0-255)
  // minAlpha: minimum opacity level (0-255)
  
  let fadeDistance = position - startPos;
  
  if (fadeDistance <= 0) {
    return minAlpha; // Minimum opacity before start
  } else if (fadeDistance >= fadeRange) {
    return maxAlpha; // Maximum opacity after fade range
  } else {
    // Linear fade from minAlpha to maxAlpha over the fade range
    return map(fadeDistance, 0, fadeRange, minAlpha, maxAlpha);
  }
}

function drawRedGradient() {
  // Reset transformations for overlay - work in 2D mode
  push();
  resetMatrix();
  
  // Create red gradient covering entire screen
  let steps = 100;
  
  for (let i = 0; i < steps; i++) {
    let y = (i / steps) * height;
    let progress = i / steps;
    let alpha = 76; // Same as rgba(255, 0, 0, 0.3)
    
    // Keep constant opacity until 92%, then fade to transparent
    if (progress > 0.92) {
      alpha = map(progress, 0.92, 1.0, 76, 0);
    }
    
    fill(255, 0, 0, alpha);
    noStroke();
    
    let h = height / steps;
    rect(0, y, width, h);
  }
  
  pop();
}

function drawGradientOverlay() {
  // Reset transformations for overlay - work in 2D mode
  push();
  resetMatrix();
  
  // Create gradient effect at horizon line to fade out grid smoothly
  let gradientStart = height * 0.1; // Start gradient higher up
  let gradientHeight = height * 0.6; // Longer fade
  let steps = 50;
  
  for (let i = 0; i < steps; i++) {
    // Fade from transparent to opaque (background color)
    let alpha = map(i, 0, steps - 1, 0, 200);
    fill(0, 20, 0, alpha); // Dark green matching theme background
    noStroke();
    
    let y = gradientStart + (i / steps) * gradientHeight;
    let h = gradientHeight / steps;
    rect(0, y, width, h);
  }
  
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function checkTheme() {
  // Check if body has dark theme attributes
  let body = document.body;
  let isDark = body.getAttribute('a') === 'dark' || 
              (body.getAttribute('a') === 'auto' && 
               window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  isDarkTheme = isDark;
  // console.log('Theme check - isDark:', isDark, 'attribute:', body.getAttribute('a'));
  
  // Re-check theme periodically
  setTimeout(checkTheme, 1000);
}

// Initialize p5.js only when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Create container div
  let container = document.createElement('div');
  container.id = 'synthwave-grid-container';
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.zIndex = '-1';
  container.style.pointerEvents = 'none';
  
  document.body.appendChild(container);
});