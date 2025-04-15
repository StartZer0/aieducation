
import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';

export const KineticEnergyVisualization: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create the visualization directly in the container div instead of using an iframe
    if (!containerRef.current) return;

    // Create the visualization elements
    const container = document.createElement('div');
    container.className = 'kinetic-energy-container';
    
    // Create canvas element for visualization
    const canvas = document.createElement('canvas');
    canvas.width = containerRef.current.clientWidth;
    canvas.height = 500;
    canvas.style.border = '1px solid #ccc';
    container.appendChild(canvas);

    // Add controls
    const controls = document.createElement('div');
    controls.className = 'controls';
    controls.style.margin = '10px 0';
    controls.style.display = 'flex';
    controls.style.flexWrap = 'wrap';
    controls.style.gap = '10px';
    
    // Mass control
    const massControl = createControl('Mass (kg): ', 'massValue', 'massSlider', 0.1, 5, 1, 0.1);
    controls.appendChild(massControl);

    // Force control
    const forceControl = createControl('Force (N): ', 'forceValue', 'forceSlider', 1, 30, 10, 1);
    controls.appendChild(forceControl);

    // Time control
    const timeControl = createControl('Time (s): ', 'timeValue', 'timeSlider', 0, 5, 0, 0.1);
    controls.appendChild(timeControl);

    container.appendChild(controls);
    
    // Add buttons
    const buttons = document.createElement('div');
    buttons.style.margin = '10px 0';
    
    const playButton = document.createElement('button');
    playButton.textContent = 'Play Animation';
    playButton.id = 'playPauseBtn';
    playButton.style.padding = '4px 8px';
    playButton.style.backgroundColor = '#4CAF50';
    playButton.style.color = 'white';
    playButton.style.border = 'none';
    playButton.style.borderRadius = '3px';
    playButton.style.cursor = 'pointer';
    playButton.style.marginRight = '5px';
    buttons.appendChild(playButton);
    
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    resetButton.id = 'resetBtn';
    resetButton.style.padding = '4px 8px';
    resetButton.style.backgroundColor = '#4CAF50';
    resetButton.style.color = 'white';
    resetButton.style.border = 'none';
    resetButton.style.borderRadius = '3px';
    resetButton.style.cursor = 'pointer';
    buttons.appendChild(resetButton);
    
    container.appendChild(buttons);
    
    // Add results display
    const results = document.createElement('div');
    results.className = 'results';
    results.style.backgroundColor = '#f5f5f5';
    results.style.padding = '8px';
    results.style.borderRadius = '5px';
    results.style.display = 'flex';
    results.style.flexWrap = 'wrap';
    
    // Column 1
    const resultsCol1 = document.createElement('div');
    resultsCol1.style.flex = '1';
    resultsCol1.style.minWidth = '200px';
    
    resultsCol1.innerHTML = `
      <p><strong>Calculations:</strong></p>
      <p>Acceleration (a = F/m): <span id="acceleration">10.0</span> m/s²</p>
      <p>Velocity (v = at): <span id="velocity">0.0</span> m/s</p>
      <p>Distance (s = ½at²): <span id="distance">0.0</span> m</p>
    `;
    
    // Column 2
    const resultsCol2 = document.createElement('div');
    resultsCol2.style.flex = '1';
    resultsCol2.style.minWidth = '200px';
    
    resultsCol2.innerHTML = `
      <p>Work Done (W = Fs): <span id="workDone">0.0</span> J</p>
      <p>Kinetic Energy (Ek = ½mv²): <span id="kineticEnergy">0.0</span> J</p>
      <p style="font-family: monospace; background-color: #eee; padding: 5px; border-radius: 3px;">W = Fs = ½mv² = Ek</p>
    `;
    
    results.appendChild(resultsCol1);
    results.appendChild(resultsCol2);
    container.appendChild(results);
    
    // Energy bars
    const energyBars = document.createElement('div');
    energyBars.className = 'energy-bars';
    energyBars.style.height = '40px';
    energyBars.style.position = 'relative';
    energyBars.style.marginTop = '10px';
    
    const kineticBar = document.createElement('div');
    kineticBar.id = 'kineticBar';
    kineticBar.className = 'energy-bar';
    kineticBar.style.height = '20px';
    kineticBar.style.backgroundColor = '#2196F3';
    kineticBar.style.width = '0%';
    kineticBar.style.marginBottom = '3px';
    kineticBar.style.position = 'relative';
    kineticBar.style.transition = 'width 0.3s ease';
    
    const kineticLabel = document.createElement('span');
    kineticLabel.textContent = 'Kinetic Energy';
    kineticLabel.style.position = 'absolute';
    kineticLabel.style.left = '10px';
    kineticLabel.style.color = 'white';
    kineticLabel.style.fontWeight = 'bold';
    kineticLabel.style.lineHeight = '20px';
    kineticLabel.style.fontSize = '12px';
    kineticBar.appendChild(kineticLabel);
    
    const workBar = document.createElement('div');
    workBar.id = 'workBar';
    workBar.className = 'energy-bar';
    workBar.style.height = '20px';
    workBar.style.backgroundColor = '#FF9800';
    workBar.style.width = '0%';
    workBar.style.position = 'relative';
    workBar.style.transition = 'width 0.3s ease';
    
    const workLabel = document.createElement('span');
    workLabel.textContent = 'Work Done';
    workLabel.style.position = 'absolute';
    workLabel.style.left = '10px';
    workLabel.style.color = 'white';
    workLabel.style.fontWeight = 'bold';
    workLabel.style.lineHeight = '20px';
    workLabel.style.fontSize = '12px';
    workBar.appendChild(workLabel);
    
    energyBars.appendChild(kineticBar);
    energyBars.appendChild(workBar);
    container.appendChild(energyBars);
    
    // Add the container to the DOM
    containerRef.current.appendChild(container);
    
    // Initialize the visualization
    initVisualization(canvas);
    
    // Create helper function for controls
    function createControl(labelText, valueId, sliderId, min, max, value, step) {
      const controlDiv = document.createElement('div');
      controlDiv.style.flex = '1';
      controlDiv.style.minWidth = '200px';
      
      const label = document.createElement('label');
      label.textContent = labelText;
      
      const valueSpan = document.createElement('span');
      valueSpan.id = valueId;
      valueSpan.textContent = value.toFixed(1);
      label.appendChild(valueSpan);
      
      const slider = document.createElement('input');
      slider.type = 'range';
      slider.id = sliderId;
      slider.min = min.toString();
      slider.max = max.toString();
      slider.value = value.toString();
      slider.step = step.toString();
      slider.style.width = '90%';
      slider.style.display = 'block';
      
      controlDiv.appendChild(label);
      controlDiv.appendChild(slider);
      
      return controlDiv;
    }
    
    // Initialize visualization
    function initVisualization(canvas) {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Parameters
      const width = canvas.width;
      const height = canvas.height;
      const initialX = 60;
      const groundY = height - 35;
      const objectRadius = 15;
      
      // State
      let mass = 1.0;
      let force = 10.0;
      let time = 0.0;
      let currentX = initialX;
      let isPlaying = false;
      let animationId = null;
      
      // Draw initial state
      drawScene();
      
      // Setup event listeners
      const massSlider = document.getElementById('massSlider');
      const forceSlider = document.getElementById('forceSlider');
      const timeSlider = document.getElementById('timeSlider');
      const playPauseBtn = document.getElementById('playPauseBtn');
      const resetBtn = document.getElementById('resetBtn');
      
      if (massSlider) {
        massSlider.addEventListener('input', function() {
          mass = parseFloat(this.value);
          document.getElementById('massValue').textContent = mass.toFixed(1);
          updateVisualization();
        });
      }
      
      if (forceSlider) {
        forceSlider.addEventListener('input', function() {
          force = parseFloat(this.value);
          document.getElementById('forceValue').textContent = force.toFixed(1);
          updateVisualization();
        });
      }
      
      if (timeSlider) {
        timeSlider.addEventListener('input', function() {
          time = parseFloat(this.value);
          document.getElementById('timeValue').textContent = time.toFixed(1);
          updateVisualization();
        });
      }
      
      if (playPauseBtn) {
        playPauseBtn.addEventListener('click', toggleAnimation);
      }
      
      if (resetBtn) {
        resetBtn.addEventListener('click', resetVisualization);
      }
      
      // Functions
      function drawScene() {
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Draw ground
        ctx.fillStyle = '#333';
        ctx.fillRect(0, groundY, width, 3);
        
        // Calculate physics
        const values = calculateValues();
        
        // Draw distance line
        const scaleFactor = 20;
        const scaledDistance = Math.min(values.distance, (width - initialX - objectRadius) / scaleFactor);
        currentX = initialX + scaledDistance * scaleFactor;
        
        ctx.strokeStyle = '#888';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(initialX, groundY + 20);
        ctx.lineTo(currentX, groundY + 20);
        ctx.stroke();
        
        // Distance text
        ctx.fillStyle = '#000';
        ctx.font = '10px Arial';
        ctx.fillText(`Distance s = ${values.distance.toFixed(1)} m`, initialX + (currentX - initialX) / 2 - 30, groundY + 30);
        
        // Draw object
        ctx.fillStyle = '#64b5f6';
        ctx.strokeStyle = '#1976d2';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(currentX, groundY - objectRadius, objectRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Draw force arrow
        if (force > 0) {
          const arrowLength = Math.min(40, force * 2);
          ctx.strokeStyle = '#f44336';
          ctx.fillStyle = '#f44336';
          ctx.lineWidth = 8;
          
          ctx.beginPath();
          ctx.moveTo(currentX - arrowLength - 20, groundY - objectRadius);
          ctx.lineTo(currentX - 20, groundY - objectRadius);
          ctx.stroke();
          
          // Arrow head
          ctx.beginPath();
          ctx.moveTo(currentX - 20, groundY - objectRadius);
          ctx.lineTo(currentX - 20 - 12, groundY - objectRadius - 8);
          ctx.lineTo(currentX - 20 - 12, groundY - objectRadius + 8);
          ctx.closePath();
          ctx.fill();
          
          // Force label
          ctx.fillStyle = '#000';
          ctx.font = '10px Arial';
          ctx.fillText(`F = ${force.toFixed(1)} N`, currentX - arrowLength - 10, groundY - objectRadius - 15);
        }
        
        // Velocity label
        ctx.fillStyle = '#000';
        ctx.font = '10px Arial';
        ctx.fillText(`v = ${values.velocity.toFixed(1)} m/s`, currentX + 20, groundY - 40);
        
        // Initial position marker
        ctx.fillStyle = '#000';
        ctx.font = '10px Arial';
        ctx.fillText('Initial position', initialX - 25, groundY - 40);
        
        // Update energy bars
        const maxEnergy = 100;
        const kineticWidth = Math.min((values.kineticEnergy / maxEnergy) * 100, 100);
        const workWidth = Math.min((values.workDone / maxEnergy) * 100, 100);
        
        const kineticBar = document.getElementById('kineticBar');
        const workBar = document.getElementById('workBar');
        
        if (kineticBar) kineticBar.style.width = `${kineticWidth}%`;
        if (workBar) workBar.style.width = `${workWidth}%`;
        
        // Update text values
        updateTextValues(values);
      }
      
      function calculateValues() {
        const acceleration = force / mass;
        const velocity = acceleration * time;
        const distance = 0.5 * acceleration * time * time;
        const workDone = force * distance;
        const kineticEnergy = 0.5 * mass * velocity * velocity;
        
        return {
          acceleration,
          velocity,
          distance,
          workDone,
          kineticEnergy
        };
      }
      
      function updateVisualization() {
        drawScene();
      }
      
      function updateTextValues(values) {
        document.getElementById('acceleration')?.textContent = values.acceleration.toFixed(1);
        document.getElementById('velocity')?.textContent = values.velocity.toFixed(1);
        document.getElementById('distance')?.textContent = values.distance.toFixed(1);
        document.getElementById('workDone')?.textContent = values.workDone.toFixed(1);
        document.getElementById('kineticEnergy')?.textContent = values.kineticEnergy.toFixed(1);
      }
      
      function toggleAnimation() {
        if (isPlaying) {
          stopAnimation();
          if (playPauseBtn) playPauseBtn.textContent = 'Play Animation';
        } else {
          startAnimation();
          if (playPauseBtn) playPauseBtn.textContent = 'Pause Animation';
        }
        isPlaying = !isPlaying;
      }
      
      function startAnimation() {
        if (animationId) return;
        
        let startTime = null;
        const duration = 5000; // 5 seconds animation
        
        function animate(timestamp) {
          if (!startTime) startTime = timestamp;
          let progress = (timestamp - startTime) / duration;
          
          if (progress > 1) progress = 1;
          
          // Update time slider based on animation progress
          time = 5 * progress;
          if (timeSlider) timeSlider.value = time.toString();
          document.getElementById('timeValue').textContent = time.toFixed(1);
          
          updateVisualization();
          
          if (progress < 1) {
            animationId = requestAnimationFrame(animate);
          } else {
            stopAnimation();
            if (playPauseBtn) playPauseBtn.textContent = 'Play Animation';
            isPlaying = false;
          }
        }
        
        animationId = requestAnimationFrame(animate);
      }
      
      function stopAnimation() {
        if (animationId) {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
      }
      
      function resetVisualization() {
        time = 0;
        if (timeSlider) timeSlider.value = "0";
        document.getElementById('timeValue').textContent = "0.0";
        
        stopAnimation();
        if (playPauseBtn) playPauseBtn.textContent = "Play Animation";
        isPlaying = false;
        
        updateVisualization();
      }
    }

    // Clean up function
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <Card className="w-full shadow-sm">
      <div 
        ref={containerRef}
        className="w-full border-0 p-4"
      />
    </Card>
  );
};
