// Smooth ball drop animation for 8 balls with random non-overlapping distribution and variable sizes
document.addEventListener('DOMContentLoaded', function() {
  const balls = document.querySelectorAll('.ball');
  const phoneContainer = document.getElementById('phoneContainer');
  let isAnimating = false;
  const containerWidth = 390; // Approximate container width
  const containerHeight = 850; // Approximate container height
  const minBallSize = 100;
  const maxBallSize = 140;
  
  // Generate random sizes for each ball (between 100px and 140px)
  function generateBallSizes() {
    const sizes = [];
    for (let i = 0; i < balls.length; i++) {
      sizes.push(minBallSize + Math.random() * (maxBallSize - minBallSize));
    }
    return sizes;
  }
  
  // Function to check if two balls overlap (with different sizes)
  function ballsOverlap(pos1, size1, pos2, size2) {
    const radius1 = size1 / 2;
    const radius2 = size2 / 2;
    
    // Calculate center positions
    const x1 = pos1.left + radius1;
    const y1 = pos1.top + radius1;
    const x2 = pos2.left + radius2;
    const y2 = pos2.top + radius2;
    
    // Calculate distance between centers
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Circles overlap if distance < sum of radii + padding
    const minDistance = radius1 + radius2 + 5; // 5px padding
    return distance < minDistance;
  }
  
  // Function to generate random non-overlapping positions below 60% of height
  function generateRandomPositions(ballSizes) {
    const positions = [];
    const startHeight = containerHeight * 0.6; // 60% of container height
    const padding = 10;
    
    for (let i = 0; i < balls.length; i++) {
      const ballSize = ballSizes[i];
      const maxAttempts = 10000;
      let attempts = 0;
      let position;
      let valid = false;
      
      const availableWidth = containerWidth - ballSize - padding * 2;
      const availableHeight = containerHeight - startHeight - ballSize - padding;
      
      while (!valid && attempts < maxAttempts) {
        // Random position below 60% of height
        position = {
          left: padding + Math.random() * availableWidth,
          top: startHeight + padding + Math.random() * availableHeight,
          size: ballSize
        };
        
        // Ensure position is within bounds
        position.left = Math.max(padding, Math.min(position.left, containerWidth - ballSize - padding));
        position.top = Math.max(startHeight + padding, Math.min(position.top, containerHeight - ballSize - padding));
        
        // Check if this position overlaps with any existing position
        valid = true;
        for (let j = 0; j < positions.length; j++) {
          if (ballsOverlap(position, ballSize, positions[j], positions[j].size)) {
            valid = false;
            break;
          }
        }
        
        attempts++;
      }
      
      // If random placement fails, use systematic grid placement
      if (!valid) {
        const cols = 4;
        const rows = Math.ceil(balls.length / cols);
        const col = i % cols;
        const row = Math.floor(i / cols);
        
        // Calculate grid spacing to avoid overlap
        const cellWidth = (containerWidth - padding * 2) / cols;
        const cellHeight = availableHeight / rows;
        const maxSizeInCell = Math.min(cellWidth, cellHeight) - 10;
        
        position = {
          left: padding + col * cellWidth + (cellWidth - ballSize) / 2,
          top: startHeight + padding + row * cellHeight + (cellHeight - ballSize) / 2,
          size: ballSize
        };
        
        // Verify grid position doesn't overlap
        valid = true;
        for (let j = 0; j < positions.length; j++) {
          if (ballsOverlap(position, ballSize, positions[j], positions[j].size)) {
            valid = false;
            break;
          }
        }
        
        // If still overlaps, reduce size and try again
        if (!valid && ballSize > minBallSize) {
          const reducedSize = Math.max(minBallSize, ballSize - 10);
          position.size = reducedSize;
          position.left = padding + col * cellWidth + (cellWidth - reducedSize) / 2;
          position.top = startHeight + padding + row * cellHeight + (cellHeight - reducedSize) / 2;
          
          valid = true;
          for (let j = 0; j < positions.length; j++) {
            if (ballsOverlap(position, reducedSize, positions[j], positions[j].size)) {
              valid = false;
              break;
            }
          }
        }
      }
      
      positions.push(position);
    }
    
    return positions;
  }
  
  // Generate initial ball sizes and positions
  let ballSizes = generateBallSizes();
  let randomPositions = generateRandomPositions(ballSizes);
  
  // Function to reset and start animation for all balls
  function startAnimation() {
    if (isAnimating) return;
    isAnimating = true;
    
    // Generate new random sizes and positions each time
    ballSizes = generateBallSizes();
    randomPositions = generateRandomPositions(ballSizes);
    
    // Reset all balls position and remove all classes
    balls.forEach((ball, index) => {
      const pos = randomPositions[index];
      const emoji = ball.querySelector('.ball-emoji');
      const text = ball.querySelector('.ball-text');
      
      ball.classList.remove('dropping');
      ball.style.top = '50px';
      ball.style.left = pos.left + 'px';
      ball.style.width = pos.size + 'px';
      ball.style.height = pos.size + 'px';
      ball.style.opacity = '0';
      ball.style.transform = 'translateY(0) scale(1)';
      ball.style.setProperty('--final-top', pos.top + 'px');
      
      // Scale emoji and text proportionally to ball size
      const scale = pos.size / 120; // Base size is 120px
      if (emoji) emoji.style.fontSize = (34 * scale) + 'px';
      if (text) text.style.fontSize = (11 * scale) + 'px';
    });
    
    // Force reflow to ensure reset
    void balls[0].offsetWidth;
    
    // Start smooth drop animation for all balls with slight stagger
    requestAnimationFrame(() => {
      balls.forEach((ball, index) => {
        setTimeout(() => {
          ball.classList.add('dropping');
          
          // When drop completes, stay at final position
          setTimeout(() => {
            const pos = randomPositions[index];
            const emoji = ball.querySelector('.ball-emoji');
            const text = ball.querySelector('.ball-text');
            
            ball.classList.remove('dropping');
            ball.style.top = pos.top + 'px';
            ball.style.left = pos.left + 'px';
            ball.style.width = pos.size + 'px';
            ball.style.height = pos.size + 'px';
            ball.style.opacity = '1';
            ball.style.transform = 'translateY(0) scale(1)';
            
            // Scale emoji and text proportionally to ball size
            const scale = pos.size / 120; // Base size is 120px
            if (emoji) emoji.style.fontSize = (34 * scale) + 'px';
            if (text) text.style.fontSize = (11 * scale) + 'px';
            
            // Check if all animations are complete
            if (index === balls.length - 1) {
              isAnimating = false;
            }
          }, 1200);
        }, index * 50); // Stagger each ball by 50ms
      });
    });
  }
  
  // Click any ball to trigger animation
  balls.forEach(ball => {
    ball.addEventListener('click', startAnimation);
  });
  
  // Auto-start animation on page load
  setTimeout(startAnimation, 500);
});
