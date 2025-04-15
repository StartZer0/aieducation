
import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';

export const KineticEnergyVisualization: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const initVisualization = () => {
      if (iframeRef.current) {
        const iframe = iframeRef.current;
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        
        if (doc) {
          doc.open();
          doc.write(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Compact Kinetic Energy Visualization</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 10px;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        h1 {
            font-size: 18px;
            margin: 5px 0;
        }
        .visualization {
            width: 100%;
            height: 150px; /* Reduced height */
            border: 1px solid #ccc;
            margin-bottom: 10px;
            position: relative;
        }
        .controls {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 10px;
        }
        .control-group {
            flex: 1;
            min-width: 200px;
        }
        .control-group h3 {
            margin: 5px 0;
            font-size: 14px;
        }
        .slider-container {
            margin-bottom: 8px;
        }
        .results {
            display: flex;
            flex-wrap: wrap;
            background-color: #f5f5f5;
            padding: 8px;
            border-radius: 5px;
            font-size: 13px;
        }
        .results-column {
            flex: 1;
            min-width: 200px;
        }
        .formula {
            font-family: monospace;
            background-color: #eee;
            padding: 5px;
            border-radius: 3px;
            margin: 5px 0;
            font-size: 12px;
        }
        .object {
            position: absolute;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: #64b5f6;
            border: 2px solid #1976d2;
            transform: translate(-50%, -50%);
        }
        .force-arrow {
            position: absolute;
            height: 8px;
            background-color: #f44336;
            transform: translateY(-50%);
        }
        .arrow-head {
            position: absolute;
            width: 0;
            height: 0;
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
            border-left: 12px solid #f44336;
            transform: translateY(-50%);
        }
        .distance-line {
            position: absolute;
            height: 2px;
            background-color: #888;
            bottom: 20px;
        }
        .ground {
            position: absolute;
            height: 3px;
            width: 100%;
            background-color: #333;
            bottom: 35px;
        }
        .annotation {
            position: absolute;
            font-size: 10px;
        }
        button {
            padding: 4px 8px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            font-size: 12px;
            margin-right: 5px;
        }
        button:hover {
            background-color: #45a049;
        }
        .energy-bars {
            height: 40px;
            position: relative;
            margin-bottom: 10px;
        }
        .energy-bar {
            height: 20px;
            margin-bottom: 3px;
            transition: width 0.3s ease;
            position: relative;
        }
        .energy-label {
            position: absolute;
            left: 10px;
            color: white;
            font-weight: bold;
            line-height: 20px;
            font-size: 12px;
        }
        #kineticBar {
            background-color: #2196F3;
            width: 0%;
        }
        #workBar {
            background-color: #FF9800;
            width: 0%;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Kinetic Energy Interactive Visualization</h1>
        
        <div class="visualization" id="visualization">
            <div class="ground"></div>
            <div class="distance-line" id="distanceLine"></div>
            <div class="annotation" id="distanceText">Distance s = 0 m</div>
            <div class="object" id="object"></div>
            <div class="annotation" id="initialPositionText">Initial position</div>
            <div class="force-arrow" id="forceArrowBody"></div>
            <div class="arrow-head" id="forceArrowHead"></div>
            <div class="annotation" id="forceText">F = 10 N</div>
            <div class="annotation" id="velocityText">v = 0 m/s</div>
        </div>
        
        <div class="energy-bars">
            <div class="energy-bar" id="kineticBar"><span class="energy-label">Kinetic Energy</span></div>
            <div class="energy-bar" id="workBar"><span class="energy-label">Work Done</span></div>
        </div>
        
        <div class="controls">
            <div class="control-group">
                <h3>Object Properties</h3>
                <div class="slider-container">
                    <label for="massSlider">Mass (kg): <span id="massValue">1.0</span></label>
                    <input type="range" id="massSlider" min="0.1" max="5" step="0.1" value="1.0" style="width:90%">
                </div>
            </div>
            
            <div class="control-group">
                <h3>Force & Motion</h3>
                <div class="slider-container">
                    <label for="forceSlider">Force (N): <span id="forceValue">10.0</span></label>
                    <input type="range" id="forceSlider" min="1" max="30" step="1" value="10" style="width:90%">
                </div>
                <div class="slider-container">
                    <label for="timeSlider">Time (s): <span id="timeValue">0.0</span></label>
                    <input type="range" id="timeSlider" min="0" max="5" step="0.1" value="0" style="width:90%">
                </div>
            </div>
        </div>
        
        <div style="margin-bottom:10px">
            <button id="playPauseBtn">Play Animation</button>
            <button id="resetBtn">Reset</button>
        </div>
        
        <div class="results">
            <div class="results-column">
                <p><strong>Calculations:</strong></p>
                <p>Acceleration (a = F/m): <span id="acceleration">10.0</span> m/s²</p>
                <p>Velocity (v = at): <span id="velocity">0.0</span> m/s</p>
                <p>Distance (s = ½at²): <span id="distance">0.0</span> m</p>
            </div>
            <div class="results-column">
                <p>Work Done (W = Fs): <span id="workDone">0.0</span> J</p>
                <p>Kinetic Energy (Ek = ½mv²): <span id="kineticEnergy">0.0</span> J</p>
                <div class="formula">W = Fs = ½mv² = Ek</div>
            </div>
        </div>
    </div>

    <script>
        // Initialize the visualization
        // Get DOM elements
        const container = document.getElementById("visualization");
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        // Define constants and variables
        const objectRadius = 15;
        const groundY = height - 35;
        const initialX = 60;
        let currentX = initialX;
        let animationId = null;
        let isPlaying = false;
        
        // Get DOM elements
        const object = document.getElementById("object");
        const distanceLine = document.getElementById("distanceLine");
        const distanceText = document.getElementById("distanceText");
        const initialPositionText = document.getElementById("initialPositionText");
        const forceArrowBody = document.getElementById("forceArrowBody");
        const forceArrowHead = document.getElementById("forceArrowHead");
        const forceText = document.getElementById("forceText");
        const velocityText = document.getElementById("velocityText");
        
        const massSlider = document.getElementById("massSlider");
        const massValue = document.getElementById("massValue");
        const forceSlider = document.getElementById("forceSlider");
        const forceValue = document.getElementById("forceValue");
        const timeSlider = document.getElementById("timeSlider");
        const timeValue = document.getElementById("timeValue");
        const playPauseBtn = document.getElementById("playPauseBtn");
        const resetBtn = document.getElementById("resetBtn");
        
        // Result elements
        const accelerationElement = document.getElementById("acceleration");
        const velocityElement = document.getElementById("velocity");
        const distanceElement = document.getElementById("distance");
        const workDoneElement = document.getElementById("workDone");
        const kineticEnergyElement = document.getElementById("kineticEnergy");
        const kineticBar = document.getElementById("kineticBar");
        const workBar = document.getElementById("workBar");
        
        // Initialize positions
        object.style.left = initialX + "px";
        object.style.top = (groundY - objectRadius) + "px";
        
        initialPositionText.style.left = (initialX - 25) + "px";
        initialPositionText.style.top = (groundY - 40) + "px";
        
        forceArrowBody.style.left = (initialX - 60) + "px";
        forceArrowBody.style.top = (groundY - objectRadius) + "px";
        forceArrowBody.style.width = "40px";
        
        forceArrowHead.style.left = (initialX - 20) + "px";
        forceArrowHead.style.top = (groundY - objectRadius) + "px";
        
        forceText.style.left = (initialX - 45) + "px";
        forceText.style.top = (groundY - objectRadius - 18) + "px";
        
        velocityText.style.left = (initialX + 20) + "px";
        velocityText.style.top = (groundY - 40) + "px";
        
        distanceLine.style.left = initialX + "px";
        distanceLine.style.width = "0px";
        
        distanceText.style.left = initialX + "px";
        distanceText.style.bottom = "5px";
        
        // Initialize values
        let mass = parseFloat(massSlider.value);
        let force = parseFloat(forceSlider.value);
        let time = parseFloat(timeSlider.value);
        
        // Calculate physical quantities
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
        
        // Update visualization based on current values
        function updateVisualization() {
            const {acceleration, velocity, distance, workDone, kineticEnergy} = calculateValues();
            
            // Update object position
            const scaleFactor = 20; // Scale factor for visualization
            const maxDistance = (width - initialX - objectRadius) / scaleFactor;
            const scaledDistance = Math.min(distance, maxDistance);
            currentX = initialX + scaledDistance * scaleFactor;
            
            object.style.left = currentX + "px";
            
            // Update force arrow position
            const dx = currentX - initialX;
            forceArrowBody.style.left = (initialX - 60 + dx) + "px";
            forceArrowHead.style.left = (initialX - 20 + dx) + "px";
            forceText.style.left = (initialX - 45 + dx) + "px";
            
            // Update distance line
            distanceLine.style.left = initialX + "px";
            distanceLine.style.width = (currentX - initialX) + "px";
            
            // Update text labels
            distanceText.style.left = (initialX + (currentX - initialX) / 2 - 30) + "px";
            distanceText.textContent = "Distance s = " + distance.toFixed(1) + " m";
            
            velocityText.style.left = (currentX + 20) + "px";
            velocityText.textContent = "v = " + velocity.toFixed(1) + " m/s";
            
            forceText.textContent = "F = " + force.toFixed(1) + " N";
            
            // Update result displays
            accelerationElement.textContent = acceleration.toFixed(1);
            velocityElement.textContent = velocity.toFixed(1);
            distanceElement.textContent = distance.toFixed(1);
            workDoneElement.textContent = workDone.toFixed(1);
            kineticEnergyElement.textContent = kineticEnergy.toFixed(1);
            
            // Update energy bars
            const maxEnergy = 100; // Set a maximum for scaling the bars
            const kineticWidth = Math.min((kineticEnergy / maxEnergy) * 100, 100);
            const workWidth = Math.min((workDone / maxEnergy) * 100, 100);
            
            kineticBar.style.width = kineticWidth + "%";
            workBar.style.width = workWidth + "%";
        }
        
        // Event listeners for sliders
        massSlider.addEventListener("input", function() {
            mass = parseFloat(this.value);
            massValue.textContent = mass.toFixed(1);
            updateVisualization();
        });
        
        forceSlider.addEventListener("input", function() {
            force = parseFloat(this.value);
            forceValue.textContent = force.toFixed(1);
            updateVisualization();
        });
        
        timeSlider.addEventListener("input", function() {
            time = parseFloat(this.value);
            timeValue.textContent = time.toFixed(1);
            updateVisualization();
        });
        
        // Play/pause animation
        function toggleAnimation() {
            if (isPlaying) {
                stopAnimation();
                playPauseBtn.textContent = "Play Animation";
            } else {
                startAnimation();
                playPauseBtn.textContent = "Pause Animation";
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
                timeSlider.value = time;
                timeValue.textContent = time.toFixed(1);
                
                updateVisualization();
                
                if (progress < 1) {
                    animationId = requestAnimationFrame(animate);
                } else {
                    stopAnimation();
                    playPauseBtn.textContent = "Play Animation";
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
            timeSlider.value = 0;
            timeValue.textContent = "0.0";
            
            stopAnimation();
            playPauseBtn.textContent = "Play Animation";
            isPlaying = false;
            
            updateVisualization();
        }
        
        // Button event listeners
        playPauseBtn.addEventListener("click", toggleAnimation);
        resetBtn.addEventListener("click", resetVisualization);
        
        // Initialize the visualization
        updateVisualization();
        
        // Handle window resize
        window.addEventListener("resize", function() {
            updateVisualization();
        });
    </script>
</body>
</html>
          `);
          doc.close();
        }
      }
    };

    initVisualization();
  }, []);

  return (
    <Card className="w-full shadow-sm">
      <iframe 
        ref={iframeRef}
        title="Kinetic Energy Visualization"
        className="w-full h-[600px] border-0"
        sandbox="allow-scripts"
      />
    </Card>
  );
};
