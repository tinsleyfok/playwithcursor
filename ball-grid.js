// Random distribution with drop down animation
document.addEventListener('DOMContentLoaded', function() {
  const balls = document.querySelectorAll('.ball');
  const bubbleGrid = document.querySelector('.bubble-grid');
  let isAnimating = false;
  
  const ballSize = 110;
  const minBallSize = 110;
  const maxBallSize = 110; // Uniform size like the image
  const padding = 20;
  
  // Get container dimensions
  function getContainerDimensions() {
    const rect = bubbleGrid.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height
    };
  }
  
  // Check if two balls overlap
  function ballsOverlap(pos1, size1, pos2, size2) {
    const radius1 = size1 / 2;
    const radius2 = size2 / 2;
    const x1 = pos1.left + radius1;
    const y1 = pos1.top + radius1;
    const x2 = pos2.left + radius2;
    const y2 = pos2.top + radius2;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < (radius1 + radius2 + padding);
  }
  
  // Generate grid positions: 2-3-3 layout (like the image)
  function generateGridPositions(ballSizes) {
    const container = getContainerDimensions();
    const startHeight = container.height * 0.6;
    const positions = [];
    
    // Grid layout: row 1 = 2 items, row 2 = 3 items, row 3 = 3 items
    const gridLayout = [
      [0, 1],           // Row 1: 2 items
      [2, 3, 4],        // Row 2: 3 items
      [5, 6, 7]         // Row 3: 3 items
    ];
    
    const availableWidth = container.width - padding * 2;
    const availableHeight = container.height - startHeight - padding * 2;
    const numRows = gridLayout.length;
    const rowHeight = availableHeight / numRows;
    const gap = 20; // 20px gap between bubbles for better spacing
    
    gridLayout.forEach((row, rowIndex) => {
      const numCols = row.length;
      // Calculate column width: (available width - gaps) / number of columns
      const colWidth = (availableWidth - gap * (numCols - 1)) / numCols;
      
      row.forEach((ballIndex, colIndex) => {
        const size = ballSizes[ballIndex];
        // Calculate left position: padding + (colIndex * (colWidth + gap)) + center offset
        const left = padding + colIndex * (colWidth + gap) + (colWidth - size) / 2;
        // Calculate top position: startHeight + padding + (rowIndex * rowHeight) + center offset
        const top = startHeight + padding + rowIndex * rowHeight + (rowHeight - size) / 2;
        
        positions[ballIndex] = {
          left: left,
          top: top,
          size: size
        };
      });
    });
    
    return positions;
  }
  
  // Generate random sizes
  function generateBallSizes() {
    const sizes = [];
    for (let i = 0; i < balls.length; i++) {
      sizes.push(minBallSize + Math.random() * (maxBallSize - minBallSize));
    }
    return sizes;
  }
  
  // Start animation
  function startAnimation() {
    if (isAnimating) return;
    isAnimating = true;
    
    const ballSizes = generateBallSizes();
    const positions = generateGridPositions(ballSizes);
    
    // Reset all balls
    balls.forEach((ball, index) => {
      const pos = positions[index];
      ball.classList.remove('dropping');
      ball.style.top = '50px';
      ball.style.left = pos.left + 'px';
      ball.style.width = pos.size + 'px';
      ball.style.height = pos.size + 'px';
      ball.style.opacity = '0';
      ball.style.setProperty('--final-top', pos.top + 'px');
    });
    
    void balls[0].offsetWidth;
    
    // Start drop animation with stagger
    requestAnimationFrame(() => {
      balls.forEach((ball, index) => {
        setTimeout(() => {
          ball.classList.add('dropping');
          
          setTimeout(() => {
            const pos = positions[index];
            ball.classList.remove('dropping');
            ball.style.top = pos.top + 'px';
            ball.style.left = pos.left + 'px';
            ball.style.width = pos.size + 'px';
            ball.style.height = pos.size + 'px';
            ball.style.opacity = '1';
            
            if (index === balls.length - 1) {
              isAnimating = false;
            }
          }, 1200);
        }, index * 50);
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
